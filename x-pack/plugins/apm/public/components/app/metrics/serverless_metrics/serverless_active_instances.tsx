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
  euiPaletteColorBlind,
  EuiPanel,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import {
  asDynamicBytes,
  asMillisecondDuration,
} from '../../../../../common/utils/formatters';
import { useApmServiceContext } from '../../../../context/apm_service/use_apm_service_context';
import { useApmParams } from '../../../../hooks/use_apm_params';
import { FETCH_STATUS, useFetcher } from '../../../../hooks/use_fetcher';
import { useTimeRange } from '../../../../hooks/use_time_range';
import { APIReturnType } from '../../../../services/rest/create_call_apm_api';
import { ListMetric } from '../../../shared/list_metric';

type ServerlessActiveInstances =
  APIReturnType<'GET /internal/apm/services/{serviceName}/metrics/serverless/active_instances'>;

const palette = euiPaletteColorBlind({ rotations: 2 });

export function ServerlessActiveInstances() {
  const {
    query: { environment, kuery, rangeFrom, rangeTo },
  } = useApmParams('/services/{serviceName}/metrics');
  const { start, end } = useTimeRange({ rangeFrom, rangeTo });
  const { serviceName } = useApmServiceContext();

  const { data = { activeInstances: [], timeseries: [] }, status } = useFetcher(
    (callApmApi) => {
      if (!start || !end) {
        return undefined;
      }
      return callApmApi(
        'GET /internal/apm/services/{serviceName}/metrics/serverless/active_instances',
        {
          params: {
            path: {
              serviceName,
            },
            query: {
              kuery,
              environment,
              start,
              end,
            },
          },
        }
      );
    },
    [kuery, environment, serviceName, start, end]
  );

  const columns: Array<
    EuiBasicTableColumn<ServerlessActiveInstances['activeInstances'][0]>
  > = [
    {
      field: 'serverlessFunctionName',
      name: i18n.translate(
        'xpack.apm.serverlessMetrics.activeInstances.functionName',
        { defaultMessage: 'Function name' }
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'activeInstanceName',
      name: i18n.translate('xpack.apm.serverlessMetrics.activeInstances.name', {
        defaultMessage: 'Name',
      }),
      sortable: true,
    },
    {
      field: 'serverlessDurationAvg',
      name: i18n.translate(
        'xpack.apm.serverlessMetrics.serverlessFunctions.functionDuration',
        { defaultMessage: 'Function duration' }
      ),
      sortable: true,
      render: (_, { serverlessDurationAvg, timeseries }) => {
        return (
          <ListMetric
            isLoading={status === FETCH_STATUS.LOADING}
            series={timeseries.serverlessDuration}
            color={palette[1]}
            valueLabel={asMillisecondDuration(serverlessDurationAvg)}
          />
        );
      },
    },
    {
      field: 'billedDurationAvg',
      name: i18n.translate(
        'xpack.apm.serverlessMetrics.activeInstances.billedDuration',
        { defaultMessage: 'Billed duration' }
      ),
      sortable: true,
      render: (_, { billedDurationAvg, timeseries }) => {
        return (
          <ListMetric
            isLoading={status === FETCH_STATUS.LOADING}
            series={timeseries.billedDuration}
            color={palette[3]}
            valueLabel={asMillisecondDuration(billedDurationAvg)}
          />
        );
      },
    },
    {
      field: 'avgMemoryUsed',
      name: i18n.translate(
        'xpack.apm.serverlessMetrics.activeInstances.memoryUsageAvg',
        { defaultMessage: 'Memory usage avg.' }
      ),
      sortable: true,
      render: (_, { avgMemoryUsed }) => {
        return asDynamicBytes(avgMemoryUsed);
      },
    },
    {
      field: 'memorySize',
      name: i18n.translate(
        'xpack.apm.serverlessMetrics.activeInstances.memorySize',
        { defaultMessage: 'Memory size' }
      ),
      sortable: true,
      render: (_, { memorySize }) => {
        return asDynamicBytes(memorySize);
      },
    },
  ];

  // const max = getMaxY([{ data: data.timeseries }]);
  // const durationFormatter = getDurationFormatter(max);
  // const getYTickFormatter = getResponseTimeTickFormatter(durationFormatter);

  return (
    <EuiPanel hasBorder={true}>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <EuiTitle size="xs">
            <h2>
              {i18n.translate(
                'xpack.apm.serverlessMetrics.activeInstances.title',
                { defaultMessage: 'Active instances' }
              )}
            </h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>chart goes here</EuiFlexItem>
        <EuiFlexItem>
          <EuiInMemoryTable
            items={data.activeInstances}
            columns={columns}
            pagination={{ showPerPageOptions: false, pageSize: 5 }}
            // sorting={sorting}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
}
