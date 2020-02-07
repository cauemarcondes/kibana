/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  EuiPanel,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton
} from '@elastic/eui';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { ManagedTable } from '../../../../shared/ManagedTable';
import { Title } from './Title';
import { EmptyPrompt } from './EmptyPrompt';
import { CustomActionsFlyout } from './CustomActionsFlyout';

export const CustomActions = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  // TODO: change it to correct fields fetched from ES
  const columns = [
    {
      field: 'actionName',
      name: 'Action Name',
      truncateText: true
    },
    {
      field: 'serviceName',
      name: 'Service Name'
    },
    {
      field: 'environment',
      name: 'Environment'
    },
    {
      field: 'lastUpdate',
      name: 'Last update'
    },
    {
      field: 'actions',
      name: 'Actions'
    }
  ];

  // TODO: change to items fetched from ES.
  const items: object[] = [];
  const hasActions = !isEmpty(items);

  const onCloseFlyout = () => {
    setIsFlyoutOpen(false);
  };

  const onCreateCustomActionClick = () => {
    setIsFlyoutOpen(true);
  };

  return (
    <>
      <EuiPanel>
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false}>
            <Title />
          </EuiFlexItem>
          {hasActions && (
            <CreateActionButton
              onCreateCustomActionClick={onCreateCustomActionClick}
            />
          )}
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {isFlyoutOpen && <CustomActionsFlyout onClose={onCloseFlyout} />}
        {!hasActions ? (
          <EmptyPrompt onCreateCustomActionClick={onCreateCustomActionClick} />
        ) : (
          <ManagedTable
            items={items}
            columns={columns}
            initialPageSize={25}
            initialSortField="occurrenceCount"
            initialSortDirection="desc"
            sortItems={false}
          />
        )}
      </EuiPanel>
    </>
  );
};

const CreateActionButton = ({
  onCreateCustomActionClick
}: {
  onCreateCustomActionClick: () => void;
}) => (
  <EuiFlexItem>
    <EuiFlexGroup alignItems="center" justifyContent="flexEnd">
      <EuiFlexItem grow={false}>
        <EuiButton color="primary" fill onClick={onCreateCustomActionClick}>
          {i18n.translate(
            'xpack.apm.settings.customizeUI.customActions.createCustomAction',
            { defaultMessage: 'Create custom action' }
          )}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiFlexItem>
);
