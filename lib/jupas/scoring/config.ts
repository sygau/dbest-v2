// Tuneable JUPAS scoring config. Algorithm logic lives in sibling modules.
// Things that ARE NOT in this file (and shouldn't be): Cat A/B/C grade tables,
// HKUST bonus %, special-calc science set — those are JUPAS rules, not product knobs.

import type { ScaleTier, TierKey, Year } from './types';

export const ENGINE_VERSION = '0.1.0';

export const DEFAULT_YEAR: Year = 2025;
export const YEAR_FALLBACK_ORDER: Year[] = [2025, 2024, 2023];

// Soften / rename the public-facing tier wording here.
// `key` (highchance/comp/bord/low/unmet) is the stable ASCII identifier used in CSS classes — DO NOT rename.
export const TIERS: Record<TierKey, { zh: ScaleTier; en: string }> = {
  highchance:  { zh: '大機會',   en: 'High Chance' },
  comp:  { zh: '博得過', en: 'Competitive' },
  bord:  { zh: '邊緣',   en: 'Borderline' },
  low:   { zh: '機率低', en: 'Low Chance' },
  unmet: { zh: '唔達標', en: 'Unmet' },
};

// Width (in score points) of the "low" band below LQ.
// score in [LQ - LOW_BAND_WIDTH, LQ) → low. Below → unmet.
export const LOW_BAND_WIDTH = 3;

// HKU flexible-admission score deduction (10% off).
export const HKU_FLEX_DEDUCTION = 0.9;

// CUHK Medicine programmes that retain the standard 7-point scale.
export const CUHK_STANDARD_SCALE_IDS = new Set(['JS4501', 'JS4502']);

// Universities whose pre-2025 cutoffs were on the standard scale.
// Triggers a scaleNote on the result when the year used predates the transition.
export const PRE_2025_STANDARD_SCALE_UNIS = new Set(['POLYU', 'CITYU']);
export const ENHANCED_SCALE_TRANSITION_YEAR: Year = 2025;

// Pure-function classifier. Future shape changes (lenient mode, non-quartile bands)
// only touch this file.
export function classifyTier(
  score: number,
  cutoff: { uq: number | null; median: number | null; lq: number | null },
): TierKey {
  const uq  = cutoff.uq     ?? cutoff.median ?? cutoff.lq;
  const med = cutoff.median ?? cutoff.lq     ?? cutoff.uq;
  const lq  = cutoff.lq     ?? cutoff.median ?? cutoff.uq;

  if (uq  != null && score >= uq)  return 'highchance';
  if (med != null && score >= med) return 'comp';
  if (lq  != null && score >= lq)  return 'bord';
  if (lq  != null && score >= lq - LOW_BAND_WIDTH) return 'low';
  return 'unmet';
}

// CORS allowlist for /api/jupas/calculate.
export const CORS_ALLOWED_ORIGINS = new Set<string>([
  'https://dse.best',
  'https://www.dse.best',
  'http://localhost:3000',
]);

// Programme fields stripped from `result.programme` before sending to client.
// These encode scoring rules / engine config — high IP value, no UX value.
// Rules stay server-side; clients still receive enough to render cards & filters.
// `formula` replaced with computed `formulaLabel` string in toPublic().
export const STRIPPED_PROGRAMME_FIELDS = [
  'weights',
  'gates',
  'hku',
  'hkust',
  'excludeRules',
  'special',
  'maxWeightedElectives',
  'formula',
] as const;

// Anti-abuse toggles. Both bypassed when IS_PROD !== 'true'.
//
// Workers free-plan note: the 10 ms limit is CPU TIME only, not wall time.
// Turnstile siteverify is a fetch() (I/O) and does NOT count against CPU.
// Rate-limit binding is native and near-zero CPU. Safe to enable on free plan.
//
// Flip `turnstile.enabled` to false to disable entirely without redeploying
// wrangler config (e.g. when frontend isn't ready yet, or for emergency rollback).
export const ANTI_ABUSE = {
  turnstile: {
    enabled: true,
    headerName: 'cf-turnstile-token',
  },
  rateLimit: {
    enabled: true,                        // cheap, leave on
    bindingName: 'RATE_LIMITER' as const,
  },
};

export type StrippedKey = typeof STRIPPED_PROGRAMME_FIELDS[number];
