/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import * as React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import { CLS_LABEL, FID_LABEL, LCP_LABEL } from './translations';
import { CoreVitalItem } from './core_vital_item';
import { WebCoreVitalsTitle } from './web_core_vitals_title';
import { ServiceName } from './service_name';

export interface UXMetrics {
  cls: string;
  fid: number;
  lcp: number;
  tbt: number;
  fcp: number;
  lcpRanks: number[];
  fidRanks: number[];
  clsRanks: number[];
}

export function formatToSec(value?: number | string, fromUnit = 'MicroSec'): string {
  const valueInMs = Number(value ?? 0) / (fromUnit === 'MicroSec' ? 1000 : 1);

  if (valueInMs < 1000) {
    return valueInMs.toFixed(0) + ' ms';
  }
  return (valueInMs / 1000).toFixed(2) + ' s';
}

const CoreVitalsThresholds = {
  LCP: { good: '2.5s', bad: '4.0s' },
  FID: { good: '100ms', bad: '300ms' },
  CLS: { good: '0.1', bad: '0.25' },
};

interface Props {
  loading: boolean;
  data?: UXMetrics | null;
  displayServiceName?: boolean;
  serviceName?: string;
}

export function CoreVitals({ data, loading, displayServiceName, serviceName }: Props) {
  const { lcp, lcpRanks, fid, fidRanks, cls, clsRanks } = data || {};

  return (
    <>
      <WebCoreVitalsTitle />
      {displayServiceName && <ServiceName name={serviceName!} />}
      <EuiSpacer size="s" />
      <EuiFlexGroup gutterSize="xl" justifyContent={'spaceBetween'}>
        <EuiFlexItem>
          <CoreVitalItem
            title={LCP_LABEL}
            value={formatToSec(lcp, 'ms')}
            ranks={lcpRanks}
            loading={loading}
            thresholds={CoreVitalsThresholds.LCP}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <CoreVitalItem
            title={FID_LABEL}
            value={formatToSec(fid, 'ms')}
            ranks={fidRanks}
            loading={loading}
            thresholds={CoreVitalsThresholds.FID}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <CoreVitalItem
            title={CLS_LABEL}
            value={cls ?? '0'}
            ranks={clsRanks}
            loading={loading}
            thresholds={CoreVitalsThresholds.CLS}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
