/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiSuperDatePicker } from '@elastic/eui';
import React from 'react';
import { UI_SETTINGS } from '../../../../../../../src/plugins/data/common';
import { fromQuery, toQuery } from '../Links/url_helpers';
import { history } from '../../../utils/history';
import { useLocation } from '../../../hooks/useLocation';
import { useUrlParams } from '../../../hooks/useUrlParams';
import { clearCache } from '../../../services/rest/callApi';
import { useApmPluginContext } from '../../../hooks/useApmPluginContext';

export interface TimePickerTime {
  from: string;
  to: string;
}

interface TimePickerQuickRange extends TimePickerTime {
  display: string;
}

interface TimePickerRefreshInterval {
  pause: boolean;
  value: number;
}

export function DatePicker() {
  const { core } = useApmPluginContext();

  const quickRanges = core.uiSettings.get<TimePickerQuickRange[]>(
    UI_SETTINGS.TIMEPICKER_QUICK_RANGES
  );
  const refreshIntervalDefault = core.uiSettings.get<TimePickerRefreshInterval>(
    UI_SETTINGS.TIMEPICKER_REFRESH_INTERVAL_DEFAULTS
  );
  const timeDefault = core.uiSettings.get<TimePickerTime>(
    UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS
  );

  const location = useLocation();
  const { urlParams, refreshTimeRange } = useUrlParams();

  const commonlyUsedRanges = quickRanges.map(({ from, to, display }) => ({
    start: from,
    end: to,
    label: display,
  }));

  function updateUrl(nextQuery: {
    rangeFrom?: string;
    rangeTo?: string;
    refreshPaused?: boolean;
    refreshInterval?: number;
  }) {
    history.push({
      ...location,
      search: fromQuery({
        ...toQuery(location.search),
        ...nextQuery,
      }),
    });
  }

  function onRefreshChange({
    isPaused,
    refreshInterval,
  }: {
    isPaused: boolean;
    refreshInterval: number;
  }) {
    updateUrl({ refreshPaused: isPaused, refreshInterval });
  }

  function onTimeChange({ start, end }: { start: string; end: string }) {
    updateUrl({ rangeFrom: start, rangeTo: end });
  }

  const {
    rangeFrom = timeDefault.from,
    rangeTo = timeDefault.to,
    refreshPaused = refreshIntervalDefault.pause,
    refreshInterval = refreshIntervalDefault.value,
  } = urlParams;

  return (
    <EuiSuperDatePicker
      start={rangeFrom}
      end={rangeTo}
      isPaused={refreshPaused}
      refreshInterval={refreshInterval}
      onTimeChange={onTimeChange}
      onRefresh={({ start, end }) => {
        clearCache();
        refreshTimeRange({ rangeFrom: start, rangeTo: end });
      }}
      onRefreshChange={onRefreshChange}
      showUpdateButton={true}
      commonlyUsedRanges={commonlyUsedRanges}
    />
  );
}
