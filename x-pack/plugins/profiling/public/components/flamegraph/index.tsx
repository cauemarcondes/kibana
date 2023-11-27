/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  Chart,
  Datum,
  Flame,
  FlameLayerValue,
  FlameSpec,
  PartialTheme,
  Settings,
  Tooltip,
} from '@elastic/charts';
import { EuiFlexGroup, EuiFlexItem, useEuiTheme } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { Maybe } from '@kbn/observability-plugin/common/typings';
import { useUiTracker } from '@kbn/observability-shared-plugin/public';
import type { ElasticFlameGraph } from '@kbn/profiling-utils';
import React, { useEffect, useMemo, useState } from 'react';
import { getFlamegraphModel } from '../../utils/get_flamegraph_model';
import { Frame } from '../frame_information_window';
import { FrameInformationTooltip } from '../frame_information_window/frame_information_tooltip';
import { ComparisonMode } from '../normalization_menu';
import { FlameGraphTooltip } from './flamegraph_tooltip';
import { FlameGraphLegend } from './flame_graph_legend';

interface Props {
  id: string;
  comparisonMode?: ComparisonMode;
  primaryFlamegraph?: ElasticFlameGraph;
  comparisonFlamegraph?: ElasticFlameGraph;
  baseline?: number;
  comparison?: number;
  searchText?: string;
  onChangeSearchText?: FlameSpec['onSearchTextChange'];
  isEmbedded?: boolean;
}

export function FlameGraph({
  id,
  comparisonMode,
  primaryFlamegraph,
  comparisonFlamegraph,
  baseline,
  comparison,
  searchText,
  onChangeSearchText,
  isEmbedded = false,
}: Props) {
  const [showInformationWindow, setShowInformationWindow] = useState(false);
  function toggleShowInformationWindow() {
    setShowInformationWindow((prev) => !prev);
  }
  const theme = useEuiTheme();
  const trackProfilingEvent = useUiTracker({ app: 'profiling' });

  const columnarData = useMemo(() => {
    return getFlamegraphModel({
      primaryFlamegraph,
      comparisonFlamegraph,
      colorSuccess: theme.euiTheme.colors.success,
      colorDanger: theme.euiTheme.colors.danger,
      colorNeutral: theme.euiTheme.colors.lightShade,
      comparisonMode,
      baseline,
      comparison,
    });
  }, [
    primaryFlamegraph,
    comparisonFlamegraph,
    theme.euiTheme.colors.success,
    theme.euiTheme.colors.danger,
    theme.euiTheme.colors.lightShade,
    comparisonMode,
    baseline,
    comparison,
  ]);

  const chartTheme: PartialTheme = {
    chartMargins: { top: 0, left: 0, bottom: 0, right: 0 },
    chartPaddings: { left: 0, right: 0, top: 0, bottom: 0 },
    tooltip: { maxWidth: 500 },
  };

  const totalSamples = columnarData.viewModel.value[0];

  const [highlightedVmIndex, setHighlightedVmIndex] = useState<number | undefined>(undefined);

  const selected: Frame | undefined =
    primaryFlamegraph && highlightedVmIndex !== undefined
      ? {
          fileID: primaryFlamegraph.FileID[highlightedVmIndex],
          frameType: primaryFlamegraph.FrameType[highlightedVmIndex],
          exeFileName: primaryFlamegraph.ExeFilename[highlightedVmIndex],
          addressOrLine: primaryFlamegraph.AddressOrLine[highlightedVmIndex],
          functionName: primaryFlamegraph.FunctionName[highlightedVmIndex],
          sourceFileName: primaryFlamegraph.SourceFilename[highlightedVmIndex],
          sourceLine: primaryFlamegraph.SourceLine[highlightedVmIndex],
          countInclusive: primaryFlamegraph.CountInclusive[highlightedVmIndex],
          countExclusive: primaryFlamegraph.CountExclusive[highlightedVmIndex],
          selfAnnualCo2Tons: primaryFlamegraph.AnnualCO2TonsExclusive[highlightedVmIndex],
          totalAnnualCo2Tons: primaryFlamegraph.AnnualCO2TonsInclusive[highlightedVmIndex],
          selfAnnualCostUsd: primaryFlamegraph.AnnualCostsUSDExclusive[highlightedVmIndex],
          totalAnnualCostUsd: primaryFlamegraph.AnnualCostsUSDInclusive[highlightedVmIndex],
        }
      : undefined;

  useEffect(() => {
    setHighlightedVmIndex(undefined);
  }, [columnarData.key]);

  return (
    <>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <EuiFlexGroup direction="row">
            {columnarData.viewModel.label.length > 0 && (
              <EuiFlexItem grow>
                <Chart key={columnarData.key}>
                  <Settings
                    theme={chartTheme}
                    onElementClick={(elements) => {
                      const selectedElement = elements[0] as Maybe<FlameLayerValue>;
                      if (Number.isNaN(selectedElement?.vmIndex)) {
                        setHighlightedVmIndex(undefined);
                      } else {
                        setHighlightedVmIndex(selectedElement!.vmIndex);
                      }
                    }}
                    locale={i18n.getLocale()}
                  />
                  <Tooltip
                    actions={[{ label: '', onSelect: () => {} }]}
                    customTooltip={(props) => {
                      if (!primaryFlamegraph) {
                        return <></>;
                      }

                      const valueIndex = props.values[0].valueAccessor as number;
                      const label = primaryFlamegraph.Label[valueIndex];
                      const countInclusive = primaryFlamegraph.CountInclusive[valueIndex];
                      const countExclusive = primaryFlamegraph.CountExclusive[valueIndex];
                      const totalSeconds = primaryFlamegraph.TotalSeconds;
                      const nodeID = primaryFlamegraph.ID[valueIndex];
                      const inline = primaryFlamegraph.Inline[valueIndex];
                      const comparisonNode = columnarData.comparisonNodesById[nodeID];

                      const parentLabel = inline
                        ? // If it's an inline frame, look up for its parent frame
                          primaryFlamegraph.Label[
                            primaryFlamegraph.Edges.findIndex((edge) => edge.includes(valueIndex))
                          ]
                        : undefined;

                      return (
                        <FlameGraphTooltip
                          annualCO2TonsInclusive={
                            primaryFlamegraph.AnnualCO2TonsInclusive[valueIndex]
                          }
                          annualCostsUSDInclusive={
                            primaryFlamegraph.AnnualCostsUSDInclusive[valueIndex]
                          }
                          baselineScaleFactor={baseline}
                          comparisonAnnualCO2TonsInclusive={
                            comparisonFlamegraph?.AnnualCO2TonsInclusive[valueIndex]
                          }
                          comparisonAnnualCostsUSDInclusive={
                            comparisonFlamegraph?.AnnualCostsUSDInclusive[valueIndex]
                          }
                          comparisonCountExclusive={comparisonNode?.CountExclusive}
                          comparisonCountInclusive={comparisonNode?.CountInclusive}
                          comparisonScaleFactor={comparison}
                          comparisonTotalSamples={comparisonFlamegraph?.CountInclusive[0]}
                          comparisonTotalSeconds={comparisonFlamegraph?.TotalSeconds}
                          countExclusive={countExclusive}
                          countInclusive={countInclusive}
                          isRoot={valueIndex === 0}
                          label={label}
                          onShowMoreClick={() => {
                            trackProfilingEvent({ metric: 'flamegraph_node_details_click' });
                            toggleShowInformationWindow();
                            setHighlightedVmIndex(valueIndex);
                          }}
                          totalSamples={totalSamples}
                          totalSeconds={totalSeconds}
                          inline={inline}
                          parentLabel={parentLabel}
                        />
                      );
                    }}
                  />
                  <Flame
                    id={id}
                    columnarData={columnarData.viewModel}
                    valueAccessor={(d: Datum) => d.value as number}
                    valueFormatter={(value) => `${value}`}
                    animation={{ duration: 100 }}
                    controlProviderCallback={{}}
                    search={searchText ? { text: searchText } : undefined}
                    onSearchTextChange={onChangeSearchText}
                  />
                </Chart>
              </EuiFlexItem>
            )}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FlameGraphLegend
            legendItems={columnarData.legendItems}
            asScale={!!comparisonFlamegraph}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      {showInformationWindow && (
        <FrameInformationTooltip
          onClose={toggleShowInformationWindow}
          frame={selected}
          totalSeconds={primaryFlamegraph?.TotalSeconds ?? 0}
          totalSamples={totalSamples}
          showSymbolsStatus={!isEmbedded}
        />
      )}
    </>
  );
}
