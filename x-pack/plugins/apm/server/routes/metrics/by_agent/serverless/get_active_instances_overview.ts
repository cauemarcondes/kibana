/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { ProcessorEvent } from '@kbn/observability-plugin/common';
import { kqlQuery, rangeQuery } from '@kbn/observability-plugin/server';
import {
  FAAS_BILLED_DURATION,
  FAAS_DURATION,
  FAAS_NAME,
  METRIC_SYSTEM_FREE_MEMORY,
  METRIC_SYSTEM_TOTAL_MEMORY,
  SERVICE_NAME,
  SERVICE_NODE_NAME,
} from '../../../../../common/elasticsearch_fieldnames';
import { environmentQuery } from '../../../../../common/utils/environment_query';
import { Coordinate } from '../../../../../typings/timeseries';
import { getBucketSize } from '../../../../lib/helpers/get_bucket_size';
import { Setup } from '../../../../lib/helpers/setup_request';
import { calcMemoryUsed } from './helper';

interface ActiveInstanceTimeseries {
  serverlessDuration: Coordinate[];
  billedDuration: Coordinate[];
  avgMemoryUsed: Coordinate[];
  memorySize: Coordinate[];
}

interface ActiveInstanceOverview {
  activeInstanceName: string;
  serverlessFunctionName: string;
  timeseries: ActiveInstanceTimeseries;
  serverlessDurationAvg: number | null;
  billedDurationAvg: number | null;
  avgMemoryUsed: number | null;
  memorySize: number | null;
}

export async function getServerlessActiveInstancesOverview({
  end,
  environment,
  kuery,
  serviceName,
  setup,
  start,
}: {
  environment: string;
  kuery: string;
  setup: Setup;
  serviceName: string;
  start: number;
  end: number;
}) {
  const { apmEventClient } = setup;

  const { intervalString } = getBucketSize({
    start,
    end,
    numBuckets: 20,
  });

  const aggs = {
    faasDurationAvg: { avg: { field: FAAS_DURATION } },
    faasBilledDurationAvg: { avg: { field: FAAS_BILLED_DURATION } },
    maxTotalMemory: { max: { field: METRIC_SYSTEM_TOTAL_MEMORY } },
    avgTotalMemory: { avg: { field: METRIC_SYSTEM_TOTAL_MEMORY } },
    avgFreeMemory: { avg: { field: METRIC_SYSTEM_FREE_MEMORY } },
  };

  const params = {
    apm: {
      events: [ProcessorEvent.metric],
    },
    body: {
      track_total_hits: 1,
      size: 0,
      query: {
        bool: {
          filter: [
            { term: { [SERVICE_NAME]: serviceName } },
            ...rangeQuery(start, end),
            ...environmentQuery(environment),
            ...kqlQuery(kuery),
          ],
        },
      },
      aggs: {
        activeInstances: {
          terms: { field: SERVICE_NODE_NAME },
          aggs: {
            serverlessFunctions: {
              terms: { field: FAAS_NAME },
              aggs: {
                ...aggs,
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
                  aggs,
                },
              },
            },
          },
        },
      },
    },
  };

  const response = await apmEventClient.search(
    'ger_serverless_active_instances_overview',
    params
  );

  return (
    response.aggregations?.activeInstances.buckets.flatMap((bucket) => {
      const activeInstanceName = bucket.key as string;
      const serverlessFunctionsDetails =
        bucket.serverlessFunctions.buckets.reduce<ActiveInstanceOverview[]>(
          (acc, curr) => {
            const serverlessFunctionName = curr.key as string;

            const timeseries =
              curr.timeseries.buckets.reduce<ActiveInstanceTimeseries>(
                (timeseriesAcc, timeseriesCurr) => {
                  return {
                    serverlessDuration: [
                      ...timeseriesAcc.serverlessDuration,
                      {
                        x: timeseriesCurr.key,
                        y: timeseriesCurr.faasDurationAvg.value,
                      },
                    ],
                    billedDuration: [
                      ...timeseriesAcc.billedDuration,
                      {
                        x: timeseriesCurr.key,
                        y: timeseriesCurr.faasBilledDurationAvg.value,
                      },
                    ],
                    avgMemoryUsed: [
                      ...timeseriesAcc.avgMemoryUsed,
                      {
                        x: timeseriesCurr.key,
                        y: calcMemoryUsed({
                          memoryFree: timeseriesCurr.avgFreeMemory.value,
                          memoryTotal: timeseriesCurr.avgTotalMemory.value,
                        }),
                      },
                    ],
                    memorySize: [
                      ...timeseriesAcc.memorySize,
                      {
                        x: timeseriesCurr.key,
                        y: timeseriesCurr.maxTotalMemory.value,
                      },
                    ],
                  };
                },
                {
                  serverlessDuration: [],
                  billedDuration: [],
                  avgMemoryUsed: [],
                  memorySize: [],
                }
              );
            return [
              ...acc,
              {
                activeInstanceName,
                serverlessFunctionName,
                timeseries,
                serverlessDurationAvg: curr.faasDurationAvg.value,
                billedDurationAvg: curr.faasBilledDurationAvg.value,
                avgMemoryUsed: calcMemoryUsed({
                  memoryFree: curr.avgFreeMemory.value,
                  memoryTotal: curr.avgTotalMemory.value,
                }),
                memorySize: curr.avgTotalMemory.value,
              },
            ];
          },
          []
        );
      return serverlessFunctionsDetails;
    }) || []
  );
}
