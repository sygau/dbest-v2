// Special calculations for JS6119 / JS6901 / JS6688. Per JSON_SCHEMA §Special + JUPAS_MECHANISM §9.

import type { BreakdownEntry, Programme, SubjectScore } from './types';
import { applySubjectConstraints } from './weights';

const SCIENCE_SET = new Set(['elec:bio', 'elec:chem', 'elec:phys', 'ext:M1', 'ext:M2']);

export interface SpecialResult {
  score: number;
  breakdown: BreakdownEntry[];
  steps: string[];
}

// JS6119 / JS6901 — science subjects ×1.5, others ×1.0; then Best N from formula.
function scienceConditional(scores: SubjectScore[], programme: Programme): SpecialResult {
  const constrained = applySubjectConstraints(scores, programme);
  const weighted = constrained
    .filter((s) => s.subject !== 'core:csd')
    .map((s) => {
      const w = SCIENCE_SET.has(s.subject) ? 1.5 : 1.0;
      return { subject: s.subject, numeric: s.numeric, weight: w, weighted: s.numeric * w };
    });
  weighted.sort((a, b) => b.weighted - a.weighted);

  const n = programme.formula.n ?? 5;
  const take = Math.min(n, weighted.length);
  let score = 0;
  const breakdown: BreakdownEntry[] = [];
  for (let i = 0; i < take; i++) {
    score += weighted[i].weighted;
    breakdown.push({ ...weighted[i], usedAs: 'best' });
  }
  for (let i = take; i < weighted.length; i++) {
    breakdown.push({ ...weighted[i], usedAs: 'unused' });
  }
  return { score, breakdown, steps: [`scienceConditional: science×1.5 + Best ${n}`] };
}

// JS6688 — best 3 from {Bio,Chem,Phys,M1,M2} ×1.3; exclude Chinese; Best N from formula.
function scienceMasterClass(scores: SubjectScore[], programme: Programme): SpecialResult {
  // Drop Chinese.
  const filtered = scores.filter((s) => s.subject !== 'core:chi');
  const constrained = applySubjectConstraints(filtered, programme);

  // Pick best 3 sciences ×1.3.
  const sciences = constrained
    .filter((s) => SCIENCE_SET.has(s.subject))
    .map((s) => ({ subject: s.subject, numeric: s.numeric, weight: 1.3, weighted: s.numeric * 1.3 }))
    .sort((a, b) => b.weighted - a.weighted)
    .slice(0, 3);
  const sciSet = new Set(sciences.map((s) => s.subject));

  const others = constrained
    .filter((s) => !sciSet.has(s.subject) && s.subject !== 'core:csd')
    .map((s) => ({ subject: s.subject, numeric: s.numeric, weight: 1, weighted: s.numeric }));

  const all = [...sciences, ...others].sort((a, b) => b.weighted - a.weighted);

  const n = programme.formula.n ?? 5;
  const take = Math.min(n, all.length);
  let score = 0;
  const breakdown: BreakdownEntry[] = [];
  for (let i = 0; i < take; i++) {
    score += all[i].weighted;
    breakdown.push({ ...all[i], usedAs: 'best' });
  }
  for (let i = take; i < all.length; i++) {
    breakdown.push({ ...all[i], usedAs: 'unused' });
  }
  return { score, breakdown, steps: [`js6688: 3 sciences×1.3 + Best ${n}, Chinese excluded`] };
}

const REGISTRY: Record<string, (s: SubjectScore[], p: Programme) => SpecialResult> = {
  js6119_special_calculation: scienceConditional,
  js6901_special_calculation: scienceConditional,
  js6688_special_calculation: scienceMasterClass,
};

export function runSpecial(name: string, scores: SubjectScore[], programme: Programme): SpecialResult | null {
  const fn = REGISTRY[name];
  if (!fn) return null;
  return fn(scores, programme);
}
