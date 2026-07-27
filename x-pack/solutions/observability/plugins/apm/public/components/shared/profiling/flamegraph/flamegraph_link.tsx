/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EuiFlexGroupProps } from '@elastic/eui';
import { EuiFlexGroup, EuiFlexItem, EuiLink } from '@elastic/eui';
import React from 'react';
import { i18n } from '@kbn/i18n';
import { getEbtProps } from '@kbn/ebt-click';
import { useProfilingPlugin } from '../../../../hooks/use_profiling_plugin';
import { APM_EBT_ACTIONS, APM_EBT_ELEMENTS } from '../../../app/ebt_constants';

interface Props {
  kuery: string;
  rangeFrom: string;
  rangeTo: string;
  justifyContent?: EuiFlexGroupProps['justifyContent'];
}

export function ProfilingFlamegraphLink({
  kuery,
  rangeFrom,
  rangeTo,
  justifyContent = 'flexStart',
}: Props) {
  const { profilingLocators } = useProfilingPlugin();
  return (
    <EuiFlexGroup justifyContent={justifyContent}>
      <EuiFlexItem grow={false}>
        <EuiLink
          data-test-subj="apmProfilingFlamegraphGoToFlamegraphLink"
          href={profilingLocators?.flamegraphLocator.getRedirectUrl({
            kuery,
            rangeFrom,
            rangeTo,
          })}
          {...getEbtProps({
            action: APM_EBT_ACTIONS.VIEW_FLAMEGRAPH,
            element: APM_EBT_ELEMENTS.PROFILING_FLAMEGRAPH_LINK,
          })}
        >
          {i18n.translate('xpack.apm.profiling.flamegraph.link', {
            defaultMessage: 'Go to Universal Profiling Flamegraph',
          })}
        </EuiLink>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
