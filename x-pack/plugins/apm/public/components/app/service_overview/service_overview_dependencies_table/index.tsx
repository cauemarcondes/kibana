/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
  EuiInMemoryTable,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { getNextEnvironmentUrlParam } from '../../../../../common/environment_filter_values';
import {
  asMillisecondDuration,
  asPercent,
  asTransactionRate,
} from '../../../../../common/utils/formatters';
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { ServiceDependencyItem } from '../../../../../server/lib/services/get_service_dependencies';
import { useUrlParams } from '../../../../context/url_params_context/use_url_params';
import { FETCH_STATUS, useFetcher } from '../../../../hooks/use_fetcher';
import { APIReturnType } from '../../../../services/rest/createCallApmApi';
import { px, unit } from '../../../../style/variables';
import { AgentIcon } from '../../../shared/AgentIcon';
import { ComparisonSparkPlot } from '../../../shared/charts/comparison_spark_plot';
import { ImpactBar } from '../../../shared/ImpactBar';
import { ServiceMapLink } from '../../../shared/Links/apm/ServiceMapLink';
import { ServiceOverviewLink } from '../../../shared/Links/apm/service_overview_link';
import { SpanIcon } from '../../../shared/span_icon';
import { TableFetchWrapper } from '../../../shared/table_fetch_wrapper';
import { getTimeRangeComparison } from '../../../shared/time_comparison/get_time_range_comparison';
import { TruncateWithTooltip } from '../../../shared/truncate_with_tooltip';
import { ServiceOverviewTableContainer } from '../service_overview_table_container';

type Dependencies = APIReturnType<'GET /api/apm/services/{serviceName}/dependencies'>;

interface Props {
  serviceName: string;
}

const INITIAL_STATE: Dependencies = {
  currentPeriod: [],
  previousPeriod: {},
};

export function ServiceOverviewDependenciesTable({ serviceName }: Props) {
  const {
    urlParams: { start, end, environment, comparisonEnabled, comparisonType },
  } = useUrlParams();

  const {
    comparisonStart = undefined,
    comparisonEnd = undefined,
  } = comparisonType
    ? getTimeRangeComparison({
        start,
        end,
        comparisonType,
      })
    : {};

  const columns: Array<EuiBasicTableColumn<ServiceDependencyItem>> = [
    {
      field: 'name',
      name: i18n.translate(
        'xpack.apm.serviceOverview.dependenciesTableColumnBackend',
        {
          defaultMessage: 'Backend',
        }
      ),
      render: (_, item) => {
        return (
          <TruncateWithTooltip
            text={item.name}
            content={
              <EuiFlexGroup gutterSize="s" responsive={false}>
                <EuiFlexItem grow={false}>
                  {item.type === 'service' ? (
                    <AgentIcon agentName={item.agentName} />
                  ) : (
                    <SpanIcon type={item.spanType} subType={item.spanSubtype} />
                  )}
                </EuiFlexItem>
                <EuiFlexItem>
                  {item.type === 'service' ? (
                    <ServiceOverviewLink
                      serviceName={item.serviceName}
                      environment={getNextEnvironmentUrlParam({
                        requestedEnvironment: item.environment,
                        currentEnvironmentUrlParam: environment,
                      })}
                    >
                      {item.name}
                    </ServiceOverviewLink>
                  ) : (
                    item.name
                  )}
                </EuiFlexItem>
              </EuiFlexGroup>
            }
          />
        );
      },
      sortable: true,
    },
    {
      field: 'latencyValue',
      name: i18n.translate(
        'xpack.apm.serviceOverview.dependenciesTableColumnLatency',
        {
          defaultMessage: 'Latency (avg.)',
        }
      ),
      width: px(unit * 10),
      render: (_, { name, latency }) => {
        const previousPeriodTimeseries =
          data.previousPeriod[name]?.latency.timeseries;
        return (
          <ComparisonSparkPlot
            color="euiColorVis1"
            series={latency.timeseries}
            comparisonSeries={
              comparisonEnabled ? previousPeriodTimeseries : undefined
            }
            valueLabel={asMillisecondDuration(latency.value)}
          />
        );
      },
      sortable: true,
    },
    {
      field: 'throughputValue',
      name: i18n.translate(
        'xpack.apm.serviceOverview.dependenciesTableColumnThroughput',
        { defaultMessage: 'Throughput' }
      ),
      width: px(unit * 10),
      render: (_, { name, throughput }) => {
        const previousPeriodTimeseries =
          data.previousPeriod[name]?.throughput.timeseries;
        return (
          <ComparisonSparkPlot
            compact
            color="euiColorVis0"
            series={throughput.timeseries}
            comparisonSeries={
              comparisonEnabled ? previousPeriodTimeseries : undefined
            }
            valueLabel={asTransactionRate(throughput.value)}
          />
        );
      },
      sortable: true,
    },
    {
      field: 'errorRateValue',
      name: i18n.translate(
        'xpack.apm.serviceOverview.dependenciesTableColumnErrorRate',
        {
          defaultMessage: 'Error rate',
        }
      ),
      width: px(unit * 10),
      render: (_, { name, errorRate }) => {
        const previousPeriodTimeseries =
          data.previousPeriod[name]?.errorRate.timeseries;
        return (
          <ComparisonSparkPlot
            compact
            color="euiColorVis7"
            series={errorRate.timeseries}
            comparisonSeries={
              comparisonEnabled ? previousPeriodTimeseries : undefined
            }
            valueLabel={asPercent(errorRate.value, 1)}
          />
        );
      },
      sortable: true,
    },
    {
      field: 'impactValue',
      name: i18n.translate(
        'xpack.apm.serviceOverview.dependenciesTableColumnImpact',
        {
          defaultMessage: 'Impact',
        }
      ),
      width: px(unit * 5),
      render: (_, { name, impact }) => {
        const previousPeriodImpact = data.previousPeriod[name]?.impact;
        return (
          <EuiFlexGroup gutterSize="xs" direction="column">
            <EuiFlexItem>
              <ImpactBar value={impact} size="m" />
            </EuiFlexItem>
            <EuiFlexItem>
              <ImpactBar
                value={previousPeriodImpact}
                size="s"
                color="subdued"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      },
      sortable: true,
    },
  ];

  const { data = INITIAL_STATE, status } = useFetcher(
    (callApmApi) => {
      if (!start || !end) {
        return;
      }

      return callApmApi({
        endpoint: 'GET /api/apm/services/{serviceName}/dependencies',
        params: {
          path: {
            serviceName,
          },
          query: {
            start,
            end,
            environment,
            numBuckets: 20,
            comparisonStart,
            comparisonEnd,
          },
        },
      });
    },
    [start, end, serviceName, environment, comparisonStart, comparisonEnd]
  );

  // need top-level sortable fields for the managed table
  const items = data.currentPeriod.map((item) => ({
    ...item,
    errorRateValue: item.errorRate.value,
    latencyValue: item.latency.value,
    throughputValue: item.throughput.value,
    impactValue: item.impact,
  }));

  return (
    <EuiFlexGroup direction="column" gutterSize="s">
      <EuiFlexItem>
        <EuiFlexGroup responsive={false} justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiTitle size="xs">
              <h2>
                {i18n.translate(
                  'xpack.apm.serviceOverview.dependenciesTableTitle',
                  {
                    defaultMessage: 'Dependencies',
                  }
                )}
              </h2>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <ServiceMapLink serviceName={serviceName}>
              {i18n.translate(
                'xpack.apm.serviceOverview.dependenciesTableLinkText',
                {
                  defaultMessage: 'View service map',
                }
              )}
            </ServiceMapLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <TableFetchWrapper status={status}>
          <ServiceOverviewTableContainer
            isEmptyAndLoading={
              items.length === 0 && status === FETCH_STATUS.LOADING
            }
          >
            <EuiInMemoryTable
              columns={columns}
              items={items}
              allowNeutralSort={false}
              loading={status === FETCH_STATUS.LOADING}
              pagination={{
                initialPageSize: 5,
                pageSizeOptions: [5],
                hidePerPageOptions: true,
              }}
              sorting={{
                sort: {
                  direction: 'desc',
                  field: 'impactValue',
                },
              }}
            />
          </ServiceOverviewTableContainer>
        </TableFetchWrapper>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
