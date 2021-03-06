/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import _, { partition } from 'lodash';
import { i18n } from '@kbn/i18n';
import { generateId } from '../id_generator';
import { DatasourceSuggestion, TableChangeType } from '../types';
import {
  columnToOperation,
  IndexPatternField,
  IndexPatternLayer,
  IndexPatternPrivateState,
  IndexPattern,
} from './indexpattern';
import {
  buildColumn,
  getOperationTypesForField,
  operationDefinitionMap,
  IndexPatternColumn,
} from './operations';
import { hasField } from './utils';
import { operationDefinitions } from './operations/definitions';

function buildSuggestion({
  state,
  updatedLayer,
  layerId,
  label,
  changeType,
}: {
  state: IndexPatternPrivateState;
  layerId: string;
  changeType: TableChangeType;
  updatedLayer?: IndexPatternLayer;
  label?: string;
}): DatasourceSuggestion<IndexPatternPrivateState> {
  const updatedState = updatedLayer
    ? {
        ...state,
        layers: {
          ...state.layers,
          [layerId]: updatedLayer,
        },
      }
    : state;

  // It's fairly easy to accidentally introduce a mismatch between
  // columnOrder and columns, so this is a safeguard to ensure the
  // two match up.
  const layers = _.mapValues(updatedState.layers, layer => ({
    ...layer,
    columns: _.pick<Record<string, IndexPatternColumn>, Record<string, IndexPatternColumn>>(
      layer.columns,
      layer.columnOrder
    ),
  }));

  const columnOrder = layers[layerId].columnOrder;
  const columnMap = layers[layerId].columns;
  const isMultiRow = Object.values(columnMap).some(column => column.isBucketed);

  return {
    state: {
      ...updatedState,
      layers,
    },

    table: {
      columns: columnOrder.map(columnId => ({
        columnId,
        operation: columnToOperation(columnMap[columnId]),
      })),
      isMultiRow,
      layerId,
      changeType,
      label,
    },
  };
}

export function getDatasourceSuggestionsForField(
  state: IndexPatternPrivateState,
  indexPatternId: string,
  field: IndexPatternField
): Array<DatasourceSuggestion<IndexPatternPrivateState>> {
  const layers = Object.keys(state.layers);
  const layerIds = layers.filter(id => state.layers[id].indexPatternId === indexPatternId);

  if (layerIds.length === 0) {
    // The field we're suggesting on does not match any existing layer. This will always add
    // a new layer if possible, but that might not be desirable if the layers are too complicated
    // already
    return getEmptyLayerSuggestionsForField(state, generateId(), indexPatternId, field);
  } else {
    // The field we're suggesting on matches an existing layer. In this case we find the layer with
    // the fewest configured columns and try to add the field to this table. If this layer does not
    // contain any layers yet, behave as if there is no layer.
    const mostEmptyLayerId = _.min(layerIds, layerId => state.layers[layerId].columnOrder.length);
    if (state.layers[mostEmptyLayerId].columnOrder.length === 0) {
      return getEmptyLayerSuggestionsForField(state, mostEmptyLayerId, indexPatternId, field);
    } else {
      return getExistingLayerSuggestionsForField(state, mostEmptyLayerId, field);
    }
  }
}

function getBucketOperation(field: IndexPatternField) {
  return getOperationTypesForField(field).find(op => op === 'date_histogram' || op === 'terms');
}

function getExistingLayerSuggestionsForField(
  state: IndexPatternPrivateState,
  layerId: string,
  field: IndexPatternField
) {
  const layer = state.layers[layerId];
  const indexPattern = state.indexPatterns[layer.indexPatternId];
  const operations = getOperationTypesForField(field);
  const usableAsBucketOperation = getBucketOperation(field);
  const fieldInUse = Object.values(layer.columns).some(
    column => hasField(column) && column.sourceField === field.name
  );
  let updatedLayer: IndexPatternLayer | undefined;
  if (usableAsBucketOperation && !fieldInUse) {
    updatedLayer = addFieldAsBucketOperation(layer, layerId, indexPattern, field);
  } else if (!usableAsBucketOperation && operations.length > 0) {
    updatedLayer = addFieldAsMetricOperation(layer, layerId, indexPattern, field);
  }

  return updatedLayer
    ? [
        buildSuggestion({
          state,
          updatedLayer,
          layerId,
          changeType: 'extended',
        }),
      ]
    : [];
}

function addFieldAsMetricOperation(
  layer: IndexPatternLayer,
  layerId: string,
  indexPattern: IndexPattern,
  field: IndexPatternField
) {
  const operations = getOperationTypesForField(field);
  const operationsAlreadyAppliedToThisField = Object.values(layer.columns)
    .filter(column => hasField(column) && column.sourceField === field.name)
    .map(column => column.operationType);
  const operationCandidate = operations.find(
    operation => !operationsAlreadyAppliedToThisField.includes(operation)
  );

  if (!operationCandidate) {
    return undefined;
  }

  const newColumn = buildColumn({
    op: operationCandidate,
    columns: layer.columns,
    layerId,
    indexPattern,
    suggestedPriority: undefined,
    field,
  });
  const newColumnId = generateId();
  const updatedColumns = {
    ...layer.columns,
    [newColumnId]: newColumn,
  };
  const updatedColumnOrder = [...layer.columnOrder, newColumnId];

  return {
    indexPatternId: indexPattern.id,
    columns: updatedColumns,
    columnOrder: updatedColumnOrder,
  };
}

function addFieldAsBucketOperation(
  layer: IndexPatternLayer,
  layerId: string,
  indexPattern: IndexPattern,
  field: IndexPatternField
) {
  const applicableBucketOperation = getBucketOperation(field);
  const newColumn = buildColumn({
    op: applicableBucketOperation,
    columns: layer.columns,
    layerId,
    indexPattern,
    suggestedPriority: undefined,
    field,
  });
  const [buckets, metrics] = separateBucketColumns(layer);
  const newColumnId = generateId();
  const updatedColumns = {
    ...layer.columns,
    [newColumnId]: newColumn,
  };
  let updatedColumnOrder: string[] = [];
  if (applicableBucketOperation === 'terms') {
    updatedColumnOrder = [newColumnId, ...buckets, ...metrics];
  } else {
    const oldDateHistogramColumn = layer.columnOrder.find(
      columnId => layer.columns[columnId].operationType === 'date_histogram'
    );
    if (oldDateHistogramColumn) {
      delete updatedColumns[oldDateHistogramColumn];
      updatedColumnOrder = layer.columnOrder.map(columnId =>
        columnId !== oldDateHistogramColumn ? columnId : newColumnId
      );
    } else {
      updatedColumnOrder = [...buckets, newColumnId, ...metrics];
    }
  }
  return {
    indexPatternId: indexPattern.id,
    columns: updatedColumns,
    columnOrder: updatedColumnOrder,
  };
}

function getEmptyLayerSuggestionsForField(
  state: IndexPatternPrivateState,
  layerId: string,
  indexPatternId: string,
  field: IndexPatternField
) {
  const indexPattern = state.indexPatterns[indexPatternId];
  let newLayer: IndexPatternLayer | undefined;
  if (getBucketOperation(field)) {
    newLayer = createNewLayerWithBucketAggregation(layerId, indexPattern, field);
  } else if (indexPattern.timeFieldName && getOperationTypesForField(field).length > 0) {
    newLayer = createNewLayerWithMetricAggregation(layerId, indexPattern, field);
  }

  const newLayerSuggestions = newLayer
    ? [
        buildSuggestion({
          state,
          updatedLayer: newLayer,
          layerId,
          changeType: 'initial',
        }),
      ]
    : [];

  const metricLayer = createMetricSuggestion(indexPattern, layerId, state, field);

  return metricLayer ? newLayerSuggestions.concat(metricLayer) : newLayerSuggestions;
}

function createNewLayerWithBucketAggregation(
  layerId: string,
  indexPattern: IndexPattern,
  field: IndexPatternField
) {
  const countColumn = buildColumn({
    op: 'count',
    columns: {},
    indexPattern,
    layerId,
    suggestedPriority: undefined,
  });

  const col1 = generateId();
  const col2 = generateId();

  // let column know about count column
  const column = buildColumn({
    layerId,
    op: getBucketOperation(field),
    indexPattern,
    columns: {
      [col2]: countColumn,
    },
    field,
    suggestedPriority: undefined,
  });

  return {
    indexPatternId: indexPattern.id,
    columns: {
      [col1]: column,
      [col2]: countColumn,
    },
    columnOrder: [col1, col2],
  };
}

function createNewLayerWithMetricAggregation(
  layerId: string,
  indexPattern: IndexPattern,
  field: IndexPatternField
) {
  const dateField = indexPattern.fields.find(f => f.name === indexPattern.timeFieldName)!;

  const operations = getOperationTypesForField(field);
  const column = buildColumn({
    op: operations[0],
    columns: {},
    suggestedPriority: undefined,
    field,
    indexPattern,
    layerId,
  });

  const dateColumn = buildColumn({
    op: 'date_histogram',
    columns: {},
    suggestedPriority: undefined,
    field: dateField,
    indexPattern,
    layerId,
  });

  const col1 = generateId();
  const col2 = generateId();

  return {
    indexPatternId: indexPattern.id,
    columns: {
      [col1]: dateColumn,
      [col2]: column,
    },
    columnOrder: [col1, col2],
  };
}

export function getDatasourceSuggestionsFromCurrentState(
  state: IndexPatternPrivateState
): Array<DatasourceSuggestion<IndexPatternPrivateState>> {
  return _.flatten(
    Object.entries(state.layers || {})
      .filter(([_id, layer]) => layer.columnOrder.length)
      .map(([layerId, layer], index) => {
        const indexPattern = state.indexPatterns[layer.indexPatternId];
        const [buckets, metrics] = separateBucketColumns(layer);
        const timeDimension = layer.columnOrder.find(
          columnId =>
            layer.columns[columnId].isBucketed && layer.columns[columnId].dataType === 'date'
        );

        const suggestions: Array<DatasourceSuggestion<IndexPatternPrivateState>> = [];
        if (metrics.length === 0) {
          // intermediary chart without metric, don't try to suggest reduced versions
          suggestions.push(
            buildSuggestion({
              state,
              layerId,
              changeType: 'unchanged',
            })
          );
        } else if (buckets.length === 0) {
          if (indexPattern.timeFieldName) {
            // suggest current metric over time if there is a default time field
            suggestions.push(createSuggestionWithDefaultDateHistogram(state, layerId));
          }
          suggestions.push(...createAlternativeMetricSuggestions(indexPattern, layerId, state));
          // also suggest simple current state
          suggestions.push(
            buildSuggestion({
              state,
              layerId,
              changeType: 'unchanged',
            })
          );
        } else {
          suggestions.push(...createSimplifiedTableSuggestions(state, layerId));

          if (!timeDimension && indexPattern.timeFieldName) {
            // suggest current configuration over time if there is a default time field
            // and no time dimension yet
            suggestions.push(createSuggestionWithDefaultDateHistogram(state, layerId));
          }

          if (buckets.length === 2) {
            suggestions.push(createChangedNestingSuggestion(state, layerId));
          }
        }

        return suggestions;
      })
  );
}

function createChangedNestingSuggestion(state: IndexPatternPrivateState, layerId: string) {
  const layer = state.layers[layerId];
  const [firstBucket, secondBucket, ...rest] = layer.columnOrder;
  const updatedLayer = { ...layer, columnOrder: [secondBucket, firstBucket, ...rest] };
  return buildSuggestion({
    state,
    layerId,
    updatedLayer,
    label: getNestedTitle([layer.columns[secondBucket], layer.columns[firstBucket]]),
    changeType: 'extended',
  });
}

function createMetricSuggestion(
  indexPattern: IndexPattern,
  layerId: string,
  state: IndexPatternPrivateState,
  field: IndexPatternField
) {
  const layer = state.layers[layerId];
  const operationDefinitionsMap = _.indexBy(operationDefinitions, 'type');
  const [column] = getOperationTypesForField(field)
    .map(type =>
      operationDefinitionsMap[type].buildColumn({
        field,
        indexPattern,
        layerId,
        columns: {},
        suggestedPriority: 0,
      })
    )
    .filter(op => op.dataType === 'number' && !op.isBucketed);

  if (!column) {
    return;
  }

  const newId = generateId();
  return buildSuggestion({
    layerId,
    state,
    changeType: 'initial',
    updatedLayer: {
      ...layer,
      columns: { [newId]: column },
      columnOrder: [newId],
    },
  });
}

function getNestedTitle([outerBucket, innerBucket]: IndexPatternColumn[]) {
  return i18n.translate('xpack.lens.indexpattern.suggestions.nestingChangeLabel', {
    defaultMessage: '{innerOperation} per each {outerOperation}',
    values: {
      innerOperation: innerBucket.label,
      outerOperation: hasField(outerBucket) ? outerBucket.sourceField : outerBucket.label,
    },
  });
}

function createAlternativeMetricSuggestions(
  indexPattern: IndexPattern,
  layerId: string,
  state: IndexPatternPrivateState
) {
  const layer = state.layers[layerId];
  const suggestions: Array<DatasourceSuggestion<IndexPatternPrivateState>> = [];
  layer.columnOrder.forEach(columnId => {
    const column = layer.columns[columnId];
    if (!hasField(column)) {
      return;
    }
    const field = indexPattern.fields.find(({ name }) => column.sourceField === name)!;
    const alternativeMetricOperations = getOperationTypesForField(field).filter(
      operationType => operationType !== column.operationType
    );
    if (alternativeMetricOperations.length === 0) {
      return;
    }
    const newId = generateId();
    const newColumn = buildColumn({
      op: alternativeMetricOperations[0],
      columns: layer.columns,
      indexPattern,
      layerId,
      field,
      suggestedPriority: undefined,
    });
    const updatedLayer = {
      ...layer,
      columns: { [newId]: newColumn },
      columnOrder: [newId],
    };
    suggestions.push(
      buildSuggestion({
        state,
        layerId,
        updatedLayer,
        changeType: 'initial',
      })
    );
  });
  return suggestions;
}

function createSuggestionWithDefaultDateHistogram(
  state: IndexPatternPrivateState,
  layerId: string
) {
  const layer = state.layers[layerId];
  const indexPattern = state.indexPatterns[layer.indexPatternId];
  const newId = generateId();
  const [buckets, metrics] = separateBucketColumns(layer);
  const timeColumn = buildColumn({
    layerId,
    op: 'date_histogram',
    indexPattern,
    columns: layer.columns,
    field: indexPattern.fields.find(({ name }) => name === indexPattern.timeFieldName),
    suggestedPriority: undefined,
  });
  const updatedLayer = {
    ...layer,
    columns: { ...layer.columns, [newId]: timeColumn },
    columnOrder: [...buckets, newId, ...metrics],
  };
  return buildSuggestion({
    state,
    layerId,
    updatedLayer,
    label: i18n.translate('xpack.lens.indexpattern.suggestions.overTimeLabel', {
      defaultMessage: 'Over time',
    }),
    changeType: 'extended',
  });
}

function createSimplifiedTableSuggestions(state: IndexPatternPrivateState, layerId: string) {
  const layer = state.layers[layerId];

  const [availableBucketedColumns, availableMetricColumns] = separateBucketColumns(layer);

  return _.flatten(
    availableBucketedColumns.map((_col, index) => {
      // build suggestions with fewer buckets
      const bucketedColumns = availableBucketedColumns.slice(0, index + 1);
      const allMetricsSuggestion = {
        ...layer,
        columnOrder: [...bucketedColumns, ...availableMetricColumns],
      };

      if (availableMetricColumns.length > 1) {
        return [
          allMetricsSuggestion,
          { ...layer, columnOrder: [...bucketedColumns, availableMetricColumns[0]] },
        ];
      } else {
        return allMetricsSuggestion;
      }
    })
  )
    .concat(
      availableMetricColumns.map(columnId => {
        // build suggestions with only metrics
        return { ...layer, columnOrder: [columnId] };
      })
    )
    .map(updatedLayer => {
      return buildSuggestion({
        state,
        layerId,
        updatedLayer,
        changeType:
          layer.columnOrder.length === updatedLayer.columnOrder.length ? 'unchanged' : 'reduced',
        label:
          updatedLayer.columnOrder.length === 1
            ? getMetricSuggestionTitle(updatedLayer, availableMetricColumns.length === 1)
            : undefined,
      });
    });
}

function getMetricSuggestionTitle(layer: IndexPatternLayer, onlyMetric: boolean) {
  const { operationType, label } = layer.columns[layer.columnOrder[0]];
  return i18n.translate('xpack.lens.indexpattern.suggestions.overallLabel', {
    defaultMessage: '{operation} overall',
    values: {
      operation: onlyMetric ? operationDefinitionMap[operationType].displayName : label,
    },
    description:
      'Title of a suggested chart containing only a single numerical metric calculated over all available data',
  });
}

function separateBucketColumns(layer: IndexPatternLayer) {
  return partition(layer.columnOrder, columnId => layer.columns[columnId].isBucketed);
}
