/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Location } from 'history';
import React from 'react';
import { Transaction } from '../../../../../../typings/es_schemas/ui/Transaction';
import { IUrlParams } from '../../../../../context/UrlParamsContext/types';
import { getAgentMarks } from './get_agent_marks';
import { ServiceLegends } from './ServiceLegends';
import { Waterfall } from './Waterfall';
import { IWaterfall } from './Waterfall/waterfall_helpers/waterfall_helpers';

interface Props {
  urlParams: IUrlParams;
  transaction: Transaction;
  location: Location;
  waterfall: IWaterfall;
  exceedsMax: boolean;
}

export function WaterfallContainer({
  location,
  urlParams,
  transaction,
  waterfall,
  exceedsMax
}: Props) {
  const agentMarks = getAgentMarks(transaction);
  if (!waterfall) {
    return null;
  }

  return (
    <div>
      <ServiceLegends serviceColors={waterfall.serviceColors} />
      <Waterfall
        waterfallItemId={urlParams.waterfallItemId}
        agentMarks={agentMarks}
        location={location}
        waterfall={waterfall}
        exceedsMax={exceedsMax}
      />
    </div>
  );
}
