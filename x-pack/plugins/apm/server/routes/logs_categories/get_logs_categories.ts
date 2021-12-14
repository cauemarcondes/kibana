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
}: {
  setup: Setup;
  start: number;
  end: number;
  kuery: string;
  offset?: string;
}) {
  const { offsetInMs, startWithOffset, endWithOffset } = getOffsetInMs({
    start,
    end,
    offset,
  });
  const { intervalString } = getBucketSize({ start, end, numBuckets: 20 });
  const { internalClient } = setup;
  const params = {
    index: 'test-logs-*',
    size: 0,
    body: {
      query: {
        bool: {
          filter: [
            ...rangeQuery(startWithOffset, endWithOffset),
            ...kqlQuery(kuery),
          ],
        },
      },
      aggs: {
        categories: {
          terms: { field: 'template.keyword' },
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
        category: bucket.key,
        count: bucket.doc_count,
        timeseries: bucket.timeseries.buckets.map((item) => ({
          x: item.key + offsetInMs,
          y: item.doc_count,
        })),
      };
    }) || []
  );
}
