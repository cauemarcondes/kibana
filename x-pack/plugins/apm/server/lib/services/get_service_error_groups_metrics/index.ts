/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Coordinate } from '../../../../typings/timeseries';
import {
  ERROR_GROUP_ID,
  SERVICE_NAME,
  TRANSACTION_TYPE,
} from '../../../../common/elasticsearch_fieldnames';
import { ProcessorEvent } from '../../../../common/processor_event';
import { rangeFilter } from '../../../../common/utils/range_filter';
import { getBucketSize } from '../../helpers/get_bucket_size';
import { Setup, SetupTimeRange } from '../../helpers/setup_request';

export async function getServiceErrorGroupsMetrics({
  serviceName,
  setup,
  numBuckets,
  transactionType,
  groupIds,
}: {
  serviceName: string;
  setup: Setup & SetupTimeRange;
  numBuckets: number;
  transactionType: string;
  groupIds: string[];
}): Promise<Record<string, { timeseries: Coordinate[] }> | undefined> {
  const { apmEventClient, start, end, esFilter } = setup;

  const { intervalString } = getBucketSize({ start, end, numBuckets });

  const timeseriesResponse = await apmEventClient.search({
    apm: {
      events: [ProcessorEvent.error],
    },
    body: {
      size: 0,
      query: {
        bool: {
          filter: [
            { terms: { [ERROR_GROUP_ID]: groupIds } },
            { term: { [SERVICE_NAME]: serviceName } },
            { term: { [TRANSACTION_TYPE]: transactionType } },
            { range: rangeFilter(start, end) },
            ...esFilter,
          ],
        },
      },
      aggs: {
        error_groups: {
          terms: {
            field: ERROR_GROUP_ID,
            size: 500,
          },
          aggs: {
            timeseries: {
              date_histogram: {
                field: '@timestamp',
                fixed_interval: intervalString,
                min_doc_count: 0,
                extended_bounds: {
                  min: start,
                  max: end,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!timeseriesResponse.aggregations) {
    return undefined;
  }

  return timeseriesResponse.aggregations.error_groups.buckets.reduce(
    (acc, bucket) => {
      const groupId = bucket.key;
      return {
        ...acc,
        [groupId]: {
          timeseries: bucket.timeseries.buckets.map((timeseriesBucket) => {
            return {
              x: timeseriesBucket.key,
              y: timeseriesBucket.doc_count,
            };
          }),
        },
      };
    },
    {}
  );
}
