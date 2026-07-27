/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ReactNode } from 'react';
import React from 'react';
import { EuiLink } from '@elastic/eui';
import { EBT_CLICK_ACTIONS, getEbtProps } from '@kbn/ebt-click';
import { useMlHref, ML_PAGES } from '@kbn/ml-plugin/public';
import { APM_EBT_ELEMENTS } from '../../../app/ebt_constants';
import { useApmPluginContext } from '../../../../context/apm_plugin/use_apm_plugin_context';
import { useLegacyUrlParams } from '../../../../context/url_params_context/use_url_params';
import { DEFAULT_REFRESH_INTERVAL } from '../../date_picker/apm_date_picker';

interface Props {
  children?: ReactNode;
  jobId: string;
  external?: boolean;
}

export function MLExplorerLink({ jobId, external, children }: Props) {
  const href = useExplorerHref({ jobId });

  return (
    <EuiLink
      data-test-subj="apmMLExplorerLinkLink"
      children={children}
      href={href}
      external={external}
      target={external ? '_blank' : undefined}
      {...getEbtProps({
        action: EBT_CLICK_ACTIONS.VIEW_ANOMALIES,
        element: APM_EBT_ELEMENTS.ML_ANOMALY_EXPLORER_LINK,
      })}
    />
  );
}

export function useExplorerHref({ jobId }: { jobId: string }) {
  const {
    core,
    plugins: { ml },
  } = useApmPluginContext();
  const { urlParams } = useLegacyUrlParams();

  const {
    // hardcoding a custom default of 1 hour since the default kibana timerange of 15 minutes is shorter than the ML interval
    rangeFrom = 'now-1h',
    rangeTo = 'now',
  } = urlParams;

  const href = useMlHref(ml, core.http.basePath.get(), {
    page: ML_PAGES.ANOMALY_EXPLORER,
    pageState: {
      jobIds: [jobId],
      timeRange: { from: rangeFrom, to: rangeTo },
      refreshInterval: { pause: true, value: DEFAULT_REFRESH_INTERVAL },
    },
  });

  return href;
}
