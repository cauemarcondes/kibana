/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  GetDeprecationsContext,
  DeprecationsDetails,
} from 'src/core/server';
import { i18n } from '@kbn/i18n';

/**
 * Deprecated deployment mode standalone
 **/
export async function getDeprecations({
  savedObjectsClient,
}: GetDeprecationsContext): Promise<DeprecationsDetails[]> {
  const deprecations: DeprecationsDetails[] = [];

  // TODO: add logic to check apm-server state (standalone vs. migrated)
  const deprecated = true
  // TODO: check if running on cloud
  const onCloud = true
  // TODO: build cluster specific url
  const apmurl = 'http://localhost:5601/app/apm/settings/schema'

  if (deprecated && onCloud) {
    deprecations.push({
      title: i18n.translate('apm.deprecations.legacyModeTitle', {
        defaultMessage: 'APM Server running in legacy mode',
      }),
      message: 'The APM Server is running in legacy mode. This is deprecated since 7.16. Switch to APM Server managed by an Elastic Agent instead.',
      documentationUrl:
        'https://www.elastic.co/guide/en/apm/server/current/apm-integration.html',
      level: 'warning',
      correctiveActions: {
        manualSteps: [
          'Navigate to Observability/APM/Settings/Schema and click "Switch to data streams". You will be guided through the process.',
          `${apmurl}`,
        ],
      },
    });
  }

  return deprecations;
}
