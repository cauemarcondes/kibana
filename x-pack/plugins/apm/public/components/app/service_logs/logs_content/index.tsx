/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { EuiTab, EuiTabs } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import moment from 'moment';
import React, { useState } from 'react';
import { getInfrastructureKQLFilter } from '..';
import { LogStream } from '../../../../../../infra/public';
import { useApmParams } from '../../../../hooks/use_apm_params';
import { useTimeRange } from '../../../../hooks/use_time_range';
import { APIReturnType } from '../../../../services/rest/createCallApmApi';
import { Categories } from './categories';

export type InfrastructureResponse =
  APIReturnType<'GET /internal/apm/services/{serviceName}/infrastructure'>;

interface Props {
  data?: InfrastructureResponse;
}

export function LogsContent({ data }: Props) {
  const {
    query: { rangeFrom, rangeTo },
  } = useApmParams('/services/{serviceName}/logs');

  const { start, end } = useTimeRange({ rangeFrom, rangeTo });

  const tabs = [
    {
      key: 'stream',
      label: i18n.translate('xpack.apm.logs.tabs.logsStream', {
        defaultMessage: 'Stream',
      }),
      component: <LogStreamTabContent data={data} />,
    },
    {
      key: 'categories',
      label: i18n.translate('xpack.apm.logs.tabs.categories', {
        defaultMessage: 'Categories',
      }),
      component: <Categories start={start} end={end} infrastructure={data} />,
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[1]);

  const Component = currentTab.component;

  return (
    <>
      <EuiTabs>
        {tabs.map((tab) => {
          return (
            <EuiTab
              key={tab.key}
              onClick={() => {
                setCurrentTab(tab);
              }}
              isSelected={tab.key === currentTab.key}
            >
              {tab.label}
            </EuiTab>
          );
        })}
      </EuiTabs>

      {Component}
    </>
  );
}

interface LogStreamTabContentProps {
  data?: InfrastructureResponse;
}

function LogStreamTabContent({ data }: LogStreamTabContentProps) {
  const {
    query: { rangeFrom, rangeTo },
  } = useApmParams('/services/{serviceName}/logs');

  const { start, end } = useTimeRange({ rangeFrom, rangeTo });

  return (
    <LogStream
      columns={[{ type: 'timestamp' }, { type: 'message' }]}
      height={'60vh'}
      startTimestamp={moment(start).valueOf()}
      endTimestamp={moment(end).valueOf()}
      query={getInfrastructureKQLFilter(data)}
    />
  );
}
