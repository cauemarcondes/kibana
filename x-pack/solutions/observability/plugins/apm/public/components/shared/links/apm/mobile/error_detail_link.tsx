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
import { APM_EBT_ELEMENTS } from '../../../../app/ebt_constants';
import { useApmRouter } from '../../../../../hooks/use_apm_router';
import type { mobileServiceDetailRoute } from '../../../../routing/mobile_service_detail';

interface Props {
  children: React.ReactNode;
  title?: string;
  serviceName: string;
  groupId: string;
  query: TypeOf<
    typeof mobileServiceDetailRoute,
    '/mobile-services/{serviceName}/errors-and-crashes'
  >['query'];
}

function ErrorDetailLink({ serviceName, groupId, query, ...rest }: Props) {
  const router = useApmRouter();
  const errorDetailsLink = router.link(
    `/mobile-services/{serviceName}/errors-and-crashes/errors/{groupId}`,
    {
      path: {
        serviceName,
        groupId,
      },
      query,
    }
  );

  return (
    <EuiLink
      data-test-subj="apmMobileErrorDetailsLink"
      href={errorDetailsLink}
      {...getEbtProps({
        action: EBT_CLICK_ACTIONS.VIEW_ERROR,
        element: APM_EBT_ELEMENTS.MOBILE_ERROR_DETAIL_LINK,
      })}
      {...rest}
    />
  );
}

export { ErrorDetailLink };
