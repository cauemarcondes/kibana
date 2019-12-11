/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { shallow } from 'enzyme';
import React from 'react';
import { TransactionSummary } from './TransactionSummary';
import { Transaction } from '../../../../typings/es_schemas/ui/Transaction';
import * as exampleTransactions from './__fixtures__/transactions';

describe('TransactionSummary', () => {
  describe('render', () => {
    const transaction: Transaction = exampleTransactions.httpOk;

    const props = {
      errorCount: 0,
      parentDuration: 0,
      transaction
    };

    it('renders', () => {
      expect(() =>
        shallow(<TransactionSummary {...props} />)
      ).not.toThrowError();
    });
  });
});
