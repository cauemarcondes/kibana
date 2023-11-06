/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import { useProfilingDependencies } from '../../components/contexts/profiling_dependencies/use_profiling_dependencies';
import { FlameGraph } from '../../components/flamegraph';
import { ProfilingSearchBar } from '../../components/profiling_app_page_template/profiling_search_bar';
import { AsyncStatus, useAsync } from '../../hooks/use_async';
import { AsyncEmbeddableComponent } from '../async_embeddable_component';

interface Props {
  timeFrom: string;
  timeTo: string;
  kuery: string;
  isLoading: boolean;
}

function mergeKueries(kuery: string, kueryState: string) {
  const localKuery = kuery;
  const localkueryState = isEmpty(kueryState);
}

export function FlamegraphEmbeddable({ kuery, timeFrom, timeTo, isLoading }: Props) {
  const {
    services: { fetchElasticFlamechart },
  } = useProfilingDependencies();
  const [kueryState, setKueryState] = useState<string>('');
  console.log('### caue  FlamegraphEmbeddable  kueryState:', kueryState);

  const state = useAsync(
    ({ http }) => {
      if (!isLoading) {
        return fetchElasticFlamechart({
          http,
          timeFrom: new Date(timeFrom).getTime(),
          timeTo: new Date(timeTo).getTime(),
          // kuery: isEmpty(kuery) ? kueryState : `${kuery} AND ${kueryState}`,
          kuery,
        });
      }
    },
    [fetchElasticFlamechart, isLoading, kuery, timeFrom, timeTo]
  );

  return (
    <AsyncEmbeddableComponent isLoading={isLoading || state.status === AsyncStatus.Loading}>
      <EuiFlexGroup direction="column">
        <EuiFlexItem grow={false}>
          <ProfilingSearchBar
            showDatePicker={false}
            showSubmitButton={false}
            kuery=""
            rangeFrom={timeFrom}
            rangeTo={timeTo}
            onQuerySubmit={(next) => {
              setKueryState((next.query?.query as string) || '');
            }}
            onRefresh={() => {}}
            onRefreshClick={() => {}}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <FlameGraph primaryFlamegraph={state.data} id="embddable_profiling" isEmbedded />
        </EuiFlexItem>
      </EuiFlexGroup>
    </AsyncEmbeddableComponent>
  );
}
