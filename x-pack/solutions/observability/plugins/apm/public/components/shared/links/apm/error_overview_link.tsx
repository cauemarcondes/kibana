/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiLink } from '@elastic/eui';
import type { TypeOf } from '@kbn/typed-react-router-config';
import { EBT_CLICK_ACTIONS, getEbtProps } from '@kbn/ebt-click';
import { APM_EBT_ELEMENTS } from '../../../app/ebt_constants';
import { useApmRouter } from '../../../../hooks/use_apm_router';
import type { ApmRoutes } from '../../../routing/apm_route_config';

interface Props {
  children: React.ReactNode;
  title?: string;
  serviceName: string;
  query: TypeOf<ApmRoutes, '/services/{serviceName}/errors'>['query'];
}

export function ErrorOverviewLink({ serviceName, query, ...rest }: Props) {
  const router = useApmRouter();
  const errorOverviewLink = router.link('/services/{serviceName}/errors', {
    path: {
      serviceName,
    },
    query,
  });

  return (
    <EuiLink
      data-test-subj="apmErrorOverviewLinkLink"
      href={errorOverviewLink}
      {...getEbtProps({
        action: EBT_CLICK_ACTIONS.VIEW_ERRORS,
        element: APM_EBT_ELEMENTS.ERROR_OVERVIEW_LINK,
      })}
      {...rest}
    />
  );
}
