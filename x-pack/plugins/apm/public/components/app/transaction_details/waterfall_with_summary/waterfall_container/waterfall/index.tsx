/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty, EuiCallOut } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { History } from 'history';
import React, { Profiler, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { euiStyled } from '@kbn/kibana-react-plugin/common';
import { Timeline } from '../../../../../shared/charts/timeline';
import { fromQuery, toQuery } from '../../../../../shared/links/url_helpers';
import { getAgentMarks } from '../marks/get_agent_marks';
import { getErrorMarks } from '../marks/get_error_marks';
import { AccordionWaterfall } from './accordion_waterfall';
import { WaterfallFlyout } from './waterfall_flyout';
import {
  IWaterfall,
  IWaterfallItem,
  IWaterfallSpanOrTransaction,
} from './waterfall_helpers/waterfall_helpers';

const Container = euiStyled.div`
  transition: 0.1s padding ease;
  position: relative;
  overflow: hidden;
`;

const toggleFlyout = ({
  history,
  item,
  flyoutDetailTab,
}: {
  history: History;
  item?: IWaterfallItem;
  flyoutDetailTab?: string;
}) => {
  history.replace({
    ...history.location,
    search: fromQuery({
      ...toQuery(location.search),
      flyoutDetailTab,
      waterfallItemId: item?.id,
    }),
  });
};

const WaterfallItemsContainer = euiStyled.div`
  border-bottom: 1px solid ${({ theme }) => theme.eui.euiColorMediumShade};
`;

interface Props {
  waterfallItemId?: string;
  waterfall: IWaterfall;
  showCriticalPath: boolean;
}

function getWaterfallMaxLevel(waterfall: IWaterfall) {
  const entryId = waterfall.entryWaterfallTransaction?.id;
  if (!entryId) {
    return 0;
  }
  let maxLevel = 1;
  function countLevels(id: string, currentLevel: number) {
    const children = waterfall.childrenByParentId[id] || [];
    if (children.length) {
      children.forEach((child) => {
        countLevels(child.id, currentLevel + 1);
      });
    } else {
      if (maxLevel < currentLevel) {
        maxLevel = currentLevel;
      }
    }
  }

  countLevels(entryId, 1);
  return maxLevel;
}

const MAX_VISIBLE_ITEMS = 2;

const startItem = { id: '1', label: 'a' };

const items: Record<string, Array<typeof startItem>> = {
  '1': [
    { id: '2', label: 'b' },
    { id: '3', label: 'c' },
    { id: '4', label: 'd' },
  ],
  '2': [
    { id: '8', label: 'h' },
    { id: '9', label: 'i' },
    { id: '10', label: 'j' },
    { id: '11', label: 'k' },
    { id: '12', label: 'l' },
    { id: '13', label: 'm' },
  ],
  '3': [
    { id: '6', label: 'f' },
    { id: '7', label: 'g' },
    { id: '14', label: 'n' },
    { id: '15', label: 'o' },
  ],
};

const MAX_ITEMS_PER_PARENT = 2;
const ITEMS_TO_INCREMENT = 1;

export function Waterfall({
  waterfall,
  waterfallItemId,
  showCriticalPath,
}: Props) {
  const history = useHistory();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const itemContainerHeight = 58; // TODO: This is a nasty way to calculate the height of the svg element. A better approach should be found
  const waterfallHeight = itemContainerHeight * waterfall.items.length;
  const [visibleItemsPerParent, setVisibleItemsPerParent] = useState<
    Record<string, number>
  >({});

  const { duration } = waterfall;

  const agentMarks = getAgentMarks(waterfall.entryTransaction);
  const errorMarks = getErrorMarks(waterfall.errorItems);

  const timelineMargins = useMemo(() => {
    // Calculate the left margin relative to the deepest level, or 100px, whichever
    // is more.
    const maxLevel = getWaterfallMaxLevel(waterfall);
    return {
      top: 40,
      left: Math.max(100, maxLevel * 10),
      right: 50,
      bottom: 0,
    };
  }, [waterfall]);

  const accordionWaterfall = useMemo(() => {
    function renderAccordionWaterfall() {
      function renderWaterfallAccordionItem(
        item: IWaterfallSpanOrTransaction,
        level: number
      ) {
        let children = waterfall.childrenByParentId[item.id] || [];

        const maxChildrenToDisplay =
          visibleItemsPerParent[item.id] || MAX_ITEMS_PER_PARENT;

        const isShowMoreVisible = children.length > maxChildrenToDisplay;
        const numberOfChildren = children.length;
        children = children.slice(0, maxChildrenToDisplay);

        const childrenComponent = children.map((child) => {
          return renderWaterfallAccordionItem(child, level + 1);
        });
        return (
          <AccordionWaterfall
            // used to recreate the entire tree when `isAccordionOpen` changes, collapsing or expanding all elements.
            key={`accordion_state_${item.id}_${isAccordionOpen}`}
            isOpen={isAccordionOpen}
            item={item}
            level={level}
            waterfallItemId={waterfallItemId}
            duration={duration}
            waterfall={waterfall}
            timelineMargins={timelineMargins}
            onClickWaterfallItem={(
              item2: IWaterfallItem,
              flyoutDetailTab: string
            ) => toggleFlyout({ history, item: item2, flyoutDetailTab })}
            showCriticalPath={showCriticalPath}
            isShowMoreButtonVisible={isShowMoreVisible}
            onShowMoreClick={() => {
              setVisibleItemsPerParent((state) => ({
                ...state,
                [item.id]: children.length + ITEMS_TO_INCREMENT,
              }));
            }}
            numberOfChildren={numberOfChildren}
          >
            {childrenComponent}
          </AccordionWaterfall>
        );
      }
      if (!waterfall.entryWaterfallTransaction) {
        return null;
      }

      return renderWaterfallAccordionItem(
        waterfall.entryWaterfallTransaction,
        0
      );
    }
    return renderAccordionWaterfall();
  }, [
    duration,
    history,
    isAccordionOpen,
    showCriticalPath,
    timelineMargins,
    visibleItemsPerParent,
    waterfall,
    waterfallItemId,
  ]);

  return (
    <>
      Total items: {waterfall.traceItemCount}
      <Container>
        {waterfall.exceedsMax && (
          <EuiCallOut
            color="warning"
            size="s"
            iconType="alert"
            title={i18n.translate('xpack.apm.waterfall.exceedsMax', {
              defaultMessage:
                'The number of items in this trace is {traceItemCount} which is higher than the current limit of {maxTraceItems}. Please increase the limit to see the full trace',
              values: {
                traceItemCount: waterfall.traceItemCount,
                maxTraceItems: waterfall.maxTraceItems,
              },
            })}
          />
        )}
        <div>
          <div style={{ display: 'flex' }}>
            <EuiButtonEmpty
              style={{ zIndex: 3, position: 'absolute' }}
              iconType={isAccordionOpen ? 'fold' : 'unfold'}
              onClick={() => {
                setIsAccordionOpen((isOpen) => !isOpen);
              }}
            />
            <Timeline
              marks={[...agentMarks, ...errorMarks]}
              xMax={duration}
              height={waterfallHeight}
              margins={timelineMargins}
            />
          </div>
          <WaterfallItemsContainer>
            <Profiler
              id="waterfall"
              onRender={(id, phase, actualDur) => {
                console.log('###', id, phase, actualDur);
              }}
            >
              <div style={{ position: 'relative' }}>{accordionWaterfall}</div>
            </Profiler>
          </WaterfallItemsContainer>
        </div>

        <WaterfallFlyout
          waterfallItemId={waterfallItemId}
          waterfall={waterfall}
          toggleFlyout={toggleFlyout}
        />
      </Container>
    </>
  );
}
