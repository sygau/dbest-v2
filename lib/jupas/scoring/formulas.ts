// Formula executors. Per JSON_SCHEMA §Formula + JUPAS_MECHANISM §2.

import type { BreakdownEntry, Programme } from './types';
import type { WeightedSubject } from './weights';

export interface FormulaResult {
  score: number;
  breakdown: BreakdownEntry[];
  steps: string[];
}

// HKUST 6th-subject bonus % keyed by numeric score. Universal across all HKUST programmes.
const HKUST_BONUS_PCT: Record<number, number> = {
  8.5: 0.0500,
  7:   0.0412,
  5.5: 0.0324,
  4:   0.0235,
  3:   0.0176,
};

function hkustBonusPct(numeric: number, cat: 'A' | 'B' | 'C'): number {
  // Cat A requires Level 3+ (numeric≥3). Cat B Distinction (numeric≥3). Cat C ≥3 equivalent.
  if (numeric < 3) return 0;
  return HKUST_BONUS_PCT[numeric] ?? 0;
}

function sortedDesc(ws: WeightedSubject[]): WeightedSubject[] {
  // Ignore zero-score CSD slot to avoid eating a Best-N seat.
  return ws.filter((w) => w.subject !== 'core:csd').slice().sort((a, b) => b.weighted - a.weighted);
}

export function runBestN(ws: WeightedSubject[], programme: Programme): FormulaResult {
  const sorted = sortedDesc(ws);
  const n = programme.formula.n ?? 5;
  const mult = programme.hku.sixthMultiplier;
  const breakdown: BreakdownEntry[] = [];
  const steps: string[] = [];

  if (sorted.length === 0) {
    return { score: 0, breakdown: [], steps: ['no scorable subjects'] };
  }

  const take = Math.min(n, sorted.length);
  let score = 0;
  for (let i = 0; i < take; i++) {
    const w = sorted[i];
    let contribution = w.weighted;
    let usedAs: BreakdownEntry['usedAs'] = 'best';
    // Apply HKU sixth-multiplier ONLY to the Nth slot when there are exactly N subjects.
    if (mult != null && mult < 1 && i === take - 1 && take === n) {
      contribution = w.weighted * mult;
      usedAs = 'sixth';
    }
    score += contribution;
    breakdown.push({
      subject: w.subject, numeric: w.numeric, weight: w.weight,
      weighted: contribution, usedAs,
    });
  }
  for (let i = take; i < sorted.length; i++) {
    breakdown.push({
      subject: sorted[i].subject, numeric: sorted[i].numeric,
      weight: sorted[i].weight, weighted: sorted[i].weighted, usedAs: 'unused',
    });
  }
  if (mult != null && mult < 1) {
    steps.push(`Best ${n - 1} + ${n}th × ${mult}`);
  } else {
    steps.push(`Best ${n}`);
  }
  steps.push(`subjects used: ${take}/${n}`);
  return { score, breakdown, steps };
}

export function runHkust(ws: WeightedSubject[], programme: Programme): FormulaResult {
  const sorted = sortedDesc(ws);
  const cap = programme.hkust.highestAttainableScore ?? Infinity;
  const breakdown: BreakdownEntry[] = [];
  const steps: string[] = [];

  let best5 = 0;
  for (let i = 0; i < Math.min(5, sorted.length); i++) {
    best5 += sorted[i].weighted;
    breakdown.push({
      subject: sorted[i].subject, numeric: sorted[i].numeric,
      weight: sorted[i].weight, weighted: sorted[i].weighted, usedAs: 'best',
    });
  }

  let bonus = 0;
  if (sorted.length >= 6) {
    const sixth = sorted[5];
    const pct = hkustBonusPct(sixth.numeric, sixth.cat);
    bonus = (programme.hkust.highestAttainableScore ?? 0) * pct;
    breakdown.push({
      subject: sixth.subject, numeric: sixth.numeric, weight: sixth.weight,
      weighted: bonus, usedAs: 'sixth',
    });
    steps.push(`6th subject bonus: ${(pct * 100).toFixed(2)}% × HAS ${programme.hkust.highestAttainableScore} = ${bonus.toFixed(4)}`);
  }
  for (let i = 6; i < sorted.length; i++) {
    breakdown.push({
      subject: sorted[i].subject, numeric: sorted[i].numeric,
      weight: sorted[i].weight, weighted: sorted[i].weighted, usedAs: 'unused',
    });
  }

  const raw = best5 + bonus;
  const final = Math.min(raw, cap);
  steps.push(`Best 5 = ${best5.toFixed(4)}; raw = ${raw.toFixed(4)}; cap ${cap}; final ${final.toFixed(4)}`);
  return { score: final, breakdown, steps };
}

export function runPolyu(ws: WeightedSubject[]): FormulaResult {
  const sorted = sortedDesc(ws);
  const breakdown: BreakdownEntry[] = [];
  const steps: string[] = [];

  let best5 = 0;
  for (let i = 0; i < Math.min(5, sorted.length); i++) {
    best5 += sorted[i].weighted;
    breakdown.push({
      subject: sorted[i].subject, numeric: sorted[i].numeric,
      weight: sorted[i].weight, weighted: sorted[i].weighted, usedAs: 'best',
    });
  }

  let bonus = 0;
  if (sorted.length >= 6) {
    const sixth = sorted[5];
    // Quality gate: Cat A Level≥3 (numeric≥3); Cat B Distinction (numeric≥3); Cat C ≥3 equivalent.
    if (sixth.numeric >= 3) {
      // PolyU 6th-subject bonus = raw subject points × 1.0, NOT the weighted score.
      // (PolyU 2025 admission score method: Best 5 weighted + unweighted 6th.)
      bonus = sixth.numeric;
      breakdown.push({
        subject: sixth.subject, numeric: sixth.numeric, weight: 1,
        weighted: bonus, usedAs: 'sixth',
      });
      steps.push(`6th subject qualifies: +${bonus.toFixed(4)} (unweighted)`);
    } else {
      breakdown.push({
        subject: sixth.subject, numeric: sixth.numeric, weight: sixth.weight,
        weighted: 0, usedAs: 'unused',
      });
      steps.push(`6th subject below L3 — no bonus`);
    }
  }
  for (let i = 6; i < sorted.length; i++) {
    breakdown.push({
      subject: sorted[i].subject, numeric: sorted[i].numeric,
      weight: sorted[i].weight, weighted: sorted[i].weighted, usedAs: 'unused',
    });
  }

  const score = best5 + bonus;
  steps.push(`Best 5 = ${best5.toFixed(4)}; bonus = ${bonus.toFixed(4)}; total ${score.toFixed(4)}`);
  return { score, breakdown, steps };
}

export function runFixed(ws: WeightedSubject[], programme: Programme): FormulaResult {
  const breakdown: BreakdownEntry[] = [];
  const steps: string[] = [];
  const fixed = programme.formula.fixed ?? [];
  const electives = programme.formula.electives ?? 0;

  let score = 0;
  const usedSet = new Set<string>();
  for (const code of fixed) {
    const found = ws.find((w) => w.subject === code);
    if (found) {
      score += found.weighted;
      usedSet.add(code);
      breakdown.push({
        subject: code, numeric: found.numeric, weight: found.weight,
        weighted: found.weighted, usedAs: 'forced',
      });
    } else {
      breakdown.push({
        subject: code, numeric: 0, weight: 1, weighted: 0, usedAs: 'forced',
      });
    }
  }

  const remaining = ws.filter((w) => !usedSet.has(w.subject) && w.subject !== 'core:csd').sort((a, b) => b.weighted - a.weighted);
  for (let i = 0; i < Math.min(electives, remaining.length); i++) {
    score += remaining[i].weighted;
    breakdown.push({
      subject: remaining[i].subject, numeric: remaining[i].numeric,
      weight: remaining[i].weight, weighted: remaining[i].weighted, usedAs: 'best',
    });
  }
  for (let i = electives; i < remaining.length; i++) {
    breakdown.push({
      subject: remaining[i].subject, numeric: remaining[i].numeric,
      weight: remaining[i].weight, weighted: remaining[i].weighted, usedAs: 'unused',
    });
  }

  steps.push(`Fixed: ${fixed.join('+')}; +${electives} electives`);
  return { score, breakdown, steps };
}
