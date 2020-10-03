/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */

import React, { memo, Fragment } from 'react';
import { i18n } from '@kbn/i18n';
import { EuiSpacer, EuiText, EuiButtonEmpty, EuiHorizontalRule } from '@elastic/eui';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { StyledPanel } from '../styles';
import { BoldCode, noTimestampRetrievedText, StyledTime } from './panel_content_utilities';
import { Breadcrumbs } from './breadcrumbs';
import * as eventModel from '../../../../common/endpoint/models/event';
import { SafeResolverEvent } from '../../../../common/endpoint/types';
import * as selectors from '../../store/selectors';
import { ResolverState } from '../../types';
import { PanelLoading } from './panel_loading';
import { DescriptiveName } from './descriptive_name';
import { useLinkProps } from '../use_link_props';
import { useFormattedDate } from './use_formatted_date';

/**
 * Render a list of events that are related to `nodeID` and that have a category of `eventType`.
 */
export const NodeEventsInCategory = memo(function ({
  nodeID,
  eventCategory,
}: {
  nodeID: string;
  eventCategory: string;
}) {
  const processEvent = useSelector((state: ResolverState) =>
    selectors.processEventForID(state)(nodeID)
  );
  const eventCount = useSelector((state: ResolverState) =>
    selectors.totalRelatedEventCountForNode(state)(nodeID)
  );
  const eventsInCategoryCount = useSelector((state: ResolverState) =>
    selectors.relatedEventCountOfTypeForNode(state)(nodeID, eventCategory)
  );
  const events = useSelector((state: ResolverState) => selectors.nodeEventsInCategory(state));

  return (
    <>
      {eventCount === undefined || processEvent === null ? (
        <StyledPanel>
          <PanelLoading />
        </StyledPanel>
      ) : (
        <StyledPanel data-test-subj="resolver:panel:events-in-category">
          <NodeEventsInCategoryBreadcrumbs
            nodeName={eventModel.processNameSafeVersion(processEvent)}
            eventCategory={eventCategory}
            eventCount={eventCount}
            nodeID={nodeID}
            eventsInCategoryCount={eventsInCategoryCount}
          />
          <EuiSpacer size="l" />
          <NodeEventList eventCategory={eventCategory} nodeID={nodeID} events={events} />
        </StyledPanel>
      )}
    </>
  );
});

/**
 * Rendered for each event in the list.
 */
const NodeEventsListItem = memo(function ({
  event,
  nodeID,
  eventCategory,
}: {
  event: SafeResolverEvent;
  nodeID: string;
  eventCategory: string;
}) {
  const timestamp = eventModel.eventTimestamp(event);
  const date = useFormattedDate(timestamp) || noTimestampRetrievedText;
  const linkProps = useLinkProps({
    panelView: 'eventDetail',
    panelParameters: {
      nodeID,
      eventCategory,
      eventID: String(eventModel.eventID(event)),
    },
  });
  return (
    <>
      <EuiText>
        <BoldCode>
          <FormattedMessage
            id="xpack.securitySolution.endpoint.resolver.panel.relatedEventDetail.categoryAndType"
            values={{
              category: eventModel.eventCategory(event).join(', '),
              eventType: eventModel.eventType(event).join(', '),
            }}
            defaultMessage="{category} {eventType}"
          />
        </BoldCode>
        <StyledTime dateTime={date}>
          <FormattedMessage
            id="xpack.securitySolution.endpoint.resolver.panel.relatedEventDetail.atTime"
            values={{ date }}
            defaultMessage="@ {date}"
          />
        </StyledTime>
      </EuiText>
      <EuiSpacer size="xs" />
      <EuiButtonEmpty
        data-test-subj="resolver:panel:node-events-in-category:event-link"
        {...linkProps}
      >
        <DescriptiveName event={event} />
      </EuiButtonEmpty>
    </>
  );
});

/**
 * Renders a list of events with a separator in between.
 */
const NodeEventList = memo(function NodeEventList({
  eventCategory,
  events,
  nodeID,
}: {
  eventCategory: string;
  /**
   * The events to list.
   */
  events: SafeResolverEvent[];
  nodeID: string;
}) {
  return (
    <>
      {events.map((event, index) => (
        <Fragment key={index}>
          <NodeEventsListItem nodeID={nodeID} eventCategory={eventCategory} event={event} />
          {index === events.length - 1 ? null : <EuiHorizontalRule margin="m" />}
        </Fragment>
      ))}
    </>
  );
});

/**
 * Renders `Breadcrumbs`.
 */
const NodeEventsInCategoryBreadcrumbs = memo(function ({
  nodeName,
  eventCategory,
  eventCount,
  nodeID,
  /**
   * The count of events in the category that this list is showing.
   */
  eventsInCategoryCount,
}: {
  nodeName: React.ReactNode;
  eventCategory: string;
  /**
   * The events to list.
   */
  eventCount: number;
  nodeID: string;
  /**
   * The count of events in the category that this list is showing.
   */
  eventsInCategoryCount: number | undefined;
}) {
  const nodesLinkNavProps = useLinkProps({
    panelView: 'nodes',
  });

  const nodeDetailNavProps = useLinkProps({
    panelView: 'nodeDetail',
    panelParameters: { nodeID },
  });

  const nodeEventsNavProps = useLinkProps({
    panelView: 'nodeEvents',
    panelParameters: { nodeID },
  });

  return (
    <Breadcrumbs
      breadcrumbs={[
        {
          text: i18n.translate(
            'xpack.securitySolution.endpoint.resolver.panel.processEventListByType.events',
            {
              defaultMessage: 'Events',
            }
          ),
          ...nodesLinkNavProps,
        },
        {
          text: nodeName,
          ...nodeDetailNavProps,
        },
        {
          text: (
            <FormattedMessage
              id="xpack.securitySolution.endpoint.resolver.panel.relatedEventList.numberOfEvents"
              values={{ totalCount: eventCount }}
              defaultMessage="{totalCount} Events"
            />
          ),
          ...nodeEventsNavProps,
        },
        {
          text: (
            <FormattedMessage
              id="xpack.securitySolution.endpoint.resolver.panel.relatedEventList.countByCategory"
              values={{ count: eventsInCategoryCount, category: eventCategory }}
              defaultMessage="{count} {category}"
            />
          ),
        },
      ]}
    />
  );
});
