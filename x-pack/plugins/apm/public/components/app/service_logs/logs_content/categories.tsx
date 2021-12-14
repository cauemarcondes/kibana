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
import React, { useState } from 'react';
import { ListMetric } from '../../../shared/list_metric';
import { data } from './data';

type Data = typeof data[0];

export function Categories() {
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, React.ElementType>
  >({});

  const toggleDetails = (item: Data) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      itemIdToExpandedRowMapValues[item.id] = <div>details</div>;
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns: Array<EuiBasicTableColumn<Data>> = [
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
      render: (_, { timeseries }) => (
        <ListMetric
          series={timeseries?.currentPeriod}
          comparisonSeries={timeseries?.previousPeriod}
          color="euiColorVis1"
          valueLabel={1}
        />
      ),
    },
    {
      field: 'category',
      name: 'Category',
      sortable: true,
    },
    {
      field: 'serviceName',
      name: 'Service name',
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
      render: (item: any) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          // @ts-ignore
          iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
        />
      ),
    },
  ];

  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable with expanding rows"
      itemId="id"
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      isExpandable={true}
      hasActions={true}
      columns={columns}
      items={data}
    />
  );
}
