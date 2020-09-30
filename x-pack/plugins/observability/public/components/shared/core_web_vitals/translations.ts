/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';

export const LCP_LABEL = i18n.translate('xpack.apm.rum.coreVitals.lcp', {
  defaultMessage: 'Largest contentful paint',
});

export const FID_LABEL = i18n.translate('xpack.apm.rum.coreVitals.fip', {
  defaultMessage: 'First input delay',
});

export const CLS_LABEL = i18n.translate('xpack.apm.rum.coreVitals.cls', {
  defaultMessage: 'Cumulative layout shift',
});

export const CV_POOR_LABEL = i18n.translate('xpack.apm.rum.coreVitals.poor', {
  defaultMessage: 'a poor',
});

export const CV_GOOD_LABEL = i18n.translate('xpack.apm.rum.coreVitals.good', {
  defaultMessage: 'a good',
});

export const CV_AVERAGE_LABEL = i18n.translate('xpack.apm.rum.coreVitals.average', {
  defaultMessage: 'an average',
});

export const LEGEND_POOR_LABEL = i18n.translate('xpack.apm.rum.coreVitals.legends.poor', {
  defaultMessage: 'Poor',
});

export const LEGEND_GOOD_LABEL = i18n.translate('xpack.apm.rum.coreVitals.legends.good', {
  defaultMessage: 'Good',
});

export const LEGEND_NEEDS_IMPROVEMENT_LABEL = i18n.translate(
  'xpack.apm.rum.coreVitals.legends.needsImprovement',
  {
    defaultMessage: 'Needs improvement',
  }
);

export const MORE_LABEL = i18n.translate('xpack.apm.rum.coreVitals.more', {
  defaultMessage: 'more',
});

export const LESS_LABEL = i18n.translate('xpack.apm.rum.coreVitals.less', {
  defaultMessage: 'less',
});
