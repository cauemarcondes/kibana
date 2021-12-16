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
    index: 'test-log-metrics*',
    size: 0,
    body: {
      query: {
        bool: {
          filter: [
            ...rangeQuery(startWithOffset, endWithOffset),
            ...(version ? [] : kqlQuery(kuery)),
            ...(version
              ? [
                  {
                    term: {
                      'container.id': version,
                    },
                  },
                ]
              : []),
          ],
        },
      },
      aggs: {
        categories: {
          terms: { field: 'category.name.keyword' },
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
    index: 'test-log-*',
    _source: ['msg', 'container.name', '@timestamp', 'container.id'],
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
      msg: string;
      container?: { name: string; id: string };
      '@timestamp': string;
    },
    typeof params
  >('logs_categories_details', params);
  return {
    logs: resp.hits.hits.map(({ _source }) => {
      return {
        container: { name: _source.container?.name, id: _source.container?.id },
        message: _source.msg,
        timestamp: _source['@timestamp'],
      };
    }),
  };
}
