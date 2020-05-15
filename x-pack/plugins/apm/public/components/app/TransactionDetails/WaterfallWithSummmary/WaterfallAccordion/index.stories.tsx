/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { WaterfallAccordion } from '.';

storiesOf('app/TransactionDetails/WaterfallAccordion', module).add(
  'simple',
  () => {
    return <WaterfallAccordion />;
  },
  { info: { source: false } }
);
