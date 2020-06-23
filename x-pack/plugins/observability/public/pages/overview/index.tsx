/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { EmptySection } from '../../components/app/empty_section';
import { WithHeaderLayout } from '../../components/app/layout/with_header';
import { APMSection } from '../../components/app/section/apm';
import { LogsSection } from '../../components/app/section/logs';
import { MetricsSection } from '../../components/app/section/metrics';
import { UptimeSection } from '../../components/app/section/uptime';
import { DatePicker, TimePickerTime } from '../../components/shared/data_picker';
import { getDataHandler } from '../../data_handler';
import { useFetcher } from '../../hooks/use_fetcher';
import { UI_SETTINGS, useKibanaUISettings } from '../../hooks/use_kibana_ui_settings';
import { RouteParams } from '../../routes';
import { getParsedDate } from '../../utils/date';
import { appsSection } from '../home/section';

interface Props {
  routeParams: RouteParams<'/overview'>;
}

export const Overview = ({ routeParams }: Props) => {
  const theme = useContext(ThemeContext);
  const timePickerTime = useKibanaUISettings<TimePickerTime>(UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS);

  const { rangeFrom = timePickerTime.from, rangeTo = timePickerTime.to } = routeParams.query;

  const { data = [] } = useFetcher(() => {
    const startTime = getParsedDate(rangeFrom);
    const endTime = getParsedDate(rangeTo);
    if (startTime && endTime) {
      const params = { startTime, endTime, bucketSize: '3' };
      const apmDataPromise = getDataHandler('apm')?.fetchData(params);
      const logsDataPromise = getDataHandler('infra_logs')?.fetchData(params);
      const metricsDataPromise = getDataHandler('infra_metrics')?.fetchData(params);
      const uptimeDataPromise = getDataHandler('uptime')?.fetchData(params);

      return Promise.all([apmDataPromise, logsDataPromise, metricsDataPromise, uptimeDataPromise]);
    }
  }, [rangeFrom, rangeTo]);

  const [apmData, logsData, metricsData, uptimeData] = data;

  const emptySections = appsSection.filter((app) => {
    switch (app.id) {
      case 'apm':
        return isEmpty(apmData);
      case 'infra_logs':
        return isEmpty(logsData);
      case 'infra_metrics':
        return isEmpty(metricsData);
      case 'uptime':
        return isEmpty(uptimeData);
      default:
        return true;
    }
  });

  return (
    <WithHeaderLayout
      headerColor={theme.eui.euiColorEmptyShade}
      bodyColor={theme.eui.euiPageBackgroundColor}
    >
      <EuiFlexGroup justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <DatePicker rangeFrom={rangeFrom} rangeTo={rangeTo} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup direction="row">
        <EuiFlexItem grow={6}>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <LogsSection data={logsData} />
            </EuiFlexItem>
            <EuiFlexItem>
              <MetricsSection data={metricsData} />
            </EuiFlexItem>
            <EuiFlexItem>
              <APMSection data={apmData} />
            </EuiFlexItem>
            <EuiFlexItem>
              <UptimeSection data={uptimeData} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={4}>Alert chart goes here</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />

      <EuiFlexItem>
        <EuiFlexGrid columns={2}>
          {emptySections.map((app) => {
            return (
              <EuiFlexItem key={app.id}>
                <EmptySection section={app} />
              </EuiFlexItem>
            );
          })}
        </EuiFlexGrid>
      </EuiFlexItem>
    </WithHeaderLayout>
  );
};
