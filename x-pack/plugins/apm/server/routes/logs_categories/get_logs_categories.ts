/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { kqlQuery, rangeQuery } from '../../../../observability/server';
import { Setup } from '../../lib/helpers/setup_request';

export async function getLogsCategories({
  setup,
  start,
  end,
  offset,
  kuery,
}: {
  setup: Setup;
  start: number;
  end: number;
  kuery: string;
  offset?: string;
}) {
  const { internalClient } = setup;
  const params = {
    index: 'test-logs-*',
    size: 0,
    body: {
      query: {
        bool: {
          filter: [...rangeQuery(start, end), ...kqlQuery(kuery)],
        },
      },
      aggs: {
        categories: { terms: { field: 'template.keyword' } },
      },
    },
  };
  const resp = await internalClient.search('logs_categories', params);
  return {
    logsCategories:
      resp.aggregations?.categories.buckets.map((bucket) => {
        return {
          category: bucket.key,
          count: bucket.doc_count,
        };
      }) || [],
  };
}
