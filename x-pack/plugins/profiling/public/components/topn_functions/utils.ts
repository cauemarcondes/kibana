/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { keyBy } from 'lodash';
import { TopNFunctions } from '../../../common/functions';
import { StackFrameMetadata } from '../../../common/profiling';
import { calculateImpactEstimates } from '../../utils/calculate_impact_estimates';

export function getColorLabel(percent: number) {
  const color = percent < 0 ? 'success' : 'danger';
  const icon = percent < 0 ? 'sortDown' : 'sortUp';
  const isSmallPercent = Math.abs(percent) <= 0.01;
  const label = isSmallPercent ? '<0.01' : Math.abs(percent).toFixed(2) + '%';

  return { color, label, icon: isSmallPercent ? undefined : icon };
}

export function scaleValue({ value, scaleFactor = 1 }: { value: number; scaleFactor?: number }) {
  return value * scaleFactor;
}

export interface IFunctionRow {
  rank: number;
  frame: StackFrameMetadata;
  samples: number;
  exclusiveCPU: number;
  inclusiveCPU: number;
  impactEstimates?: ReturnType<typeof calculateImpactEstimates>;
  diff?: {
    rank: number;
    samples: number;
    exclusiveCPU: number;
    inclusiveCPU: number;
  };
}

export function getFunctionsRows({
  baselineScaleFactor,
  comparisonScaleFactor,
  comparisonTopNFunctions,
  topNFunctions,
  totalSeconds,
}: {
  baselineScaleFactor?: number;
  comparisonScaleFactor?: number;
  comparisonTopNFunctions?: TopNFunctions;
  topNFunctions?: TopNFunctions;
  totalSeconds: number;
}): IFunctionRow[] {
  if (!topNFunctions || !topNFunctions.TotalCount || topNFunctions.TotalCount === 0) {
    return [];
  }

  const comparisonDataById = comparisonTopNFunctions
    ? keyBy(comparisonTopNFunctions.TopN, 'Id')
    : {};

  return topNFunctions.TopN.filter((topN) => topN.CountExclusive > 0).map((topN, i) => {
    const comparisonRow = comparisonDataById?.[topN.Id];

    const topNCountExclusiveScaled = scaleValue({
      value: topN.CountExclusive,
      scaleFactor: baselineScaleFactor,
    });

    const inclusiveCPU = (topN.CountInclusive / topNFunctions.TotalCount) * 100;
    const exclusiveCPU = (topN.CountExclusive / topNFunctions.TotalCount) * 100;
    const totalSamples = topN.CountExclusive;

    const impactEstimates =
      totalSeconds > 0
        ? calculateImpactEstimates({
            countExclusive: exclusiveCPU,
            countInclusive: inclusiveCPU,
            totalSamples,
            totalSeconds,
          })
        : undefined;

    function calculateDiff() {
      if (comparisonTopNFunctions && comparisonRow) {
        const comparisonCountExclusiveScaled = scaleValue({
          value: comparisonRow.CountExclusive,
          scaleFactor: comparisonScaleFactor,
        });

        return {
          rank: topN.Rank - comparisonRow.Rank,
          samples: topNCountExclusiveScaled - comparisonCountExclusiveScaled,
          exclusiveCPU:
            exclusiveCPU -
            (comparisonRow.CountExclusive / comparisonTopNFunctions.TotalCount) * 100,
          inclusiveCPU:
            inclusiveCPU -
            (comparisonRow.CountInclusive / comparisonTopNFunctions.TotalCount) * 100,
        };
      }
    }

    return {
      rank: topN.Rank,
      frame: topN.Frame,
      samples: topNCountExclusiveScaled,
      exclusiveCPU,
      inclusiveCPU,
      impactEstimates,
      diff: calculateDiff(),
    };
  });
}
