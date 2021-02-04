/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n/react';

export function validateServerName(serverName) {
  if (!serverName || !serverName.trim()) {
    return (
      <FormattedMessage
        id="xpack.remoteClusters.form.errors.serverNameMissing"
        defaultMessage="A server name is required."
      />
    );
  }

  return null;
}
