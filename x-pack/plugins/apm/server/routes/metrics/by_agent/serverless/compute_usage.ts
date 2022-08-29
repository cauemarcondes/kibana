/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { ProcessorEvent } from '@kbn/observability-plugin/common';
import { euiLightVars as theme } from '@kbn/ui-theme';
import {
  kqlQuery,
  rangeQuery,
  termQuery,
} from '@kbn/observability-plugin/server';
import {
  FAAS_BILLED_DURATION,
  FAAS_COLDSTART_DURATION,
  FAAS_ID,
  METRIC_SYSTEM_TOTAL_MEMORY,
  SERVICE_NAME,
} from '../../../../../common/elasticsearch_fieldnames';
import { environmentQuery } from '../../../../../common/utils/environment_query';
import { getMetricsDateHistogramParams } from '../../../../lib/helpers/metrics';
import { Setup } from '../../../../lib/helpers/setup_request';
import { ChartBase } from '../../types';
import { getVizColorForIndex } from '../../../../../common/viz_colors';

const chartBase: ChartBase = {
  title: i18n.translate('xpack.apm.agentMetrics.serverless.computeUsage', {
    defaultMessage: 'Compute usage',
  }),
  key: 'compute_usage',
  type: 'linemark',
  yUnit: 'number',
  series: {
    computeUsage: {
      title: i18n.translate('xpack.apm.agentMetrics.serverless.computeUsage', {
        defaultMessage: 'Compute usage',
      }),
    },
  },
};

/**
 * To calculate the compute usage we need to multiple the "system.memory.total" by "faas.billed_duration".
 * But the result of this calculation is in Bytes-milliseconds, as the "system.memory.total" is stored in bytes and the "faas.billed_duration" is stored in milliseconds.
 * But to calculate the overall cost AWS uses GB-second, so we need to convert the result to this unit.
 */
function calculateComputeUsageGBSeconds({
  faasBilledDuration,
  totalMemory,
}: {
  faasBilledDuration?: number | null;
  totalMemory?: number | null;
}) {
  if (
    faasBilledDuration === undefined ||
    faasBilledDuration === null ||
    totalMemory === undefined ||
    totalMemory === null
  ) {
    return 0;
  }
  const bytesMsResult = totalMemory * faasBilledDuration;
  const GBSeconds = 1024 * 1024 * 1024 * 1000;
  return bytesMsResult / GBSeconds;
}

export async function getComputeUsage({
  environment,
  kuery,
  setup,
  serviceName,
  faasId,
  start,
  end,
}: {
  environment: string;
  kuery: string;
  setup: Setup;
  serviceName: string;
  faasId?: string;
  start: number;
  end: number;
}) {
  const { apmEventClient, config } = setup;

  const aggs = {
    avgFaasBilledDuration: { avg: { field: FAAS_BILLED_DURATION } },
    avgTotalMemory: { avg: { field: METRIC_SYSTEM_TOTAL_MEMORY } },
  };

  const params = {
    apm: {
      events: [ProcessorEvent.metric],
    },
    body: {
      size: 0,
      query: {
        bool: {
          filter: [
            { term: { [SERVICE_NAME]: serviceName } },
            ...rangeQuery(start, end),
            ...environmentQuery(environment),
            ...kqlQuery(kuery),
            ...termQuery(FAAS_ID, faasId),
            { exists: { field: FAAS_COLDSTART_DURATION } },
          ],
        },
      },
      aggs: {
        timeseriesData: {
          date_histogram: getMetricsDateHistogramParams({
            start,
            end,
            metricsInterval: config.metricsInterval,
          }),
          aggs,
        },
        ...aggs,
      },
    },
  };

  const { hits, aggregations } = await apmEventClient.search(
    'get_compute_usage',
    params
  );
  const timeseriesData = aggregations?.timeseriesData;

  return {
    title: chartBase.title,
    key: chartBase.key,
    yUnit: chartBase.yUnit,
    series:
      hits.total.value === 0
        ? []
        : [
            {
              title: i18n.translate(
                'xpack.apm.agentMetrics.serverless.computeUsage',
                { defaultMessage: 'Compute usage' }
              ),
              key: 'compute_usage',
              type: 'linemark',
              yUnit: 'number',
              overallValue: calculateComputeUsageGBSeconds({
                faasBilledDuration: aggregations?.avgFaasBilledDuration.value,
                totalMemory: aggregations?.avgTotalMemory.value,
              }),
              color: getVizColorForIndex(0, theme),
              data:
                timeseriesData?.buckets.map((bucket) => {
                  const computeUsage = calculateComputeUsageGBSeconds({
                    faasBilledDuration: bucket.avgFaasBilledDuration.value,
                    totalMemory: bucket.avgTotalMemory.value,
                  });
                  return {
                    x: bucket.key,
                    y: computeUsage,
                  };
                }) || [],
            },
          ],
  };
}
