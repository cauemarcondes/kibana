/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export const APM_EBT_ACTIONS = {
  EXPLORE_TRACES: 'exploreTraces',
  SET_ANOMALY_THRESHOLD: 'setAnomalyThreshold',
  SET_LATENCY_AGGREGATION_TYPE: 'setLatencyAggregationType',
  SET_TRANSACTION_TYPE: 'setTransactionType',
  SET_SPAN_LINK_TYPE: 'setSpanLinkType',
  SET_TIME_COMPARISON: 'setTimeComparison',
  VIEW_CRASH: 'viewCrash',
  VIEW_SETUP_INSTRUCTIONS: 'viewSetupInstructions',
  ADD_DATA: 'addData',
  CREATE_SLO: 'createSlo',
  TOGGLE_SLO_DETAILS: 'toggleSloDetails',
  CREATE_CUSTOM_LINK: 'createCustomLink',
  VIEW_CUSTOM_LINKS_SETTINGS: 'viewCustomLinksSettings',
  TOGGLE_CUSTOM_LINKS_VISIBILITY: 'toggleCustomLinksVisibility',
  CREATE_ML_JOB: 'createMlJob',
  UPGRADE_ML_JOBS: 'upgradeMlJobs',
  MANAGE_ML_JOBS: 'manageMlJobs',
  VIEW_FLAMEGRAPH: 'viewFlamegraph',
  VIEW_TOP_FUNCTIONS: 'viewTopFunctions',
  VIEW_INFRA: 'viewInfra',
  VIEW_SERVICE_INVENTORY: 'viewServiceInventory',
} as const;

export const APM_EBT_ELEMENTS = {
  // Links - APM internal navigation
  APM_HOME_LINK: 'apmHomeLink',
  ERROR_DETAIL_LINK: 'errorDetailLink',
  ERROR_OVERVIEW_LINK: 'errorOverviewLink',
  MAX_GROUPS_DOCS_LINK: 'maxGroupsDocsLink',
  METRIC_OVERVIEW_LINK: 'metricOverviewLink',
  SERVICE_NODE_METRIC_OVERVIEW_LINK: 'serviceNodeMetricOverviewLink',
  SERVICE_TRANSACTIONS_OVERVIEW_LINK: 'serviceTransactionsOverviewLink',
  TRANSACTION_DETAIL_LINK: 'transactionDetailLink',
  TRANSACTION_OVERVIEW_LINK: 'transactionOverviewLink',
  // Links - Mobile
  MOBILE_CRASH_DETAIL_LINK: 'mobileCrashDetailLink',
  MOBILE_ERROR_DETAIL_LINK: 'mobileErrorDetailLink',
  MOBILE_ERROR_OVERVIEW_LINK: 'mobileErrorOverviewLink',
  // Links - External
  ELASTIC_DOCS_LINK: 'elasticDocsLink',
  INFRA_LINK: 'infraLink',
  SETUP_INSTRUCTIONS_BUTTON: 'setupInstructionsButton',
  ADD_DATA_BUTTON: 'addDataButton',
  // Links - ML
  ML_ANOMALY_EXPLORER_LINK: 'mlAnomalyExplorerLink',
  ML_MANAGE_JOBS_LINK: 'mlManageJobsLink',
  ML_SINGLE_METRIC_LINK: 'mlSingleMetricLink',
  // Selects / controls
  ANOMALY_THRESHOLD_SELECT: 'anomalyThresholdSelect',
  LATENCY_AGGREGATION_TYPE_SELECT: 'latencyAggregationTypeSelect',
  SPAN_LINKS_TYPE_SELECT: 'spanLinksTypeSelect',
  TIME_COMPARISON_SELECT: 'timeComparisonSelect',
  SERVICE_FLYOUT_TRANSACTION_TYPE_SELECT: 'serviceFlyoutTransactionTypeSelect',
  // Tables and menus
  MANAGED_TABLE_ROW_ACTIONS: 'managedTableRowActions',
  TRANSACTION_ACTION_MENU_BUTTON: 'transactionActionMenuButton',
  KEY_VALUE_FILTER_BUTTON: 'keyValueFilterButton',
  METADATA_TABLE_HOW_TO_DOCS_LINK: 'metadataTableHowToDocsLink',
  // Popovers
  POPOVER_TOOLTIP_BUTTON: 'popoverTooltipButton',
  SERVICE_ICON_POPOVER: 'serviceIconPopover',
  // License
  LICENSE_PROMPT_START_TRIAL_BUTTON: 'licensePromptStartTrialButton',
  // ML callout
  ML_CALLOUT_LEARN_MORE: 'mlCalloutLearnMore',
  ML_CALLOUT_CREATE_JOB_BUTTON: 'mlCalloutCreateJobButton',
  ML_CALLOUT_UPGRADE_JOBS_BUTTON: 'mlCalloutUpgradeJobsButton',
  ML_CALLOUT_REVIEW_JOBS_BUTTON: 'mlCalloutReviewJobsButton',
  // SLO
  SLO_CALLOUT_CREATE_BUTTON: 'sloCalloutCreateButton',
  SLO_CALLOUT_VIEW_DOCS_BUTTON: 'sloCalloutViewDocsButton',
  SLO_OVERVIEW_TABLE_EXPAND_BUTTON: 'sloOverviewTableExpandButton',
  SLO_OVERVIEW_FLYOUT_SLO_LINK: 'sloOverviewFlyoutSloLink',
  SLO_OVERVIEW_FLYOUT_CREATE_BUTTON: 'sloOverviewFlyoutCreateButton',
  // Span links
  SPAN_LINKS_CALLOUT_DISMISS_BUTTON: 'spanLinksCalloutDismissButton',
  SPAN_LINKS_TABLE_SPAN_LINK: 'spanLinksTableSpanLink',
  SPAN_LINKS_TABLE_ROW_ACTIONS: 'spanLinksTableRowActions',
  SPAN_LINKS_TABLE_GO_TO_TRACE: 'spanLinksTableGoToTrace',
  SPAN_LINKS_TABLE_COPY_PARENT_TRACE_ID: 'spanLinksTableCopyParentTraceId',
  SPAN_LINKS_TABLE_GO_TO_SPAN_DETAILS: 'spanLinksTableGoToSpanDetails',
  SPAN_LINKS_TABLE_COPY_SPAN_ID: 'spanLinksTableCopySpanId',
  // Custom links
  CUSTOM_LINKS_TOOLBAR_SETTINGS_LINK: 'customLinksToolbarSettingsLink',
  CUSTOM_LINKS_TOOLBAR_CREATE_BUTTON: 'customLinksToolbarCreateButton',
  CUSTOM_LINKS_EMPTY_STATE_CREATE_BUTTON: 'customLinksEmptyStateCreateButton',
  CUSTOM_LINKS_SHOW_MORE_BUTTON: 'customLinksShowMoreButton',
  // Transaction flyout
  DROPPED_SPANS_WARNING_DOCS_LINK: 'droppedSpansWarningDocsLink',
  // Profiling
  PROFILING_FLAMEGRAPH_LINK: 'profilingFlamegraphLink',
  PROFILING_TOP_FUNCTIONS_LINK: 'profilingTopFunctionsLink',
} as const;
