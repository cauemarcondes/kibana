/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiFlexItem,
  EuiCheckbox,
  EuiFieldNumber,
  EuiBadge,
} from '@elastic/eui';
import { Location } from 'history';
import React, { useState } from 'react';
import { keyBy } from 'lodash';
import { useParams } from 'react-router-dom';
import { i18n } from '@kbn/i18n';
import { IUrlParams } from '../../../../../context/url_params_context/types';
import {
  IWaterfall,
  WaterfallLegendType,
} from './Waterfall/waterfall_helpers/waterfall_helpers';
import { Waterfall } from './Waterfall';
import { WaterfallLegends } from './WaterfallLegends';
import { compressSpans } from './Waterfall/waterfall_helpers/compress-spans';
import { useTheme } from '../../../../../hooks/use_theme';

interface Props {
  urlParams: IUrlParams;
  location: Location;
  waterfall: IWaterfall;
  exceedsMax: boolean;
}

export function WaterfallContainer({
  location,
  urlParams,
  waterfall,
  exceedsMax,
}: Props) {
  const { serviceName } = useParams<{ serviceName: string }>();

  const [isCompressSpansEnabled, setIsCompressSpansEnabled] = useState(false);
  const [durationThresholdMs, setDurationThresholdMs] = useState(5);
  const [nPlusOneThreshold, setNPlusOneThreshold] = useState(10);
  const theme = useTheme();
  if (!waterfall) {
    return null;
  }

  const { legends, items } = waterfall;

  // Service colors are needed to color the dot in the error popover
  const serviceLegends = legends.filter(
    ({ type }) => type === WaterfallLegendType.ServiceName
  );
  const serviceColors = serviceLegends.reduce((colorMap, legend) => {
    return {
      ...colorMap,
      [legend.value!]: legend.color,
    };
  }, {} as Record<string, string>);

  // only color by span type if there are only events for one service
  const colorBy =
    serviceLegends.length > 1
      ? WaterfallLegendType.ServiceName
      : WaterfallLegendType.SpanType;

  const displayedLegends = legends.filter((legend) => legend.type === colorBy);

  const legendsByValue = keyBy(displayedLegends, 'value');

  // mutate items rather than rebuilding both items and childrenByParentId
  items.forEach((item) => {
    let color = '';
    if ('legendValues' in item) {
      color = legendsByValue[item.legendValues[colorBy]].color;
    }

    if (!color) {
      // fall back to service color if there's no span.type, e.g. for transactions
      color = serviceColors[item.doc.service.name];
    }

    item.color = color;
  });

  // default to serviceName if value is empty, e.g. for transactions (which don't
  // have span.type or span.subtype)
  const legendsWithFallbackLabel = displayedLegends.map((legend) => {
    return { ...legend, value: !legend.value ? serviceName : legend.value };
  });

  const waterfallToRender = isCompressSpansEnabled
    ? compressSpans({ waterfall, nPlusOneThreshold, durationThresholdMs })
    : waterfall;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <WaterfallLegends legends={legendsWithFallbackLabel} type={colorBy} />
        {waterfallToRender.antipatternDetected && (
          <EuiFlexItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EuiBadge color={theme.eui.euiColorWarning}>
              {i18n.translate(
                'xpack.apm.watefall.compressedSpans.nPlusOnePatternDetected',
                { defaultMessage: 'N+1 pattern detected!' }
              )}
            </EuiBadge>
          </EuiFlexItem>
        )}
        <EuiFlexItem
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <div style={{ marginLeft: '5px' }}>
            <EuiFieldNumber
              value={durationThresholdMs}
              prepend={i18n.translate(
                'xpack.apm.watefall.compressedSpans.durationThreshold',
                { defaultMessage: 'Duration Threshold' }
              )}
              append={'ms'}
              min={1}
              max={1000}
              compressed
              onChange={(e) => setDurationThresholdMs(+e.target.value)}
            />
          </div>
          <div style={{ marginLeft: '5px' }}>
            <EuiFieldNumber
              value={nPlusOneThreshold}
              prepend={i18n.translate(
                'xpack.apm.watefall.compressedSpans.nPlusOneThreshold',
                { defaultMessage: 'N+1 Threshold' }
              )}
              min={2}
              max={20}
              compressed
              onChange={(e) => {
                setNPlusOneThreshold(+e.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: '5px' }}>
            <EuiCheckbox
              id="compress-spans"
              label={i18n.translate('xpack.apm.watefall.compressSpans.label', {
                defaultMessage: 'Compress spans',
              })}
              checked={isCompressSpansEnabled}
              onChange={() => setIsCompressSpansEnabled((state) => !state)}
            />
          </div>
        </EuiFlexItem>
      </div>

      <Waterfall
        location={location}
        waterfallItemId={urlParams.waterfallItemId}
        waterfall={waterfallToRender}
        exceedsMax={exceedsMax}
      />
    </div>
  );
}
