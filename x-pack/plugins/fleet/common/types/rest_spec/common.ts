/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { HttpFetchQuery } from '@kbn/core/public';

export interface ListWithKuery extends HttpFetchQuery {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: 'desc' | 'asc';
  kuery?: string;
}

export interface ListResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface BulkGetResult<T> {
  items: T[];
}
