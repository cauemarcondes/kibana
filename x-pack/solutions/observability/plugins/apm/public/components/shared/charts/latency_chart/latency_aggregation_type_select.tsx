/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiSelect } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { getEbtProps } from '@kbn/ebt-click';
import { LatencyAggregationType } from '../../../../../common/latency_aggregation_types';
import { APM_EBT_ACTIONS, APM_EBT_ELEMENTS } from '../../../app/ebt_constants';

const options: Array<{ value: LatencyAggregationType; text: string }> = [
  { value: LatencyAggregationType.avg, text: 'Average' },
  { value: LatencyAggregationType.p95, text: '95th percentile' },
  { value: LatencyAggregationType.p99, text: '99th percentile' },
];

export function LatencyAggregationTypeSelect({
  latencyAggregationType,
  onChange,
}: {
  latencyAggregationType?: LatencyAggregationType;
  onChange: (value: LatencyAggregationType) => void;
}) {
  return (
    <EuiSelect
      data-test-subj="apmLatencyChartSelect"
      compressed
      {...getEbtProps({
        action: APM_EBT_ACTIONS.SET_LATENCY_AGGREGATION_TYPE,
        element: APM_EBT_ELEMENTS.LATENCY_AGGREGATION_TYPE_SELECT,
      })}
      aria-label={i18n.translate('xpack.apm.serviceOverview.latencyChartTitle.selector', {
        defaultMessage: 'Metric selector',
      })}
      prepend={i18n.translate('xpack.apm.serviceOverview.latencyChartTitle.prepend', {
        defaultMessage: 'Metric',
      })}
      options={options}
      value={latencyAggregationType}
      onChange={(nextOption) => onChange(nextOption.target.value as LatencyAggregationType)}
    />
  );
}
