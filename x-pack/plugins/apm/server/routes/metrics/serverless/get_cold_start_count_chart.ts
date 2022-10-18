/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { termQuery } from '@kbn/observability-plugin/server';
import { euiLightVars as theme } from '@kbn/ui-theme';
import {
  FAAS_COLDSTART,
  FAAS_NAME,
  METRICSET_NAME,
} from '../../../../common/elasticsearch_fieldnames';
import { Setup } from '../../../lib/helpers/setup_request';
import { fetchAndTransformMetrics } from '../fetch_and_transform_metrics';
import { ChartBase } from '../types';

const chartBase: ChartBase = {
  title: i18n.translate('xpack.apm.agentMetrics.serverless.coldStart.title', {
    defaultMessage: 'Cold starts',
  }),
  key: 'cold_start_count',
  type: 'bar',
  yUnit: 'integer',
  series: {
    coldStart: {
      title: i18n.translate('xpack.apm.agentMetrics.serverless.coldStart', {
        defaultMessage: 'Cold start',
      }),
      color: theme.euiColorVis5,
    },
  },
};

export function getColdStartCountChart({
  environment,
  kuery,
  setup,
  serviceName,
  start,
  end,
  serverlessFunctionName,
}: {
  environment: string;
  kuery: string;
  setup: Setup;
  serviceName: string;
  start: number;
  end: number;
  serverlessFunctionName?: string;
}) {
  return fetchAndTransformMetrics({
    environment,
    kuery,
    setup,
    serviceName,
    start,
    end,
    chartBase,
    aggs: { coldStart: { sum: { field: FAAS_COLDSTART } } },
    additionalFilters: [
      ...termQuery(FAAS_COLDSTART, true),
      ...termQuery(FAAS_NAME, serverlessFunctionName),
      ...termQuery(METRICSET_NAME, 'app'),
    ],
    operationName: 'get_cold_start_count',
  });
}
