/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  EuiBasicTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { isEmpty, orderBy } from 'lodash';
import React, { useState } from 'react';
import uuid from 'uuid';
import { LatencyAggregationType } from '../../../../../common/latency_aggregation_types';
import { useApmServiceContext } from '../../../../context/apm_service/use_apm_service_context';
import { useUrlParams } from '../../../../context/url_params_context/use_url_params';
import { FETCH_STATUS, useFetcher } from '../../../../hooks/use_fetcher';
import { TransactionOverviewLink } from '../../../shared/Links/apm/transaction_overview_link';
import { TableFetchWrapper } from '../../../shared/table_fetch_wrapper';
import { ServiceOverviewTableContainer } from '../service_overview_table_container';
import { getColumns } from './get_columns';

interface Props {
  serviceName: string;
}

const INITIAL_STATE = {
  transactionGroups: [],
  isAggregationAccurate: true,
  requestId: '',
};

type SortField = 'name' | 'latency' | 'throughput' | 'errorRate' | 'impact';
type SortDirection = 'asc' | 'desc';
const PAGE_SIZE = 5;
const DEFAULT_SORT = {
  direction: 'desc' as const,
  field: 'impact' as const,
};

export function ServiceOverviewTransactionsTable({ serviceName }: Props) {
  const [tableOptions, setTableOptions] = useState<{
    pageIndex: number;
    sort: {
      direction: SortDirection;
      field: SortField;
    };
  }>({
    pageIndex: 0,
    sort: DEFAULT_SORT,
  });

  const { pageIndex, sort } = tableOptions;

  const { transactionType } = useApmServiceContext();
  const {
    uiFilters,
    urlParams: { start, end, latencyAggregationType },
  } = useUrlParams();

  const { data = INITIAL_STATE, status } = useFetcher(
    (callApmApi) => {
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
      }).then((response) => {
        return {
          requestId: uuid(),
          ...response,
        };
      });
    },
    [
      serviceName,
      start,
      end,
      uiFilters,
      transactionType,
      latencyAggregationType,
    ]
  );

  const { transactionGroups, requestId } = data;
  const currentPageTransactionGroups = orderBy(
    transactionGroups,
    sort.field,
    sort.direction
  ).slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);

  const transactionNames = JSON.stringify(
    currentPageTransactionGroups.map(({ name }) => name).sort()
  );

  const {
    data: transactionGroupsStatistics,
    status: transactionGroupsStatisticsStatus,
  } = useFetcher(
    (callApmApi) => {
      if (
        !isEmpty(requestId) &&
        currentPageTransactionGroups.length &&
        start &&
        end &&
        transactionType
      ) {
        return callApmApi({
          endpoint:
            'GET /api/apm/services/{serviceName}/transactions/groups/statistics',
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
          isCachable: true,
        }).then((result) => {
          return { [requestId]: result };
        });
      }
    },
    // only fetches statistics when requestId changes or transaction names changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requestId, transactionNames]
  );

  const columns = getColumns({
    serviceName,
    latencyAggregationType,
    transactionGroupsStatistics: transactionGroupsStatistics
      ? transactionGroupsStatistics[requestId]
      : undefined,
  });

  const isLoading =
    status === FETCH_STATUS.LOADING ||
    transactionGroupsStatisticsStatus === FETCH_STATUS.LOADING;

  const pagination = {
    pageIndex,
    pageSize: PAGE_SIZE,
    totalItemCount: transactionGroups.length,
    hidePerPageOptions: true,
  };

  const sorting = {
    sort: {
      field: sort.field,
      direction: sort.direction,
    },
  };

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
              <EuiBasicTable
                loading={isLoading}
                items={currentPageTransactionGroups}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={(newTableOptions: {
                  page?: {
                    index: number;
                  };
                  sort?: { field: string; direction: SortDirection };
                }) => {
                  setTableOptions({
                    pageIndex: newTableOptions.page?.index ?? 0,
                    sort: newTableOptions.sort
                      ? {
                          field: newTableOptions.sort.field as SortField,
                          direction: newTableOptions.sort.direction,
                        }
                      : DEFAULT_SORT,
                  });
                }}
              />
            </ServiceOverviewTableContainer>
          </TableFetchWrapper>
        </EuiFlexItem>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
