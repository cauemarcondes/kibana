/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import type {
  Query,
  RefreshInterval,
  TimeRange,
} from '../../../../../../../src/plugins/data/common/query';
import { Filter } from '../../../../../../../src/plugins/data/public';
import {
  Embeddable,
  EmbeddableInput,
  IContainer,
} from '../../../../../../../src/plugins/embeddable/public';
import { ThroughputEmbeddableComponent } from './throughput_embeddable_component';

export const THROUGHPUT_EMBEDDABLE = 'THROUGHPUT_EMBEDDABLE';
export interface ThroughputInput extends EmbeddableInput {
  serviceName: string;
  // Embeddable inputs which are not included in the default interface
  filters: Filter[];
  query: Query;
  refreshConfig: RefreshInterval;
  timeRange: TimeRange;
}

export class ThroughputEmbeddable extends Embeddable<ThroughputInput, {}> {
  public readonly type = THROUGHPUT_EMBEDDABLE;
  private node?: HTMLElement;

  constructor(initialInput: ThroughputInput, parent?: IContainer) {
    super(initialInput, {}, parent);
  }

  public render(node: HTMLElement) {
    this.node = node;
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
    }
    ReactDOM.render(<ThroughputEmbeddableComponent embeddable={this} />, node);
  }

  public reload() {}
}
