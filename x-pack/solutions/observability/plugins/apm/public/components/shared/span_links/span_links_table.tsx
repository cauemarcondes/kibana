/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { EuiBasicTableColumn } from '@elastic/eui';
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiIconTip,
  EuiInMemoryTable,
  EuiLink,
  EuiPopover,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React, { useState } from 'react';
import { EBT_CLICK_ACTIONS, getEbtProps } from '@kbn/ebt-click';
import { getSpanIcon } from '@kbn/apm-ui-shared';
import { TRANSACTION_DETAILS_BY_TRACE_ID_LOCATOR } from '@kbn/deeplinks-observability/locators';
import type { SpanLinkDetails } from '@kbn/apm-types';
import { APM_EBT_ELEMENTS } from '../../app/ebt_constants';
import { useApmPluginContext } from '../../../context/apm_plugin/use_apm_plugin_context';
import { asDuration } from '../../../../common/utils/formatters';
import { useAnyOfApmParams } from '../../../hooks/use_apm_params';
import { useApmRouter } from '../../../hooks/use_apm_router';
import { ServiceLink } from '../links/apm/service_link';

interface Props {
  items: SpanLinkDetails[];
}

export function SpanLinksTable({ items }: Props) {
  const router = useApmRouter();
  const {
    query: { rangeFrom, rangeTo, comparisonEnabled },
  } = useAnyOfApmParams(
    '/services/{serviceName}/transactions/view',
    '/mobile-services/{serviceName}/transactions/view',
    '/dependencies/operation'
  );
  const [idActionMenuOpen, setIdActionMenuOpen] = useState<string | undefined>();
  const {
    share: {
      url: { locators },
    },
  } = useApmPluginContext();

  const apmLinkToTransactionByTraceIdLocator = locators.get<{
    traceId: string;
    rangeFrom: string;
    rangeTo: string;
    waterfallItemId: string;
  }>(TRANSACTION_DETAILS_BY_TRACE_ID_LOCATOR);

  const columns: Array<EuiBasicTableColumn<SpanLinkDetails>> = [
    {
      field: 'serviceName',
      name: i18n.translate('xpack.apm.spanLinks.table.serviceName', {
        defaultMessage: 'Service name',
      }),
      sortable: true,
      render: (_, { details }) => {
        if (details) {
          return (
            <ServiceLink
              serviceName={details.serviceName}
              agentName={details.agentName}
              query={{
                rangeFrom,
                rangeTo,
                kuery: '',
                serviceGroup: '',
                comparisonEnabled,
                environment: details.environment || 'ENVIRONMENT_ALL',
              }}
            />
          );
        }
        return (
          <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <EuiFlexItem grow={false} css={{ lineHeight: 1 }}>
              <EuiIconTip
                type="stopSlash"
                size="m"
                color="subdued"
                aria-label={i18n.translate(
                  'xpack.apm.spanLinks.table.serviceName.unknown.tooltip.ariaLabel',
                  {
                    defaultMessage: 'Icon tooltip for unknown service name',
                  }
                )}
                content={i18n.translate('xpack.apm.spanLinks.table.serviceName.unknown.tooltip', {
                  defaultMessage:
                    'This span has not yet been completed, please check again in a while.',
                })}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              {i18n.translate('xpack.apm.spanLinks.table.serviceName.unknown', {
                defaultMessage: 'Unknown',
              })}
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      },
    },
    {
      field: 'spanId',
      name: i18n.translate('xpack.apm.spanLinks.table.span', {
        defaultMessage: 'Span',
      }),
      sortable: true,
      render: (_, { spanId, traceId, details }) => {
        if (details) {
          return (
            <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiIcon
                  type={getSpanIcon(details.spanType, details.spanSubtype)}
                  size="l"
                  aria-hidden={true}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiLink
                  data-test-subj="apmColumnsLink"
                  {...getEbtProps({
                    action: EBT_CLICK_ACTIONS.VIEW_SPAN,
                    element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_SPAN_LINK,
                  })}
                  href={
                    details.transactionId
                      ? router.link('/link-to/transaction/{transactionId}', {
                          path: { transactionId: details.transactionId },
                          query: { waterfallItemId: spanId },
                        })
                      : apmLinkToTransactionByTraceIdLocator?.getRedirectUrl({
                          traceId,
                          rangeFrom,
                          rangeTo,
                          waterfallItemId: spanId,
                        })
                  }
                >
                  {details.spanName}
                </EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          );
        }
        return `${traceId}-${spanId}`;
      },
    },
    {
      field: 'duration',
      name: i18n.translate('xpack.apm.spanLinks.table.spanDuration', {
        defaultMessage: 'Span duration',
      }),
      sortable: true,
      width: '150',
      render: (_, { details }) => {
        return (
          <EuiText size="s" color="subdued">
            {asDuration(details?.duration)}
          </EuiText>
        );
      },
    },
    {
      field: 'actions',
      name: 'Actions',
      width: '100',
      render: (_, { spanId, traceId, details }) => {
        const id = `${traceId}:${spanId}`;
        return (
          <EuiPopover
            aria-label={i18n.translate('xpack.apm.spanLinks.table.actions.ariaLabel', {
              defaultMessage: 'Actions',
            })}
            button={
              <EuiToolTip
                content={i18n.translate('xpack.apm.spanLinks.table.actions.edit.ariaLabel', {
                  defaultMessage: 'Edit',
                })}
                disableScreenReaderOutput
              >
                <EuiButtonIcon
                  data-test-subj="apmColumnsButton"
                  aria-label={i18n.translate('xpack.apm.spanLinks.table.actions.edit.ariaLabel', {
                    defaultMessage: 'Edit',
                  })}
                  iconType="boxesVertical"
                  onClick={() => {
                    setIdActionMenuOpen(id);
                  }}
                  {...getEbtProps({
                    action: EBT_CLICK_ACTIONS.OPEN_ACTIONS_MENU,
                    element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_ROW_ACTIONS,
                  })}
                />
              </EuiToolTip>
            }
            isOpen={idActionMenuOpen === id}
            closePopover={() => {
              setIdActionMenuOpen(undefined);
            }}
          >
            <EuiFlexGroup direction="column" gutterSize="s">
              {details?.transactionId && (
                <EuiFlexItem>
                  <EuiLink
                    data-test-subj="apmColumnsGoToTraceLink"
                    href={router.link('/link-to/transaction/{transactionId}', {
                      path: { transactionId: details.transactionId },
                    })}
                    {...getEbtProps({
                      action: EBT_CLICK_ACTIONS.VIEW_TRACE,
                      element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_GO_TO_TRACE,
                    })}
                  >
                    {i18n.translate('xpack.apm.spanLinks.table.actions.goToTraceDetails', {
                      defaultMessage: 'Go to trace',
                    })}
                  </EuiLink>
                </EuiFlexItem>
              )}
              <EuiFlexItem>
                <EuiCopy textToCopy={traceId}>
                  {(copy) => (
                    <EuiButtonEmpty
                      aria-label={i18n.translate(
                        'xpack.apm.spanLinks.table.actions.copyParentTraceId.ariaLabel',
                        { defaultMessage: 'Copy parent trace id' }
                      )}
                      data-test-subj="apmColumnsCopyParentTraceIdButton"
                      onClick={() => {
                        copy();
                        setIdActionMenuOpen(undefined);
                      }}
                      flush="both"
                      {...getEbtProps({
                        action: EBT_CLICK_ACTIONS.COPY,
                        element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_COPY_PARENT_TRACE_ID,
                        detail: 'traceId',
                      })}
                    >
                      {i18n.translate('xpack.apm.spanLinks.table.actions.copyParentTraceId', {
                        defaultMessage: 'Copy parent trace id',
                      })}
                    </EuiButtonEmpty>
                  )}
                </EuiCopy>
              </EuiFlexItem>
              {details?.transactionId && (
                <EuiFlexItem>
                  <EuiLink
                    data-test-subj="apmColumnsGoToSpanDetailsLink"
                    href={router.link('/link-to/transaction/{transactionId}', {
                      path: { transactionId: details.transactionId },
                      query: { waterfallItemId: spanId },
                    })}
                    {...getEbtProps({
                      action: EBT_CLICK_ACTIONS.VIEW_SPAN,
                      element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_GO_TO_SPAN_DETAILS,
                    })}
                  >
                    {i18n.translate('xpack.apm.spanLinks.table.actions.goToSpanDetails', {
                      defaultMessage: 'Go to span details',
                    })}
                  </EuiLink>
                </EuiFlexItem>
              )}
              <EuiFlexItem>
                <EuiCopy textToCopy={spanId}>
                  {(copy) => (
                    <EuiButtonEmpty
                      aria-label={i18n.translate(
                        'xpack.apm.spanLinks.table.actions.copySpanId.ariaLabel',
                        {
                          defaultMessage: 'Copy span id',
                        }
                      )}
                      data-test-subj="apmColumnsCopySpanIdButton"
                      onClick={() => {
                        copy();
                        setIdActionMenuOpen(undefined);
                      }}
                      flush="both"
                      {...getEbtProps({
                        action: EBT_CLICK_ACTIONS.COPY,
                        element: APM_EBT_ELEMENTS.SPAN_LINKS_TABLE_COPY_SPAN_ID,
                        detail: 'spanId',
                      })}
                    >
                      {i18n.translate('xpack.apm.spanLinks.table.actions.copySpanId', {
                        defaultMessage: 'Copy span id',
                      })}
                    </EuiButtonEmpty>
                  )}
                </EuiCopy>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopover>
        );
      },
    },
  ];

  return (
    <EuiInMemoryTable
      items={items}
      columns={columns}
      sorting={true}
      pagination={true}
      tableCaption={i18n.translate('xpack.apm.spanLinks.table.caption', {
        defaultMessage: 'Span links list',
      })}
    />
  );
}
