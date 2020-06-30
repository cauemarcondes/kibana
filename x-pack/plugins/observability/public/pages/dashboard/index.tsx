/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import moment from 'moment';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { EuiHorizontalRule } from '@elastic/eui';
import { EmptySection } from '../../components/app/empty_section';
import { WithHeaderLayout } from '../../components/app/layout/with_header';
import { APMSection } from '../../components/app/section/apm';
import { LogsSection } from '../../components/app/section/logs';
import { MetricsSection } from '../../components/app/section/metrics';
import { UptimeSection } from '../../components/app/section/uptime';
import {
  DatePicker,
  TimePickerTime,
  TimePickerRefreshInterval,
} from '../../components/shared/data_picker';
import { fetchHasData } from '../../data_handler';
import { useFetcher } from '../../hooks/use_fetcher';
import { UI_SETTINGS, useKibanaUISettings } from '../../hooks/use_kibana_ui_settings';
import { RouteParams } from '../../routes';
import { getParsedDate } from '../../utils/date';
import { getBucketSize } from '../../utils/get_bucket_size';
import { emptySections } from './emptySection';

interface Props {
  routeParams: RouteParams<'/dashboard'>;
}

export const DashboardPage = ({ routeParams }: Props) => {
  const result = useFetcher(() => fetchHasData(), []);
  const hasData = result.data;

  const theme = useContext(ThemeContext);
  const timePickerTime = useKibanaUISettings<TimePickerTime>(UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS);
  const timePickerRefreshInterval = useKibanaUISettings<TimePickerRefreshInterval>(
    UI_SETTINGS.TIMEPICKER_REFRESH_INTERVAL_DEFAULTS
  );

  const {
    rangeFrom = timePickerTime.from,
    rangeTo = timePickerTime.to,
    refreshInterval = timePickerRefreshInterval.value,
    refreshPaused = timePickerRefreshInterval.pause,
  } = routeParams.query;

  const startTime = getParsedDate(rangeFrom);
  const endTime = getParsedDate(rangeTo, { roundUp: true });
  const bucketSize =
    startTime && endTime
      ? getBucketSize({
          start: moment.utc(startTime).valueOf(),
          end: moment.utc(endTime).valueOf(),
          minInterval: 'auto',
        })
      : undefined;

  return (
    <WithHeaderLayout
      headerColor={theme.eui.euiColorEmptyShade}
      bodyColor={theme.eui.euiPageBackgroundColor}
      showAddData
    >
      <EuiFlexGroup justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <DatePicker
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refreshInterval={refreshInterval}
            refreshPaused={refreshPaused}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiHorizontalRule />

      <EuiFlexGroup direction="column">
        {hasData?.infra_logs && (
          <EuiFlexItem>
            <LogsSection
              startTime={startTime}
              endTime={endTime}
              bucketSize={bucketSize?.intervalString}
            />
          </EuiFlexItem>
        )}
        {hasData?.infra_metrics && (
          <EuiFlexItem>
            <MetricsSection
              startTime={startTime}
              endTime={endTime}
              bucketSize={bucketSize?.intervalString}
            />
          </EuiFlexItem>
        )}
        {hasData?.apm && (
          <EuiFlexItem>
            <APMSection
              startTime={startTime}
              endTime={endTime}
              bucketSize={bucketSize?.intervalString}
            />
          </EuiFlexItem>
        )}
        {hasData?.uptime && (
          <EuiFlexItem>
            <UptimeSection
              startTime={startTime}
              endTime={endTime}
              bucketSize={bucketSize?.intervalString}
            />
          </EuiFlexItem>
        )}
      </EuiFlexGroup>

      <EuiSpacer size="s" />

      <EuiFlexGrid columns={2} gutterSize="s">
        {emptySections
          .filter(({ id }) => hasData && !hasData[id])
          .map((app) => {
            return (
              <EuiFlexItem key={app.id}>
                <EmptySection section={app} />
              </EuiFlexItem>
            );
          })}
      </EuiFlexGrid>
    </WithHeaderLayout>
  );
};
