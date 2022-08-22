/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButton } from '@elastic/eui';
import { LazyField } from '@kbn/advanced-settings-plugin/public';
import { i18n } from '@kbn/i18n';
import {
  apmLabsButton,
  apmProgressiveLoading,
  apmServiceGroupMaxNumberOfServices,
  defaultApmServiceEnvironment,
  enableComparisonByDefault,
  enableInspectEsQueries,
} from '@kbn/observability-plugin/common';
import { isEmpty } from 'lodash';
import React from 'react';
import { useApmPluginContext } from '../../../../context/apm_plugin/use_apm_plugin_context';
import { useApmEditableSettings } from '../../../../hooks/use_apm_editable_settings';

const apmSettingsKeys = [
  enableComparisonByDefault,
  defaultApmServiceEnvironment,
  apmProgressiveLoading,
  apmServiceGroupMaxNumberOfServices,
  enableInspectEsQueries,
  apmLabsButton,
];

export function GeneralSettings() {
  const { docLinks, notifications } = useApmPluginContext().core;
  const {
    handleFieldChange,
    settingsEditableConfig,
    unsavedChanges,
    saveAll,
    isSaving,
  } = useApmEditableSettings(apmSettingsKeys);

  async function handleSave() {
    await saveAll();
  }

  return (
    <>
      {apmSettingsKeys.map((settingKey) => {
        const editableConfig = settingsEditableConfig[settingKey];
        return (
          <LazyField
            key={settingKey}
            setting={editableConfig}
            handleChange={handleFieldChange}
            enableSaving
            docLinks={docLinks.links}
            toasts={notifications.toasts}
            unsavedChanges={unsavedChanges[settingKey]}
          />
        );
      })}
      <EuiButton
        fill
        isLoading={isSaving}
        disabled={isEmpty(unsavedChanges)}
        onClick={handleSave}
      >
        {i18n.translate('xpack.apm.labs.reload', {
          defaultMessage: 'Reload to apply changes',
        })}
      </EuiButton>
    </>
  );
}
