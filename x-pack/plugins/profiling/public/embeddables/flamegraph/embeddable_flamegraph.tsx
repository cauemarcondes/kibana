/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { Embeddable, EmbeddableOutput, IContainer } from '@kbn/embeddable-plugin/public';
import { EMBEDDABLE_FLAMEGRAPH } from '@kbn/observability-shared-plugin/public';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { FlamegraphEmbeddable } from '.';
import {
  ProfilingEmbeddableProvider,
  ProfilingEmbeddablesDependencies,
} from '../profiling_embeddable_provider';
import { EmbeddableFlamegraphEmbeddableInput } from './embeddable_flamegraph_factory';

export class EmbeddableFlamegraph extends Embeddable<
  EmbeddableFlamegraphEmbeddableInput,
  EmbeddableOutput
> {
  readonly type = EMBEDDABLE_FLAMEGRAPH;
  private _domNode?: HTMLElement;

  constructor(
    private deps: ProfilingEmbeddablesDependencies,
    initialInput: EmbeddableFlamegraphEmbeddableInput,
    parent?: IContainer
  ) {
    super(initialInput, {}, parent);
  }

  render(domNode: HTMLElement) {
    this._domNode = domNode;
    const { timeFrom, timeTo, kuery, isLoading } = this.input;
    const i18nCore = this.deps.coreStart.i18n;

    render(
      <ProfilingEmbeddableProvider deps={this.deps}>
        <i18nCore.Context>
          <FlamegraphEmbeddable
            timeFrom={timeFrom}
            timeTo={timeTo}
            kuery={kuery}
            isLoading={isLoading}
          />
        </i18nCore.Context>
      </ProfilingEmbeddableProvider>,
      domNode
    );
  }

  public destroy() {
    if (this._domNode) {
      unmountComponentAtNode(this._domNode);
    }
  }

  reload() {
    if (this._domNode) {
      this.render(this._domNode);
    }
  }
}
