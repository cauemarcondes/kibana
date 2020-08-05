/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  EuiHorizontalRule,
  EuiSelect,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlParams } from '../../../../hooks/useUrlParams';
import { fromQuery, toQuery } from '../../Links/url_helpers';

interface Props {
  transactionTypes: string[];
}

function TransactionTypeFilter({ transactionTypes }: Props) {
  const history = useHistory();
  const {
    urlParams: { transactionType },
  } = useUrlParams();

  const options = transactionTypes.map((type) => ({
    text: type,
    value: type,
  }));

  return (
    <>
      <EuiTitle size="xxxs" textTransform="uppercase">
        <h4>
          {i18n.translate('xpack.apm.localFilters.titles.transactionType', {
            defaultMessage: 'Transaction type',
          })}
        </h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" />
      <EuiSpacer size="s" />
      <EuiSelect
        options={options}
        value={transactionType}
        compressed={true}
        onChange={(event) => {
          const newLocation = {
            ...history.location,
            search: fromQuery({
              ...toQuery(history.location.search),
              transactionType: event.target.value,
            }),
          };
          history.push(newLocation);
        }}
      />
    </>
  );
}

export { TransactionTypeFilter };
