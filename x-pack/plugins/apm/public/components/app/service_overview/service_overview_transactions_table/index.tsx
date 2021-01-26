/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React, { useMemo } from 'react';
import { LatencyAggregationType } from '../../../../../common/latency_aggregation_types';
import { useApmServiceContext } from '../../../../context/apm_service/use_apm_service_context';
import { useUrlParams } from '../../../../context/url_params_context/use_url_params';
import { FETCH_STATUS, useFetcher } from '../../../../hooks/use_fetcher';
import {
  APIReturnType,
  callApmApi,
} from '../../../../services/rest/createCallApmApi';
import { TransactionOverviewLink } from '../../../shared/Links/apm/transaction_overview_link';
import { ManagedTable } from '../../../shared/ManagedTable';
import { TableFetchWrapper } from '../../../shared/table_fetch_wrapper';
import { ServiceOverviewTableContainer } from '../service_overview_table_container';
import { getColumns } from './get_columns';

export type TransactionGroupsOverview = APIReturnType<'GET /api/apm/services/{serviceName}/transactions/groups/overview'>;

interface Props {
  serviceName: string;
}

const INITIAL_STATE: TransactionGroupsOverview = {
  transactionGroups: [],
  isAggregationAccurate: true,
};

export function ServiceOverviewTransactionsTable(props: Props) {
  const { serviceName } = props;
  const { transactionType } = useApmServiceContext();
  const {
    uiFilters,
    urlParams: { start, end, latencyAggregationType },
  } = useUrlParams();

  const { data = INITIAL_STATE, status } = useFetcher(() => {
    if (!start || !end || !latencyAggregationType || !transactionType) {
      return;
    }
    return callApmApi({
      endpoint:
        'GET /api/apm/services/{serviceName}/transactions/groups/overview',
      params: {
        path: { serviceName },
        query: {
          start,
          end,
          uiFilters: JSON.stringify(uiFilters),
          transactionType,
          latencyAggregationType: latencyAggregationType as LatencyAggregationType,
        },
      },
    });
  }, [
    serviceName,
    start,
    end,
    uiFilters,
    transactionType,
    latencyAggregationType,
  ]);

  const { transactionGroups } = data;

  const transactionNames = useMemo(
    () => transactionGroups.map(({ name }) => name).join(),
    [transactionGroups]
  );

  const {
    data: transactionsMetricsData,
    status: transactionsMetricsStatus,
  } = useFetcher(
    () => {
      if (transactionNames && start && end && transactionType) {
        return callApmApi({
          endpoint:
            'GET /api/apm/services/{serviceName}/transactions/groups/metrics',
          params: {
            path: { serviceName },
            query: {
              start,
              end,
              uiFilters: JSON.stringify(uiFilters),
              numBuckets: 20,
              transactionType,
              latencyAggregationType: latencyAggregationType as LatencyAggregationType,
              transactionNames,
            },
          },
        });
      }
    },
    // only fetches metrics when transaction names change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionNames]
  );

  const columns = getColumns({
    serviceName,
    latencyAggregationType,
    transactionsMetricsData,
  });

  const isLoading =
    status === FETCH_STATUS.LOADING ||
    transactionsMetricsStatus === FETCH_STATUS.LOADING;

  return (
    <EuiFlexGroup direction="column" gutterSize="s">
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="spaceBetween" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiTitle size="xs">
              <h2>
                {i18n.translate(
                  'xpack.apm.serviceOverview.transactionsTableTitle',
                  {
                    defaultMessage: 'Transactions',
                  }
                )}
              </h2>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <TransactionOverviewLink
              serviceName={serviceName}
              latencyAggregationType={latencyAggregationType}
            >
              {i18n.translate(
                'xpack.apm.serviceOverview.transactionsTableLinkText',
                {
                  defaultMessage: 'View transactions',
                }
              )}
            </TransactionOverviewLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexItem>
          <TableFetchWrapper status={status}>
            <ServiceOverviewTableContainer
              isEmptyAndLoading={transactionGroups.length === 0 && isLoading}
            >
              <ManagedTable
                isLoading={isLoading}
                // @ts-ignore
                columns={columns}
                items={transactionGroups}
                initialSortField="impact"
                initialSortDirection="desc"
                initialPageSize={5}
              />
            </ServiceOverviewTableContainer>
          </TableFetchWrapper>
        </EuiFlexItem>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
