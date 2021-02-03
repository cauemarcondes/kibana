/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiPanel, EuiTitle } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { useParams } from 'react-router-dom';
import { asTransactionRate } from '../../../../common/utils/formatters';
import { useFetcher } from '../../../hooks/use_fetcher';
import { useTheme } from '../../../hooks/use_theme';
import { useUrlParams } from '../../../context/url_params_context/use_url_params';
import { useApmServiceContext } from '../../../context/apm_service/use_apm_service_context';
import { TimeseriesChart } from '../../shared/charts/timeseries_chart';
import { getTimeRangeComparison } from '../../shared/time_comparison/get_time_range_comparison';

export function ServiceOverviewThroughputChart({
  height,
}: {
  height?: number;
}) {
  const theme = useTheme();
  const { serviceName } = useParams<{ serviceName?: string }>();
  const { urlParams, uiFilters } = useUrlParams();
  const { transactionType } = useApmServiceContext();
  const { start, end, comparisonEnabled, comparisonType } = urlParams;
  const { comparisonStart, comparisonEnd } = getTimeRangeComparison({
    start,
    end,
    comparisonType,
  });

  const { data, status } = useFetcher(
    (callApmApi) => {
      if (serviceName && transactionType && start && end) {
        return callApmApi({
          endpoint: 'GET /api/apm/services/{serviceName}/throughput',
          params: {
            path: {
              serviceName,
            },
            query: {
              start,
              end,
              transactionType,
              uiFilters: JSON.stringify(uiFilters),
              comparisonStart,
              comparisonEnd,
            },
          },
        });
      }
    },
    [
      serviceName,
      start,
      end,
      uiFilters,
      transactionType,
      comparisonStart,
      comparisonEnd,
    ]
  );

  return (
    <EuiPanel>
      <EuiTitle size="xs">
        <h2>
          {i18n.translate('xpack.apm.serviceOverview.throughtputChartTitle', {
            defaultMessage: 'Throughput',
          })}
        </h2>
      </EuiTitle>
      <TimeseriesChart
        id="throughput"
        height={height}
        showAnnotations={false}
        fetchStatus={status}
        timeseries={[
          {
            data: data?.timeseries ?? [],
            type: 'linemark',
            color: theme.eui.euiColorVis0,
            title: i18n.translate(
              'xpack.apm.serviceOverview.throughtputChartTitle',
              { defaultMessage: 'Throughput' }
            ),
          },
          ...(comparisonEnabled
            ? [
                {
                  data: data?.comparisonTimeseries ?? [],
                  type: 'area',
                  color: 'red',
                  title: i18n.translate(
                    'xpack.apm.serviceOverview.comparisonLabel',
                    {
                      defaultMessage: 'Comparison',
                    }
                  ),
                },
              ]
            : []),
        ]}
        yLabelFormat={asTransactionRate}
      />
    </EuiPanel>
  );
}
