/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as t from 'io-ts';
import { keyBy } from 'lodash';
import { setupRequest } from '../../lib/helpers/setup_request';
import { createApmServerRoute } from '../create_apm_server_route';
import { createApmServerRouteRepository } from '../create_apm_server_route_repository';
import { kueryRt, offsetRt, rangeRt } from '../default_api_types';
import {
  getLogsCategories,
  getLogsCategoriesDetails,
} from './get_logs_categories';

export const versionRt = t.partial({
  currentVersion: t.string,
  previousVersion: t.string,
});

const logsCategoriesRoute = createApmServerRoute({
  endpoint: 'GET /internal/apm/logs_categories',
  params: t.type({
    query: t.intersection([rangeRt, offsetRt, kueryRt, versionRt]),
  }),
  options: { tags: ['access:apm'] },
  handler: async (resources) => {
    const setup = await setupRequest(resources);
    const { params } = resources;
    const { start, end, offset, kuery, currentVersion, previousVersion } =
      params.query;

    const commonProps = {
      setup,
      start,
      end,
      kuery,
    };

    const [currentPeriod, previousPeriod] = await Promise.all([
      getLogsCategories({ ...commonProps, version: currentVersion }),
      offset || previousVersion
        ? getLogsCategories({
            ...commonProps,
            offset,
            version: previousVersion,
          })
        : undefined,
    ]);

    const previousPeriodMap = keyBy(previousPeriod, 'category');

    const logsCategories = currentPeriod.map(({ category, ...rest }) => {
      const previous = previousPeriodMap[category];
      return {
        category,
        currentPeriod: rest,
        previousPeriod: {
          count: previous?.count,
          timeseries: previous?.timeseries,
        },
      };
    });

    return { logsCategories };
  },
});

const logsCategoriesDetailsRoute = createApmServerRoute({
  endpoint: 'GET /internal/apm/logs_categories/{categoryName}',
  params: t.type({
    path: t.type({ categoryName: t.string }),
    query: t.intersection([rangeRt, kueryRt]),
  }),
  options: { tags: ['access:apm'] },
  handler: async (resources) => {
    const setup = await setupRequest(resources);
    const { params } = resources;
    const { categoryName } = params.path;
    const { start, end, kuery } = params.query;

    return getLogsCategoriesDetails({ setup, start, end, categoryName, kuery });
  },
});

export const logsCategoriesRepository = createApmServerRouteRepository()
  .add(logsCategoriesRoute)
  .add(logsCategoriesDetailsRoute);
