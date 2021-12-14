/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as t from 'io-ts';
import { setupRequest } from '../../lib/helpers/setup_request';
import { createApmServerRoute } from '../create_apm_server_route';
import { createApmServerRouteRepository } from '../create_apm_server_route_repository';
import { offsetRt, rangeRt } from '../default_api_types';
import { getLogsCategories } from './get_logs_categories';

const logsCategoriesRoute = createApmServerRoute({
  endpoint: 'GET /internal/apm/logs_categories',
  params: t.type({
    query: t.intersection([rangeRt, offsetRt]),
  }),
  options: { tags: ['access:apm'] },
  handler: async (resources) => {
    const setup = await setupRequest(resources);
    const { params } = resources;
    const { start, end, offset } = params.query;

    return getLogsCategories({ setup, start, end, offset });
  },
});

export const logsCategoriesRepository =
  createApmServerRouteRepository().add(logsCategoriesRoute);
