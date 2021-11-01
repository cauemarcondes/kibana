/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { URL } from 'url';

import mime from 'mime-types';
import semverValid from 'semver/functions/valid';
import type { Response } from 'node-fetch';

import { KibanaAssetType } from '../../../types';
import type {
  AssetsGroupedByServiceByType,
  CategoryId,
  CategorySummaryList,
  InstallSource,
  RegistryPackage,
  RegistrySearchResults,
  RegistrySearchResult,
  GetCategoriesRequest,
} from '../../../types';
import {
  getArchiveFilelist,
  getPathParts,
  unpackBufferToCache,
  getPackageInfo,
  setPackageInfo,
} from '../archive';
import { streamToBuffer } from '../streams';
import { appContextService } from '../..';
import {
  PackageKeyInvalidError,
  PackageNotFoundError,
  PackageCacheError,
  RegistryResponseError,
} from '../../../errors';

import { fetchUrl, getResponse, getResponseStream } from './requests';
import { getRegistryUrl } from './registry_url';

export interface SearchParams {
  category?: CategoryId;
  experimental?: boolean;
}

/**
 * Extract the package name and package version from a string.
 *
 * @param pkgkey a string containing the package name delimited by the package version
 */
export function splitPkgKey(pkgkey: string): { pkgName: string; pkgVersion: string } {
  // If no version is provided, use the provided package key as the
  // package name and return an empty version value
  if (!pkgkey.includes('-')) {
    return { pkgName: pkgkey, pkgVersion: '' };
  }

  const pkgName = pkgkey.includes('-') ? pkgkey.substr(0, pkgkey.indexOf('-')) : pkgkey;

  if (pkgName === '') {
    throw new PackageKeyInvalidError('Package key parsing failed: package name was empty');
  }

  // this will return the entire string if `indexOf` return -1
  const pkgVersion = pkgkey.substr(pkgkey.indexOf('-') + 1);
  if (!semverValid(pkgVersion)) {
    throw new PackageKeyInvalidError(
      'Package key parsing failed: package version was not a valid semver'
    );
  }
  return { pkgName, pkgVersion };
}

export const pkgToPkgKey = ({ name, version }: { name: string; version: string }) =>
  `${name}-${version}`;

export async function fetchList(params?: SearchParams): Promise<RegistrySearchResults> {
  const registryUrl = getRegistryUrl();
  const url = new URL(`${registryUrl}/search`);
  if (params) {
    if (params.category) {
      url.searchParams.set('category', params.category);
    }
    if (params.experimental) {
      url.searchParams.set('experimental', params.experimental.toString());
    }
  }

  setKibanaVersion(url);

  return fetchUrl(url.toString()).then(JSON.parse);
}

export async function fetchFindLatestPackage(packageName: string): Promise<RegistrySearchResult> {
  const registryUrl = getRegistryUrl();
  const url = new URL(
    `${registryUrl}/search?package=${packageName}&internal=true&experimental=true`
  );

  setKibanaVersion(url);

  const res = await fetchUrl(url.toString());
  const searchResults = JSON.parse(res);
  if (searchResults.length) {
    return searchResults[0];
  } else {
    throw new PackageNotFoundError(`${packageName} not found`);
  }
}

export async function fetchInfo(pkgName: string, pkgVersion: string): Promise<RegistryPackage> {
  const registryUrl = getRegistryUrl();
  try {
    const res = await fetchUrl(`${registryUrl}/package/${pkgName}/${pkgVersion}`).then(JSON.parse);

    return res;
  } catch (err) {
    if (err instanceof RegistryResponseError && err.status === 404) {
      throw new PackageNotFoundError(`${pkgName}@${pkgVersion} not found`);
    }
    throw err;
  }
}

export async function getFile(
  pkgName: string,
  pkgVersion: string,
  relPath: string
): Promise<Response> {
  const filePath = `/package/${pkgName}/${pkgVersion}/${relPath}`;
  return fetchFile(filePath);
}

export async function fetchFile(filePath: string): Promise<Response> {
  const registryUrl = getRegistryUrl();
  return getResponse(`${registryUrl}${filePath}`);
}

function setKibanaVersion(url: URL) {
  // TODO: change default to false as soon as EPR issue fixed. Blocker for 8.0.
  const disableVersionCheck =
    appContextService.getConfig()?.developer?.disableRegistryVersionCheck ?? true;
  if (disableVersionCheck) {
    return;
  }

  const kibanaVersion = appContextService.getKibanaVersion().split('-')[0]; // may be x.y.z-SNAPSHOT
  const kibanaBranch = appContextService.getKibanaBranch();

  // on master, request all packages regardless of version
  if (kibanaVersion && kibanaBranch !== 'master') {
    url.searchParams.set('kibana.version', kibanaVersion);
  }
}

export async function fetchCategories(
  params?: GetCategoriesRequest['query']
): Promise<CategorySummaryList> {
  const registryUrl = getRegistryUrl();
  const url = new URL(`${registryUrl}/categories`);
  if (params) {
    if (params.experimental) {
      url.searchParams.set('experimental', params.experimental.toString());
    }
    if (params.include_policy_templates) {
      url.searchParams.set('include_policy_templates', params.include_policy_templates.toString());
    }
  }

  setKibanaVersion(url);

  return fetchUrl(url.toString()).then(JSON.parse);
}

export async function getInfo(name: string, version: string) {
  let packageInfo = getPackageInfo({ name, version });
  if (!packageInfo) {
    packageInfo = await fetchInfo(name, version);
    setPackageInfo({ name, version, packageInfo });
  }
  return packageInfo as RegistryPackage;
}

export async function getRegistryPackage(
  name: string,
  version: string
): Promise<{ paths: string[]; packageInfo: RegistryPackage }> {
  const installSource = 'registry';
  let paths = getArchiveFilelist({ name, version });
  if (!paths || paths.length === 0) {
    const { archiveBuffer, archivePath } = await fetchArchiveBuffer(name, version);
    paths = await unpackBufferToCache({
      name,
      version,
      installSource,
      archiveBuffer,
      contentType: ensureContentType(archivePath),
    });
  }

  const packageInfo = await getInfo(name, version);
  return { paths, packageInfo };
}

function ensureContentType(archivePath: string) {
  const contentType = mime.lookup(archivePath);
  if (!contentType) {
    throw new Error(`Unknown compression format for '${archivePath}'. Please use .zip or .gz`);
  }
  return contentType;
}

export async function ensureCachedArchiveInfo(
  name: string,
  version: string,
  installSource: InstallSource = 'registry'
) {
  const paths = getArchiveFilelist({ name, version });
  if (!paths || paths.length === 0) {
    if (installSource === 'registry') {
      await getRegistryPackage(name, version);
    } else {
      throw new PackageCacheError(
        `Package ${name}-${version} not cached. If it was uploaded, try uninstalling and reinstalling manually.`
      );
    }
  }
}

async function fetchArchiveBuffer(
  pkgName: string,
  pkgVersion: string
): Promise<{ archiveBuffer: Buffer; archivePath: string }> {
  const { download: archivePath } = await getInfo(pkgName, pkgVersion);
  const archiveUrl = `${getRegistryUrl()}${archivePath}`;
  const archiveBuffer = await getResponseStream(archiveUrl).then(streamToBuffer);

  return { archiveBuffer, archivePath };
}

export function groupPathsByService(paths: string[]): AssetsGroupedByServiceByType {
  const kibanaAssetTypes = Object.values<string>(KibanaAssetType);

  // ASK: best way, if any, to avoid `any`?
  const assets = paths.reduce((map: any, path) => {
    const parts = getPathParts(path.replace(/^\/package\//, ''));
    if (
      (parts.service === 'kibana' && kibanaAssetTypes.includes(parts.type)) ||
      parts.service === 'elasticsearch'
    ) {
      if (!map[parts.service]) map[parts.service] = {};
      if (!map[parts.service][parts.type]) map[parts.service][parts.type] = [];
      map[parts.service][parts.type].push(parts);
    }

    return map;
  }, {});

  return {
    kibana: assets.kibana,
    elasticsearch: assets.elasticsearch,
  };
}

export function getNoticePath(paths: string[]): string | undefined {
  for (const path of paths) {
    const parts = getPathParts(path.replace(/^\/package\//, ''));
    if (parts.type === 'notice') {
      const { pkgName, pkgVersion } = splitPkgKey(parts.pkgkey);
      return `/package/${pkgName}/${pkgVersion}/${parts.file}`;
    }
  }

  return undefined;
}
