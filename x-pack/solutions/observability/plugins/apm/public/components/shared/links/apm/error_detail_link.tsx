/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import type { TypeOf } from '@kbn/typed-react-router-config';
import { EuiLink } from '@elastic/eui';
import { EBT_CLICK_ACTIONS, getEbtProps } from '@kbn/ebt-click';
import { APM_EBT_ELEMENTS } from '../../../app/ebt_constants';
import { useApmRouter } from '../../../../hooks/use_apm_router';
import type { APMLinkExtendProps } from './apm_link_hooks';
import type { ApmRoutes } from '../../../routing/apm_route_config';

interface Props extends APMLinkExtendProps {
  serviceName: string;
  errorGroupId: string;
  query: TypeOf<ApmRoutes, '/services/{serviceName}/errors/{groupId}'>['query'];
}

function ErrorDetailLink({ serviceName, errorGroupId, query, ...rest }: Props) {
  const { link } = useApmRouter();
  const errorDetailsLink = link('/services/{serviceName}/errors/{groupId}', {
    path: {
      serviceName,
      groupId: errorGroupId,
    },
    query,
  });
  return (
    <EuiLink
      data-test-subj="apmErrorDetailsLink"
      href={errorDetailsLink}
      {...getEbtProps({
        action: EBT_CLICK_ACTIONS.VIEW_ERROR,
        element: APM_EBT_ELEMENTS.ERROR_DETAIL_LINK,
      })}
      {...rest}
    />
  );
}

export { ErrorDetailLink };
