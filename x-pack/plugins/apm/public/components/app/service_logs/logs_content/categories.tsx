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
  EuiLoadingContent,
  EuiScreenReaderOnly,
  EuiSelect,
  EuiSpacer,
  EuiText,
  RIGHT_ALIGNMENT,
} from '@elastic/eui';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getInfrastructureKQLFilter } from '..';
import { CONTAINER_ID } from '../../../../../common/elasticsearch_fieldnames';
import { TimeRangeComparisonType } from '../../../../../common/runtime_types/comparison_type_rt';
import { useApmServiceContext } from '../../../../context/apm_service/use_apm_service_context';
import { useFetcher, FETCH_STATUS } from '../../../../hooks/use_fetcher';
import { APIReturnType } from '../../../../services/rest/createCallApmApi';
import { ListMetric } from '../../../shared/list_metric';
import { getTimeRangeComparison } from '../../../shared/time_comparison/get_time_range_comparison';
import { InfrastructureResponse } from './';

type LogsCategories = APIReturnType<'GET /internal/apm/logs_categories'>;
type LogsCategory = LogsCategories['logsCategories'][0];

interface Props {
  start: string;
  end: string;
  infrastructure?: InfrastructureResponse;
  comparisonEnabled?: boolean;
  comparisonType?: TimeRangeComparisonType;
}

const INITIAL_STATE: LogsCategories = {
  logsCategories: [],
};

export function Categories({
  start,
  end,
  infrastructure,
  comparisonEnabled,
  comparisonType,
}: Props) {
  const { serviceName } = useApmServiceContext();
  const [currentVersion, setCurrentVersion] = useState<string | undefined>();
  const [previousVersion, setPreviousVersion] = useState<string | undefined>();

  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, React.ReactElement>
  >({});

  const kuery = useMemo(
    () => getInfrastructureKQLFilter(infrastructure),
    [infrastructure]
  );

  const { offset } = getTimeRangeComparison({
    comparisonEnabled,
    comparisonType,
    start,
    end,
  });

  const { data: serviceDetails } = useFetcher(
    (_callApmApi) => {
      const containerIds = infrastructure?.serviceInfrastructure.containerIds;
      if (comparisonType === 'version' && containerIds) {
        return Promise.all(
          containerIds.map((containerId) => {
            return _callApmApi({
              endpoint:
                'GET /internal/apm/services/{serviceName}/service_overview_instances/details/{serviceNodeName}',
              params: {
                path: {
                  serviceNodeName: containerId,
                  serviceName,
                },
                query: {
                  start,
                  end,
                },
              },
            });
          })
        );
      }
    },
    [
      comparisonType,
      start,
      end,
      infrastructure?.serviceInfrastructure.containerIds,
      serviceName,
    ]
  );

  const { data = INITIAL_STATE } = useFetcher(
    (_callApmApi) => {
      if (start && end) {
        return _callApmApi({
          endpoint: 'GET /internal/apm/logs_categories',
          params: {
            query: {
              start,
              end,
              kuery,
              offset,
              currentVersion,
              previousVersion,
            },
          },
        });
      }
    },
    [start, end, kuery, offset, currentVersion, previousVersion]
  );

  const toggleDetails = async (item: LogsCategory) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.category]) {
      delete itemIdToExpandedRowMapValues[item.category];
    } else {
      itemIdToExpandedRowMapValues[item.category] = (
        <LogsDetails
          start={start}
          end={end}
          categoryName={item.category}
          previousVersion={previousVersion}
          currentVersion={currentVersion}
        />
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns: Array<EuiBasicTableColumn<LogsCategory>> = [
    {
      field: 'count',
      name: 'Count',
      width: '100px',
      sortable: true,
      render: (_, { currentPeriod }) => {
        return currentPeriod.count;
      },
    },
    {
      field: 'timeseries',
      name: 'Timeseries',
      width: '100px',
      render: (_, { currentPeriod, previousPeriod }) => {
        return (
          <ListMetric
            series={currentPeriod.timeseries}
            comparisonSeries={previousPeriod?.timeseries}
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

  const versionOptions = [
    { value: 'none', text: '' },
    ...(serviceDetails?.map((item) => {
      return {
        value: item.container?.id,
        text: item.service.version,
      };
    }) || []),
  ];

  function onChangeCurrentVersion(nextVersion: string) {
    setCurrentVersion(nextVersion);
  }

  function onChangePreviousVersion(nextVersion: string) {
    setPreviousVersion(nextVersion);
  }

  return (
    <>
      <EuiSpacer />
      <div>
        <EuiText>Previous version</EuiText>
        <EuiSelect
          options={versionOptions?.filter(
            (item) => item.value !== currentVersion
          )}
          value={previousVersion}
          onChange={(e) => onChangePreviousVersion(e.target.value)}
        />

        <EuiText>Current version</EuiText>
        <EuiSelect
          options={versionOptions?.filter(
            (item) => item.value !== previousVersion
          )}
          value={currentVersion}
          onChange={(e) => onChangeCurrentVersion(e.target.value)}
        />
      </div>
      <EuiSpacer />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable with expanding rows"
        itemId="category"
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
        hasActions={true}
        columns={columns}
        items={data.logsCategories}
      />
    </>
  );
}

const StyledUL = styled.ul`
  width: 100%;
  li {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
    &:last-of-type {
      margin-bottom: 0;
    }

    span {
      margin-right: 8px;

      &:last-of-type {
        margin-right: 0;
        margin-bottom: 0;
      }
    }

    &.currentVersion {
      background-color: ${({ theme }) => theme.eui.euiColorVis1}7f;
    }

    &.previousVersion {
      background-color: ${({ theme }) => theme.eui.euiColorLightestShade};
    }
  }
`;

function LogsDetails({
  start,
  end,
  categoryName,
  currentVersion,
  previousVersion,
}: {
  start: string;
  end: string;
  categoryName: string;
  currentVersion?: string;
  previousVersion?: string;
}) {
  const kuery =
    currentVersion && previousVersion
      ? [currentVersion, previousVersion]
          .map((version) => `${CONTAINER_ID}: "${version}"`)
          .join(' or ')
      : '';

  const { data, status } = useFetcher(
    (callApmApi) => {
      return callApmApi({
        endpoint: 'GET /internal/apm/logs_categories/{categoryName}',
        params: {
          path: { categoryName },
          query: { start, end, kuery },
        },
      });
    },
    [start, end, categoryName, kuery]
  );

  if (status === FETCH_STATUS.LOADING) {
    return <EuiLoadingContent />;
  }

  return (
    <StyledUL>
      {data?.logs.map((item, index) => {
        const containerId = item.container.id;
        const classnames = classNames({
          currentVersion: currentVersion === containerId,
          previousVersion: previousVersion === containerId,
        });
        return (
          <li key={index} className={classnames}>
            <span>{item.timestamp}</span>
            <span className="eui-textTruncate" title={item.message}>
              {item.message}
            </span>
            <span className="eui-textTruncate" title={item.container.name}>
              {item.container.name}
            </span>
          </li>
        );
      })}
    </StyledUL>
  );
}
