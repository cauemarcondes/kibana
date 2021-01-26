/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { EuiBasicTableColumn } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { ValuesType } from 'utility-types';
import {
  asMillisecondDuration,
  asPercent,
  asTransactionRate,
} from '../../../../../common/utils/formatters';
import { APIReturnType } from '../../../../services/rest/createCallApmApi';
import { px, unit } from '../../../../style/variables';
import { SparkPlot } from '../../../shared/charts/spark_plot';
import { ImpactBar } from '../../../shared/ImpactBar';
import { TransactionDetailLink } from '../../../shared/Links/apm/transaction_detail_link';
import { TruncateWithTooltip } from '../../../shared/truncate_with_tooltip';
import { TransactionGroupsOverview } from './';

export type ServiceTransactionGroupItem = ValuesType<
  TransactionGroupsOverview['transactionGroups']
>;
type TransactionGroupMetrics = APIReturnType<'GET /api/apm/services/{serviceName}/transactions/groups/metrics'>;

function getLatencyAggregationTypeLabel(latencyAggregationType?: string) {
  switch (latencyAggregationType) {
    case 'avg':
      return i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnLatency.avg',
        { defaultMessage: 'Latency (avg.)' }
      );

    case 'p95':
      return i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnLatency.p95',
        { defaultMessage: 'Latency (95th)' }
      );

    case 'p99':
      return i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnLatency.p99',
        { defaultMessage: 'Latency (99th)' }
      );
  }
}

export function getColumns({
  serviceName,
  latencyAggregationType,
  transactionsMetricsData,
}: {
  serviceName: string;
  latencyAggregationType?: string;
  transactionsMetricsData?: TransactionGroupMetrics;
}): Array<EuiBasicTableColumn<ServiceTransactionGroupItem>> {
  return [
    {
      field: 'name',
      sortable: true,
      name: i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnName',
        { defaultMessage: 'Name' }
      ),
      render: (_, { name, transactionType: type }) => {
        return (
          <TruncateWithTooltip
            text={name}
            content={
              <TransactionDetailLink
                serviceName={serviceName}
                transactionName={name}
                transactionType={type}
                latencyAggregationType={latencyAggregationType}
              >
                {name}
              </TransactionDetailLink>
            }
          />
        );
      },
    },
    {
      field: 'latency',
      sortable: true,
      name: getLatencyAggregationTypeLabel(latencyAggregationType),
      width: px(unit * 10),
      render: (_, { latency, name }) => {
        const timeseries = transactionsMetricsData
          ? transactionsMetricsData[name]?.latency
          : undefined;
        return (
          <SparkPlot
            color="euiColorVis1"
            compact
            series={timeseries}
            valueLabel={asMillisecondDuration(latency)}
          />
        );
      },
    },
    {
      field: 'throughput',
      sortable: true,
      name: i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnThroughput',
        { defaultMessage: 'Throughput' }
      ),
      width: px(unit * 10),
      render: (_, { throughput, name }) => {
        const timeseries = transactionsMetricsData
          ? transactionsMetricsData[name]?.throughput
          : undefined;
        return (
          <SparkPlot
            color="euiColorVis0"
            compact
            series={timeseries}
            valueLabel={asTransactionRate(throughput)}
          />
        );
      },
    },
    {
      field: 'errorRate',
      sortable: true,
      name: i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnErrorRate',
        { defaultMessage: 'Error rate' }
      ),
      width: px(unit * 8),
      render: (_, { errorRate, name }) => {
        const timeseries = transactionsMetricsData
          ? transactionsMetricsData[name]?.errorRate
          : undefined;
        return (
          <SparkPlot
            color="euiColorVis7"
            compact
            series={timeseries}
            valueLabel={asPercent(errorRate, 1)}
          />
        );
      },
    },
    {
      field: 'impact',
      sortable: true,
      name: i18n.translate(
        'xpack.apm.serviceOverview.transactionsTableColumnImpact',
        { defaultMessage: 'Impact' }
      ),
      width: px(unit * 5),
      render: (_, { impact }) => {
        return <ImpactBar value={impact ?? 0} size="m" />;
      },
    },
  ];
}
