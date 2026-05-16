// Quick smoke test — run with `npx tsx lib/jupas/scoring/__smoke__.ts`.
// Not a real test suite; just sanity-checks the engine end-to-end on a representative profile.

import { scoreAll } from './engine';
import type { StudentProfile } from './types';

const profile: StudentProfile = {
  subjects: [
    { subject: 'core:chi',  level: 4 },
    { subject: 'core:eng',  level: 5 },
    { subject: 'core:math', level: '5*' },
    { subject: 'core:csd',  level: 3 },
    { subject: 'elec:phys', level: '5**' },
    { subject: 'elec:chem', level: 5 },
    { subject: 'ext:M2',    level: 4 },
  ],
  options: { year: 2025, breakdown: false, flex: true, includeIneligible: true },
};

// Warm V8.
for (let i = 0; i < 5; i++) scoreAll(profile);
const times: number[] = [];
let out = scoreAll(profile);
for (let i = 0; i < 10; i++) {
  const a = performance.now();
  out = scoreAll(profile);
  times.push(performance.now() - a);
}
times.sort((a, b) => a - b);
const median = times[5];
const p95 = times[9];
console.log(`engine warm median ${median.toFixed(2)}ms p95 ${p95.toFixed(2)}ms; meta runtime ${out.meta.runtimeMs} ms`);
console.log(`programmes returned: ${out.count}; eligible: ${out.eligibleCount}`);

const sample = out.results.slice(0, 5).map((r) => ({
  id: r.programme.id, uni: r.programme.uni, score: r.score, tier: r.tier,
  yearUsed: r.yearUsed, eligible: r.eligible,
}));
console.log('top 5:', sample);

// JS5200 (HKUST Engineering) — verify cap applies.
const hkust = out.results.find((r) => r.programme.id === 'JS5200');
if (hkust) console.log('JS5200:', { score: hkust.score, tier: hkust.tier, eligible: hkust.eligible, ineligibilityReason: hkust.ineligibilityReason });

// JS4501 (CUHK Med) — verify standard scale used (lower numeric).
const med = out.results.find((r) => r.programme.id === 'JS4501');
if (med) console.log('JS4501:', { score: med.score, tier: med.tier, eligible: med.eligible });

// JS6456 (HKU Med) pure best 6.
const hkumed = out.results.find((r) => r.programme.id === 'JS6456');
if (hkumed) console.log('JS6456:', { score: hkumed.score, tier: hkumed.tier, eligible: hkumed.eligible });

// JS6119 special.
const js6119 = out.results.find((r) => r.programme.id === 'JS6119');
if (js6119) console.log('JS6119:', { score: js6119.score, tier: js6119.tier, eligible: js6119.eligible });

// JS1211 math_or_m1m2_only_one.
const cityuBme = out.results.find((r) => r.programme.id === 'JS1211');
if (cityuBme) console.log('JS1211:', { score: cityuBme.score, tier: cityuBme.tier });

// Verify stripped fields gone.
console.log('programme keys:', Object.keys(out.results[0].programme).sort().join(','));

// Tier histogram.
const hist: Record<string, number> = {};
for (const r of out.results) hist[r.tierKey] = (hist[r.tierKey] ?? 0) + 1;
console.log('tier histogram:', hist);
