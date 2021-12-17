/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { kqlQuery, rangeQuery } from '../../../../observability/server';
import { Setup } from '../../lib/helpers/setup_request';
import { getBucketSize } from '../../lib/helpers/get_bucket_size';
import { getOffsetInMs } from '../../../common/utils/get_offset_in_ms';
import { getServiceInstanceMetadataDetails } from '../../lib/services/get_service_instance_metadata_details';

export async function getLogsCategories({
  setup,
  start,
  end,
  offset,
  kuery,
  version,
}: {
  setup: Setup;
  start: number;
  end: number;
  kuery: string;
  offset?: string;
  version?: string;
}) {
  const { offsetInMs, startWithOffset, endWithOffset } = getOffsetInMs({
    start,
    end,
    offset,
  });
  const { intervalString } = getBucketSize({ start, end, numBuckets: 20 });
  const { internalClient } = setup;
  const params = {
    index: 'spacetime-logs-metrics-*',
    size: 0,
    body: {
      query: {
        bool: {
          filter: [
            ...rangeQuery(startWithOffset, endWithOffset),
            ...(version ? kqlQuery(version) : kqlQuery(kuery)),
          ],
        },
      },
      aggs: {
        categories: {
          terms: { field: 'template', size: 50 },
          aggs: {
            timeseries: {
              date_histogram: {
                field: '@timestamp',
                fixed_interval: intervalString,
                min_doc_count: 0,
                extended_bounds: {
                  min: startWithOffset,
                  max: endWithOffset,
                },
              },
            },
          },
        },
      },
    },
  };
  const resp = await internalClient.search('logs_categories', params);
  return (
    resp.aggregations?.categories.buckets.map((bucket) => {
      return {
        category: bucket.key as string,
        count: bucket.doc_count,
        timeseries: bucket.timeseries.buckets.map((item) => ({
          x: item.key + offsetInMs,
          y: item.doc_count,
        })),
      };
    }) || []
  );
}

export async function getLogsCategoriesDetails({
  setup,
  start,
  end,
  categoryName,
  kuery,
}: {
  setup: Setup;
  start: number;
  end: number;
  categoryName: string;
  kuery: string;
}) {
  const { internalClient } = setup;

  const params = {
    index: 'filebeat*',
    _source: [
      'message',
      'container.name',
      '@timestamp',
      'container.id',
      'host.name',
    ],
    size: 10,
    body: {
      query: {
        bool: {
          filter: [
            ...rangeQuery(start, end),
            ...kqlQuery(kuery),
            { term: { 'template.keyword': categoryName } },
          ],
        },
      },
    },
  };
  const resp = await internalClient.search<
    {
      message: string;
      container?: { name: string; id: string };
      host?: { name: string };
      '@timestamp': string;
    },
    typeof params
  >('logs_categories_details', params);
  return {
    logs: resp.hits.hits.map(({ _source }) => {
      return {
        container: { name: _source.container?.name, id: _source.container?.id },
        host: { name: _source.host?.name },
        message: _source.message,
        timestamp: _source['@timestamp'],
      };
    }),
  };
}

export async function getLogsVersions({
  setup,
  start,
  end,
  hostNames,
  containerIds,
  serviceName,
}: {
  setup: Setup;
  start: number;
  end: number;
  hostNames: string[];
  containerIds: string[];
  serviceName: string;
}) {
  const details = await Promise.all(
    [...hostNames, ...containerIds].map((value) => {
      return getServiceInstanceMetadataDetails({
        setup,
        start,
        end,
        serviceName,
        serviceNodeName: value,
      });
    })
  );

  const versions: {
    [key: string]: {
      containerIds: string[];
      hostNames: string[];
    };
  } = {};
  details.map((item) => {
    const version = item.service?.version;
    if (version) {
      const current = versions[version];
      const container = {
        containerIds: [
          ...(current?.containerIds || []),
          item.container?.id,
        ].filter((_) => _) as string[],
        hostNames: [...(current?.hostNames || []), item.host?.name].filter(
          (_) => _
        ) as string[],
      };
      versions[version] = container;
    }
  });

  return versions;
}
