/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiIcon,
  EuiTitle,
} from '@elastic/eui';
import { LazyField } from '@kbn/advanced-settings-plugin/public';
import { i18n } from '@kbn/i18n';
import { apmExperimentalFeaturesSettings } from '@kbn/observability-plugin/common';
import React, { useState } from 'react';
import { useApmPluginContext } from '../../../context/apm_plugin/use_apm_plugin_context';
import { useApmEditableSettings } from '../../../hooks/use_apm_editable_settings';

export function LabsSettingsFlyout() {
  const [isOpen, setIsOpen] = useState(false);
  const { docLinks, notifications } = useApmPluginContext().core;
  const experimentalFeatureKeys = Object.keys(apmExperimentalFeaturesSettings);
  const {
    handleFieldChange,
    settingsEditableConfig,
    unsavedChanges,
    saveAll,
    isSaving,
    cleanUnsavedChanges,
  } = useApmEditableSettings(experimentalFeatureKeys);

  function toggleFlyoutVisibility() {
    setIsOpen((state) => !state);
  }

  async function handleSave() {
    const reloadPage = Object.keys(unsavedChanges).some((key) => {
      return settingsEditableConfig[key].requiresPageReload;
    });

    await saveAll();

    if (reloadPage) {
      window.location.reload();
    } else {
      setIsOpen(false);
    }
  }

  function handelCancel() {
    cleanUnsavedChanges();
    toggleFlyoutVisibility();
  }

  return (
    <>
      <EuiButtonEmpty color="text" onClick={toggleFlyoutVisibility}>
        {i18n.translate('xpack.apm.labs', { defaultMessage: 'Labs' })}
      </EuiButtonEmpty>
      {isOpen && (
        <EuiFlyout onClose={toggleFlyoutVisibility}>
          <EuiFlyoutHeader hasBorder>
            <EuiFlexGroup gutterSize="m">
              <EuiFlexItem grow={false}>
                <EuiIcon type="beaker" size="xl" />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiTitle>
                  <h2>
                    {i18n.translate('xpack.apm.labs', {
                      defaultMessage: 'Labs',
                    })}
                  </h2>
                </EuiTitle>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {experimentalFeatureKeys.map((settingKey, i) => {
              const editableConfig = settingsEditableConfig[settingKey];
              return (
                <>
                  <LazyField
                    key={settingKey}
                    setting={editableConfig}
                    handleChange={handleFieldChange}
                    enableSaving
                    docLinks={docLinks.links}
                    toasts={notifications.toasts}
                    unsavedChanges={unsavedChanges[settingKey]}
                  />
                  <EuiHorizontalRule />
                </>
              );
            })}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty onClick={handelCancel}>
                  {i18n.translate('xpack.apm.labs.cancel', {
                    defaultMessage: 'Cancel',
                  })}
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton fill isLoading={isSaving} onClick={handleSave}>
                  {i18n.translate('xpack.apm.labs.reload', {
                    defaultMessage: 'Reload to apply changes',
                  })}
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      )}
    </>
  );
}
