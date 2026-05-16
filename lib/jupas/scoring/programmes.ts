// Programme data loader. Bundled at build time via static import.
// OpenNext bundles JSON imports into the worker — no runtime fetch.

import raw from '../../../JUPASTool/output/programmes.json';
import { isEnhancedScale } from './grades';
import type { Programme } from './types';

// Freeze once at module load. Consumed read-only at request time.
const PROGRAMMES: ReadonlyArray<Programme> = Object.freeze(raw as unknown as Programme[]);

// Pre-computed theoretical max per programme (rough upper bound for breakdown UI).
// We approximate maxScore as the sum of formula.n × highest weight discovered, no gating.
const MAX_SCORE_CACHE = new Float64Array(PROGRAMMES.length);
for (let i = 0; i < PROGRAMMES.length; i++) {
  const p = PROGRAMMES[i];
  // Quick heuristic: HKUST cap if present; else N × max-weight × top-grade.
  if (p.hkust.highestAttainableScore != null) {
    MAX_SCORE_CACHE[i] = p.hkust.highestAttainableScore;
    continue;
  }
  const top = isEnhancedScale(p) ? 8.5 : 7;
  const n = p.formula.n ?? 5;
  let maxWeight = 1;
  for (const k in p.weights.regular) {
    const w = p.weights.regular[k];
    if (w > maxWeight) maxWeight = w;
  }
  for (const g of p.weights.bestOf) {
    if (g.weight > maxWeight) maxWeight = g.weight;
  }
  MAX_SCORE_CACHE[i] = n * top * maxWeight;
}

export function getProgrammes(): ReadonlyArray<Programme> {
  return PROGRAMMES;
}

export function getMaxScore(index: number): number {
  return MAX_SCORE_CACHE[index] ?? 0;
}
