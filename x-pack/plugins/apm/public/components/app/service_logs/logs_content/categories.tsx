/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButtonIcon,
  EuiScreenReaderOnly,
  RIGHT_ALIGNMENT,
} from '@elastic/eui';
import React, { useMemo, useState } from 'react';
import { getInfrastructureKQLFilter } from '..';
import { useFetcher } from '../../../../hooks/use_fetcher';
import { APIReturnType } from '../../../../services/rest/createCallApmApi';
import { InfrastructureResponse } from './';
import { ListMetric } from '../../../shared/list_metric';

type LogsCategories = APIReturnType<'GET /internal/apm/logs_categories'>;
type LogsCategory = LogsCategories['currentPeriod'][0];

interface Props {
  start: string;
  end: string;
  infrastructure?: InfrastructureResponse;
  offset?: string;
}

const INITIAL_STATE: LogsCategories = {
  currentPeriod: [],
  previousPeriod: {},
};

export function Categories({ start, end, infrastructure, offset }: Props) {
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, React.ReactElement>
  >({});

  const kuery = useMemo(
    () => getInfrastructureKQLFilter(infrastructure),
    [infrastructure]
  );

  const { data = INITIAL_STATE } = useFetcher(
    (callApmApi) => {
      if (start && end) {
        return callApmApi({
          endpoint: 'GET /internal/apm/logs_categories',
          params: {
            query: {
              start,
              end,
              kuery,
              offset,
            },
          },
        });
      }
    },
    [start, end, kuery, offset]
  );

  const toggleDetails = (item: LogsCategory) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.category]) {
      delete itemIdToExpandedRowMapValues[item.category];
    } else {
      itemIdToExpandedRowMapValues[item.category] = <div>details</div>;
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns: Array<EuiBasicTableColumn<LogsCategory>> = [
    {
      field: 'count',
      name: 'Count',
      width: '100px',
      sortable: true,
    },
    {
      field: 'timeseries',
      name: 'Timeseries',
      width: '100px',
      render: (_, { category, timeseries }) => {
        const comparisonSeries = data.previousPeriod?.[category]?.timeseries;
        return (
          <ListMetric
            series={timeseries}
            comparisonSeries={comparisonSeries}
            color="euiColorVis1"
            valueLabel={1}
          />
        );
      },
    },
    {
      field: 'category',
      name: 'Category',
      sortable: true,
    },
    {
      align: RIGHT_ALIGNMENT,
      width: '40px',
      isExpander: true,
      name: (
        <EuiScreenReaderOnly>
          <span>Expand rows</span>
        </EuiScreenReaderOnly>
      ),
      render: (item: LogsCategory) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          iconType={
            itemIdToExpandedRowMap[item.category] ? 'arrowUp' : 'arrowDown'
          }
        />
      ),
    },
  ];

  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable with expanding rows"
      itemId="category"
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      isExpandable={true}
      hasActions={true}
      columns={columns}
      items={data.currentPeriod}
    />
  );
}
