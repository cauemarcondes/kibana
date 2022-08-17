/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { FAAS_COLDSTART_DURATION } from '../../../../../common/elasticsearch_fieldnames';
import { Setup } from '../../../../lib/helpers/setup_request';
import { fetchAndTransformMetrics } from '../../fetch_and_transform_metrics';
import { ChartBase } from '../../types';

const chartBase: ChartBase = {
  title: i18n.translate('xpack.apm.agentMetrics.serveless.coldStart', {
    defaultMessage: 'Cold start',
  }),
  key: 'cold_start',
  type: 'linemark',
  yUnit: 'number',
  series: {
    coldStart: {
      title: i18n.translate('xpack.apm.agentMetrics.serveless.coldStart', {
        defaultMessage: 'Cold start',
      }),
    },
  },
};

export function getColdStartDuration({
  environment,
  kuery,
  setup,
  serviceName,
  serviceNodeName,
  start,
  end,
}: {
  environment: string;
  kuery: string;
  setup: Setup;
  serviceName: string;
  serviceNodeName?: string;
  start: number;
  end: number;
}) {
  return fetchAndTransformMetrics({
    environment,
    kuery,
    setup,
    serviceName,
    serviceNodeName,
    start,
    end,
    chartBase,
    aggs: { coldStart: { avg: { field: FAAS_COLDSTART_DURATION } } },
    additionalFilters: [{ exists: { field: FAAS_COLDSTART_DURATION } }],
    operationName: 'get_cold_start_duration',
  });
}
