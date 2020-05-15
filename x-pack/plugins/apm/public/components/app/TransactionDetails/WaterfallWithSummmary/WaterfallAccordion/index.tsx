/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { EuiAccordion } from '@elastic/eui';
import { isEmpty } from 'lodash';
import React from 'react';
import { StickyContainer } from 'react-sticky';
import styled from 'styled-components';
import { TraceAPIResponse } from '../../../../../../server/lib/traces/get_trace';
import { px } from '../../../../../style/variables';
import { Timeline } from '../../../../shared/charts/Timeline';
import { WaterfallItem } from '../WaterfallContainer/Waterfall/WaterfallItem';
import {
  getWaterfall,
  IWaterfallItem
} from '../WaterfallContainer/Waterfall/waterfall_helpers/waterfall_helpers';
import { data2 } from './index.stories.data';

const getChildrenGroupedByParentId = (waterfallItems: IWaterfallItem[]) =>
  _.groupBy(waterfallItems, (item: any) => {
    return item.parentId ? item.parentId : 'root';
    // if (item.parent && item.parent.id) {
    //   return item.parent.id;
    // }
    // return 'root';
  });

const TIMELINE_MARGINS = {
  top: 40,
  left: 50,
  right: 50,
  bottom: 0
};

const createNewAccordion = (childrenByParentId: any, waterfall: IWaterfall) => {
  function create(item: IWaterfallItem, isOpen: boolean = false) {
    const id = item.id;
    const name = item.doc.transaction?.name || item.doc.span?.name;
    if (isEmpty(childrenByParentId[id])) {
      return (
        <WaterfallItem
          key={item.id}
          timelineMargins={TIMELINE_MARGINS}
          color={waterfall.serviceColors[item.doc.service.name]}
          item={item}
          totalDuration={waterfall.duration}
          // isSelected={item.id === waterfallItemId}
          // errorCount={errorCount}
          // onClick={() => toggleFlyout({ item, location })}
        />
      );
    }

    return (
      <EuiAccordion
        id={name}
        buttonContent={
          <div>
            {childrenByParentId[id].length}
            <WaterfallItem
              key={item.id}
              timelineMargins={TIMELINE_MARGINS}
              color={waterfall.serviceColors[item.doc.service.name]}
              item={item}
              totalDuration={waterfall.duration}
              // isSelected={item.id === waterfallItemId}
              // errorCount={errorCount}
              // onClick={() => toggleFlyout({ item, location })}
            />
          </div>
        }
        paddingSize="l"
        initialIsOpen={isOpen}
      >
        {childrenByParentId[id].map(create)}
      </EuiAccordion>
    );
  }
  return childrenByParentId.root.map((rootItem: IWaterfallItem) =>
    create(rootItem, true)
  );
};

const WaterfallItemsContainer = styled.div<{
  paddingTop: number;
}>`
  padding-top: ${props => px(props.paddingTop)};
`;

export const WaterfallAccordion = () => {
  const waterfall = getWaterfall(data2 as TraceAPIResponse, '1e4cb9e772ff5545');
  const childrenByParentId = getChildrenGroupedByParentId(waterfall.items);
  const Accordions = createNewAccordion(childrenByParentId, waterfall);

  const itemContainerHeight = 58; // TODO: This is a nasty way to calculate the height of the svg element. A better approach should be found
  const waterfallHeight = itemContainerHeight * waterfall.items.length;

  return (
    <div>
      <StickyContainer>
        <Timeline
          marks={[]}
          xMax={waterfall.duration}
          height={waterfallHeight}
          margins={TIMELINE_MARGINS}
        />
        <WaterfallItemsContainer paddingTop={TIMELINE_MARGINS.top}>
          {Accordions}
        </WaterfallItemsContainer>
      </StickyContainer>
    </div>
  );
  // return <div>test</div>;
};
