/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiLink } from '@elastic/eui';
import { getEbtProps } from '@kbn/ebt-click';
import { useApmRouter } from '../../../../hooks/use_apm_router';
import type { APMLinkExtendProps } from './apm_link_hooks';
import { ENVIRONMENT_ALL } from '../../../../../common/environment_filter_values';
import { APM_EBT_ACTIONS, APM_EBT_ELEMENTS } from '../../../app/ebt_constants';

const defaultQueryParams = {
  kuery: '',
  serviceGroup: '',
  comparisonEnabled: true,
  rangeFrom: 'now-15m',
  rangeTo: 'now',
  environment: ENVIRONMENT_ALL.value,
} as const;

function HomeLink(props: APMLinkExtendProps) {
  const { link } = useApmRouter();

  const homeLink = link('/services', {
    query: defaultQueryParams,
  });

  return (
    <EuiLink
      data-test-subj="apmHomeLink"
      href={homeLink}
      {...getEbtProps({
        action: APM_EBT_ACTIONS.VIEW_SERVICE_INVENTORY,
        element: APM_EBT_ELEMENTS.APM_HOME_LINK,
      })}
      {...props}
    />
  );
}
export { HomeLink };
