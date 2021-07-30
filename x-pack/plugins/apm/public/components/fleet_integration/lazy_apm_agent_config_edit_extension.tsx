/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { PackagePolicyEditExtensionComponent } from '../../../../fleet/public';

export const getLazyAPMAgentConfigEditExtension = () => {
  return lazy<PackagePolicyEditExtensionComponent>(async () => {
    const { EditAPMAgentConfig } = await import(
      './agent_configuration/edit_apm_agent_config'
    );

    return { default: EditAPMAgentConfig };
  });
};
