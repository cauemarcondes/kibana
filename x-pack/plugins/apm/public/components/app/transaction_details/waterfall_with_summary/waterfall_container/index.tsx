/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexGroup, EuiFlexItem, EuiSwitch } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import {
  IWaterfall,
  WaterfallLegendType,
} from '../../../../../../common/waterfall_helper/typings';
import { useCriticalPathFeatureEnabledSetting } from '../../../../../hooks/use_critical_path_feature_enabled_setting';
import { TechnicalPreviewBadge } from '../../../../shared/technical_preview_badge';
import { Waterfall } from './waterfall';
import { WaterfallLegends } from './waterfall_legends';

interface Props {
  waterfallItemId?: string;
  serviceName?: string;
  waterfall: IWaterfall;
  showCriticalPath: boolean;
  onShowCriticalPathChange: (showCriticalPath: boolean) => void;
}

export function WaterfallContainer({
  serviceName,
  waterfallItemId,
  waterfall,
  showCriticalPath,
  onShowCriticalPathChange,
}: Props) {
  const isCriticalPathFeatureEnabled = useCriticalPathFeatureEnabledSetting();

  if (!waterfall) {
    return null;
  }

  const { legends } = waterfall;

  // Service colors are needed to color the dot in the error popover
  const serviceLegends = legends.filter(
    ({ type }) => type === WaterfallLegendType.ServiceName
  );

  // only color by span type if there are only events for one service
  const colorBy =
    serviceLegends.length > 1
      ? WaterfallLegendType.ServiceName
      : WaterfallLegendType.SpanType;

  const displayedLegends = legends.filter((legend) => legend.type === colorBy);

  // default to serviceName if value is empty, e.g. for transactions (which don't
  // have span.type or span.subtype)
  const legendsWithFallbackLabel = displayedLegends.map((legend) => {
    return { ...legend, value: !legend.value ? serviceName : legend.value };
  });

  return (
    <EuiFlexGroup direction="column">
      {isCriticalPathFeatureEnabled ? (
        <EuiFlexItem>
          <EuiSwitch
            id="showCriticalPath"
            label={
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  {i18n.translate('xpack.apm.waterfall.showCriticalPath', {
                    defaultMessage: 'Show critical path',
                  })}
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <TechnicalPreviewBadge icon="beaker" />
                </EuiFlexItem>
              </EuiFlexGroup>
            }
            checked={showCriticalPath}
            onChange={(event) => {
              onShowCriticalPathChange(event.target.checked);
            }}
          />
        </EuiFlexItem>
      ) : null}
      <EuiFlexItem>
        <WaterfallLegends legends={legendsWithFallbackLabel} type={colorBy} />
      </EuiFlexItem>
      <EuiFlexItem>
        <Waterfall
          showCriticalPath={showCriticalPath}
          waterfallItemId={waterfallItemId}
          waterfall={waterfall}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
