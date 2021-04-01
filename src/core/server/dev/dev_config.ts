/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { schema } from '@kbn/config-schema';

export const config = {
  path: 'dev',
  // dev configuration is validated by the dev cli.
  // we only need to register the `dev` schema to avoid failing core's config validation
  schema: schema.object({}, { unknowns: 'ignore' }),
};
