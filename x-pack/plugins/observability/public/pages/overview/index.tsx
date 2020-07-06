/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiSpacer } from '@elastic/eui';
import moment from 'moment';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { EmptySection } from '../../components/app/empty_section';
import { WithHeaderLayout } from '../../components/app/layout/with_header';
import { News } from '../../components/app/news';
import { Resources } from '../../components/app/resources';
import { AlertsSection } from '../../components/app/section/alerts';
import { APMSection } from '../../components/app/section/apm';
import { LogsSection } from '../../components/app/section/logs';
import { MetricsSection } from '../../components/app/section/metrics';
import { UptimeSection } from '../../components/app/section/uptime';
import { DatePicker, TimePickerTime } from '../../components/shared/data_picker';
import { fetchHasData } from '../../data_handler';
import { useFetcher } from '../../hooks/use_fetcher';
import { UI_SETTINGS, useKibanaUISettings } from '../../hooks/use_kibana_ui_settings';
import { RouteParams } from '../../routes';
import { getParsedDate } from '../../utils/date';
import { getBucketSize } from '../../utils/get_bucket_size';
import { emptySections } from './emptySection';
import { usePluginContext } from '../../hooks/use_plugin_context';

interface Props {
  routeParams: RouteParams<'/overview'>;
}

export const OverviewPage = ({ routeParams }: Props) => {
  const getAlerts = async () => {
    return await core.http.get('/api/alerts/_find', {
      query: {
        page: 1,
        per_page: 10,
      },
    });
  };
  const { core } = usePluginContext();
  const result = useFetcher(() => fetchHasData(), []);
  const hasData = result.data;

  const alerts = useFetcher(() => getAlerts(), []);

  const theme = useContext(ThemeContext);
  const timePickerTime = useKibanaUISettings<TimePickerTime>(UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS);

  const {
    rangeFrom = timePickerTime.from,
    rangeTo = timePickerTime.to,
    refreshInterval = 15000,
    refreshPaused = true,
  } = routeParams.query;

  const startTime = getParsedDate(rangeFrom);
  const endTime = getParsedDate(rangeTo, { roundUp: true });
  const bucketSize =
    startTime && endTime
      ? getBucketSize({
          start: moment.utc(startTime).valueOf(),
          end: moment.utc(endTime).valueOf(),
          minInterval: '60s',
        })
      : undefined;

  const appEmptySections = emptySections.filter(({ id }) => hasData && !hasData[id]);

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
      <EuiHorizontalRule style={{ width: 'auto', margin: '24px -24px' }} />

      <EuiFlexGroup>
        <EuiFlexItem grow={6}>
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
          {!!appEmptySections.length && (
            <EuiFlexItem>
              <EuiSpacer size="s" />
              <EuiFlexGrid columns={2} gutterSize="s">
                {appEmptySections.map((app) => {
                  return (
                    <EuiFlexItem
                      key={app.id}
                      style={{
                        border: `1px dashed ${theme.eui.euiBorderColor}`,
                        borderRadius: '4px',
                      }}
                    >
                      <EmptySection section={app} />
                    </EuiFlexItem>
                  );
                })}
              </EuiFlexGrid>
            </EuiFlexItem>
          )}
        </EuiFlexItem>

        {alerts?.data?.data && (
          <EuiFlexItem grow={3}>
            <AlertsSection alerts={alerts?.data?.data} />
          </EuiFlexItem>
        )}

        <EuiFlexItem grow={1}>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>
              <Resources />
            </EuiFlexItem>
            <EuiFlexItem>
              <News />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </WithHeaderLayout>
  );
};
