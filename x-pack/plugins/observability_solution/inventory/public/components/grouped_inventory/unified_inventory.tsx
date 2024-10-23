/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { EuiDataGridSorting } from '@elastic/eui';
import React from 'react';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import {
  type EntityColumnIds,
  type EntityType,
  entityPaginationRt,
} from '../../../common/entities';
import { EntitiesGrid } from '../entities_grid';
import { useInventoryAbortableAsync } from '../../hooks/use_inventory_abortable_async';
import { useInventoryParams } from '../../hooks/use_inventory_params';
import { useInventoryRouter } from '../../hooks/use_inventory_router';
import { useKibana } from '../../hooks/use_kibana';
import { useInventorySearchBarContext } from '../../context/inventory_search_bar_context_provider';
import { InventorySummary } from './inventory_summary';
import { extractPaginationParameter } from '../../utils/extract_pagination_parameter';

export function UnifiedInventory() {
  const {
    services: { inventoryAPIClient },
  } = useKibana();
  const { refreshSubject$ } = useInventorySearchBarContext();
  const { query } = useInventoryParams('/');
  const { sortDirection, sortField, kuery, entityTypes, pagination: paginationQuery } = query;
  const inventoryRoute = useInventoryRouter();
  const pagination = extractPaginationParameter(paginationQuery);
  const pageIndex = pagination?.unified ?? 0;

  const {
    value = { entities: [] },
    loading,
    refresh,
  } = useInventoryAbortableAsync(
    ({ signal }) => {
      return inventoryAPIClient.fetch('GET /internal/inventory/entities', {
        params: {
          query: {
            sortDirection,
            sortField,
            entityTypes: entityTypes?.length ? JSON.stringify(entityTypes) : undefined,
            kuery,
          },
        },
        signal,
      });
    },
    [entityTypes, inventoryAPIClient, kuery, sortDirection, sortField]
  );

  useEffectOnce(() => {
    const refreshSubscription = refreshSubject$.subscribe(() => refresh());

    return () => refreshSubscription.unsubscribe();
  });

  function handlePageChange(nextPage: number) {
    inventoryRoute.push('/', {
      path: {},
      query: {
        ...query,
        pagination: entityPaginationRt.encode({
          ...pagination,
          unified: nextPage,
        }),
      },
    });
  }

  function handleSortChange(sorting: EuiDataGridSorting['columns'][0]) {
    inventoryRoute.push('/', {
      path: {},
      query: {
        ...query,
        sortField: sorting.id as EntityColumnIds,
        sortDirection: sorting.direction,
      },
    });
  }

  function handleTypeFilter(type: EntityType) {
    inventoryRoute.push('/', {
      path: {},
      query: {
        ...query,
        // Override the current entity types
        entityTypes: [type],
      },
    });
  }

  return (
    <>
      <InventorySummary />
      <EntitiesGrid
        entities={value.entities}
        loading={loading}
        sortDirection={sortDirection}
        sortField={sortField}
        onChangePage={handlePageChange}
        onChangeSort={handleSortChange}
        pageIndex={pageIndex}
        onFilterByType={handleTypeFilter}
      />
    </>
  );
}
