/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { LogsSection } from '../../components/app/section/logs';
import { MetricsSection } from '../../components/app/section/metrics';
import { APMSection } from '../../components/app/section/apm';
import { UptimeSection } from '../../components/app/section/uptime';
import { UXSection } from '../../components/app/section/ux';
import {
  HasDataResponse,
  ObservabilityFetchDataPlugins,
  UXHasDataResponse,
} from '../../typings/fetch_overview_data';

interface Props {
  hasData?: Record<ObservabilityFetchDataPlugins, HasDataResponse | undefined> | null;
}

export function DataSections({ hasData }: Props) {
  return (
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="column">
        {hasData?.infra_logs && (
          <EuiFlexItem grow={false}>
            <LogsSection />
          </EuiFlexItem>
        )}
        {hasData?.infra_metrics && (
          <EuiFlexItem grow={false}>
            <MetricsSection />
          </EuiFlexItem>
        )}
        {hasData?.apm && (
          <EuiFlexItem grow={false}>
            <APMSection />
          </EuiFlexItem>
        )}
        {hasData?.uptime && (
          <EuiFlexItem grow={false}>
            <UptimeSection />
          </EuiFlexItem>
        )}
        {hasData?.ux && (
          <EuiFlexItem grow={false}>
            <UXSection serviceName={(hasData.ux as UXHasDataResponse).serviceName as string} />
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </EuiFlexItem>
  );
}
