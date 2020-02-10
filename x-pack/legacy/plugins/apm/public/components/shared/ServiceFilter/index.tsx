/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { EuiSelect } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import {
  getOptionLabel,
  omitAllOption,
  ALL_OPTION_VALUE
} from '../../../../common/agent_configuration_constants';
import { useFetcher } from '../../../hooks/useFetcher';
import { useLocation } from '../../../hooks/useLocation';
import { history } from '../../../utils/history';
import { fromQuery, toQuery } from '../Links/url_helpers';
import { useUrlParams } from '../../../hooks/useUrlParams';

function updateServiceNameUrl(
  location: ReturnType<typeof useLocation>,
  serviceName: string
) {
  history.push({
    ...location,
    search: fromQuery({
      ...toQuery(location.search),
      serviceName: omitAllOption(serviceName)
    })
  });
}

export const ServiceFilter = () => {
  const location = useLocation();
  const { uiFilters } = useUrlParams();
  const { serviceNameFilter } = uiFilters;

  const { data: serviceNames = [], status } = useFetcher(
    callApmApi => {
      return callApmApi({
        pathname: '/api/apm/settings/agent-configuration/services',
        forceCache: true
      });
    },
    [],
    { preservePreviousData: false }
  );

  const serviceNameOptions = serviceNames.map(name => ({
    text: getOptionLabel(name),
    value: name
  }));

  return (
    <EuiSelect
      prepend={i18n.translate('xpack.apm.filter.service.label', {
        defaultMessage: 'service name'
      })}
      options={serviceNameOptions}
      value={serviceNameFilter || ALL_OPTION_VALUE}
      onChange={event => {
        updateServiceNameUrl(location, event.target.value);
      }}
      isLoading={status === 'loading'}
    />
  );
};
