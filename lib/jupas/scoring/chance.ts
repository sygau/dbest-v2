// 5-tier chance classifier. Tuneable bits live in config.ts.

import {
  classifyTier,
  ENHANCED_SCALE_TRANSITION_YEAR,
  PRE_2025_STANDARD_SCALE_UNIS,
  TIERS,
  YEAR_FALLBACK_ORDER,
} from './config';
import type { Programme, ScaleTier, TierKey, Year } from './types';

export interface ChanceResult {
  tier: ScaleTier;
  tierKey: TierKey;
  yearUsed: Year;
  scaleNote?: string;
}

function pickYear(programme: Programme, requested: Year): { year: Year; cutoff: { uq: number | null; median: number | null; lq: number | null } } {
  const order: Year[] = [requested, ...YEAR_FALLBACK_ORDER].filter((y, i, a) => a.indexOf(y) === i) as Year[];
  for (const y of order) {
    const c = programme.cutoffs[String(y) as '2025'];
    if (c && (c.uq != null || c.median != null || c.lq != null)) {
      return { year: y, cutoff: c };
    }
  }
  return { year: requested, cutoff: { uq: null, median: null, lq: null } };
}

function differentScaleNote(programme: Programme, year: Year): string | undefined {
  if (PRE_2025_STANDARD_SCALE_UNIS.has(programme.uni) && year < ENHANCED_SCALE_TRANSITION_YEAR) {
    return `${programme.uni} ${year} cutoff uses standard scale; computed score is enhanced — comparison approximate`;
  }
  return undefined;
}

export function classify(
  programme: Programme,
  score: number | null,
  eligible: boolean,
  requestedYear: Year,
): ChanceResult {
  if (!eligible || score == null) {
    return { tier: TIERS.unmet.zh, tierKey: 'unmet', yearUsed: requestedYear };
  }

  const { year, cutoff } = pickYear(programme, requestedYear);
  const scaleNote = differentScaleNote(programme, year);

  // No cutoff data → cannot rank; treat as low (unknown but eligible).
  if (cutoff.uq == null && cutoff.median == null && cutoff.lq == null) {
    return { tier: TIERS.low.zh, tierKey: 'low', yearUsed: year, scaleNote: 'no cutoff data' };
  }

  const key = classifyTier(score, cutoff);
  return { tier: TIERS[key].zh, tierKey: key, yearUsed: year, scaleNote };
}
