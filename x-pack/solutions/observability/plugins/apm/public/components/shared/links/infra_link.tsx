/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EuiLinkAnchorProps } from '@elastic/eui';
import { EuiLink } from '@elastic/eui';
import type { IBasePath } from '@kbn/core/public';
import React from 'react';
import { getEbtProps } from '@kbn/ebt-click';
import url from 'url';
import type { InfraAppId } from '@kbn/observability-shared-plugin/public/infra';
import { APM_EBT_ACTIONS, APM_EBT_ELEMENTS } from '../../app/ebt_constants';
import { useApmPluginContext } from '../../../context/apm_plugin/use_apm_plugin_context';
import { fromQuery } from './url_helpers';

interface InfraQueryParams {
  time?: number;
  from?: number;
  to?: number;
  filter?: string;
}

interface Props extends EuiLinkAnchorProps {
  app: InfraAppId;
  path?: string;
  query: InfraQueryParams;
  children?: React.ReactNode;
}

export const getInfraHref = ({
  app,
  basePath,
  query,
  path,
}: {
  app: InfraAppId;
  basePath: IBasePath;
  query: InfraQueryParams;
  path?: string;
}) => {
  const nextSearch = fromQuery(query);
  return url.format({
    pathname: basePath.prepend(`/app/${app}${path || ''}`),
    search: nextSearch,
  });
};

export function InfraLink({ app, path, query = {}, ...rest }: Props) {
  const { core } = useApmPluginContext();
  const href = getInfraHref({ app, basePath: core.http.basePath, query, path });
  return (
    <EuiLink
      data-test-subj="apmInfraLinkLink"
      {...getEbtProps({ action: APM_EBT_ACTIONS.VIEW_INFRA, element: APM_EBT_ELEMENTS.INFRA_LINK })}
      {...rest}
      href={href}
    />
  );
}
