/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema } from '@kbn/config-schema';
import { UiSettingsParams } from '@kbn/core/types';
import { i18n } from '@kbn/i18n';
import { observabilityFeatureId, ProgressiveLoadingQuality } from '../common';
import { apmExperimentalFeaturesSettings } from '../common/apm_ui_experimental_features_settings';
import {
  apmLabsButton,
  apmProgressiveLoading,
  apmServiceGroupMaxNumberOfServices,
  defaultApmServiceEnvironment,
  enableComparisonByDefault,
  enableInspectEsQueries,
  enableNewSyntheticsView,
  maxSuggestions,
} from '../common/ui_settings_keys';

const technicalPreviewLabel = i18n.translate(
  'xpack.observability.uiSettings.technicalPreviewLabel',
  { defaultMessage: 'technical preview' }
);

/**
 * uiSettings definitions for Observability.
 */
export const uiSettings: Record<string, UiSettingsParams<boolean | number | string>> = {
  [enableNewSyntheticsView]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.enableNewSyntheticsViewExperimentName', {
      defaultMessage: 'Enable new synthetic monitoring application',
    }),
    value: false,
    description: i18n.translate(
      'xpack.observability.enableNewSyntheticsViewExperimentDescription',
      {
        defaultMessage:
          'Enable new synthetic monitoring application in observability. Refresh the page to apply the setting.',
      }
    ),
    schema: schema.boolean(),
    requiresPageReload: true,
  },
  [enableInspectEsQueries]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.enableInspectEsQueriesExperimentName', {
      defaultMessage: 'Inspect ES queries',
    }),
    value: false,
    description: i18n.translate('xpack.observability.enableInspectEsQueriesExperimentDescription', {
      defaultMessage: 'Inspect Elasticsearch queries in API responses.',
    }),
    schema: schema.boolean(),
  },
  [maxSuggestions]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.maxSuggestionsUiSettingName', {
      defaultMessage: 'Maximum suggestions',
    }),
    value: 100,
    description: i18n.translate('xpack.observability.maxSuggestionsUiSettingDescription', {
      defaultMessage: 'Maximum number of suggestions fetched in autocomplete selection boxes.',
    }),
    schema: schema.number(),
  },
  [enableComparisonByDefault]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.enableComparisonByDefault', {
      defaultMessage: 'Comparison feature',
    }),
    value: true,
    description: i18n.translate('xpack.observability.enableComparisonByDefaultDescription', {
      defaultMessage: 'Enable the comparison feature in APM app',
    }),
    schema: schema.boolean(),
  },
  [defaultApmServiceEnvironment]: {
    category: [observabilityFeatureId],
    sensitive: true,
    name: i18n.translate('xpack.observability.defaultApmServiceEnvironment', {
      defaultMessage: 'Default service environment',
    }),
    description: i18n.translate('xpack.observability.defaultApmServiceEnvironmentDescription', {
      defaultMessage:
        'Set the default environment for the APM app. When left empty, data from all environments will be displayed by default.',
    }),
    value: '',
    schema: schema.string(),
  },
  [apmProgressiveLoading]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.apmProgressiveLoading', {
      defaultMessage: 'Use progressive loading of selected APM views',
    }),
    description: i18n.translate('xpack.observability.apmProgressiveLoadingDescription', {
      defaultMessage:
        '{technicalPreviewLabel} Whether to load data progressively for APM views. Data may be requested with a lower sampling rate first, with lower accuracy but faster response times, while the unsampled data loads in the background',
      values: { technicalPreviewLabel: `<em>[${technicalPreviewLabel}]</em>` },
    }),
    value: ProgressiveLoadingQuality.off,
    schema: schema.oneOf([
      schema.literal(ProgressiveLoadingQuality.off),
      schema.literal(ProgressiveLoadingQuality.low),
      schema.literal(ProgressiveLoadingQuality.medium),
      schema.literal(ProgressiveLoadingQuality.high),
    ]),
    requiresPageReload: false,
    type: 'select',
    options: [
      ProgressiveLoadingQuality.off,
      ProgressiveLoadingQuality.low,
      ProgressiveLoadingQuality.medium,
      ProgressiveLoadingQuality.high,
    ],
    optionLabels: {
      [ProgressiveLoadingQuality.off]: i18n.translate(
        'xpack.observability.apmProgressiveLoadingQualityOff',
        {
          defaultMessage: 'Off',
        }
      ),
      [ProgressiveLoadingQuality.low]: i18n.translate(
        'xpack.observability.apmProgressiveLoadingQualityLow',
        {
          defaultMessage: 'Low sampling rate (fastest, least accurate)',
        }
      ),
      [ProgressiveLoadingQuality.medium]: i18n.translate(
        'xpack.observability.apmProgressiveLoadingQualityMedium',
        {
          defaultMessage: 'Medium sampling rate',
        }
      ),
      [ProgressiveLoadingQuality.high]: i18n.translate(
        'xpack.observability.apmProgressiveLoadingQualityHigh',
        {
          defaultMessage: 'High sampling rate (slower, most accurate)',
        }
      ),
    },
  },

  [apmServiceGroupMaxNumberOfServices]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.serviceGroupMaxServicesUiSettingName', {
      defaultMessage: 'Maximum services in a service group',
    }),
    value: 500,
    description: i18n.translate('xpack.observability.serviceGroupMaxServicesUiSettingDescription', {
      defaultMessage: 'Limit the number of services in a given service group',
    }),
    schema: schema.number({ min: 1 }),
  },

  [apmLabsButton]: {
    category: [observabilityFeatureId],
    name: i18n.translate('xpack.observability.apmLabsButton', {
      defaultMessage: 'Enable labs button in APM',
    }),
    description: i18n.translate('xpack.observability.apmLabsButtonDescription', {
      defaultMessage:
        'This flag determines if the viewer has access to the Labs button, a quick way to enable as disable technical preview features in APM',
    }),
    schema: schema.boolean(),
    value: false,
    requiresPageReload: true,
    type: 'boolean',
  },
  ...apmExperimentalFeaturesSettings,
};
