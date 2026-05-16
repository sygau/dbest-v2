// Orchestrator. scoreOne(programme, profile) → ProgrammeResult; scoreAll runs across bundle.

import { classify } from './chance';
import { DEFAULT_YEAR, ENGINE_VERSION, STRIPPED_PROGRAMME_FIELDS } from './config';
import { runBestN, runFixed, runHkust, runPolyu } from './formulas';
import { checkFlex } from './flex';
import { convertSubjects } from './grades';
import { checkGates } from './gates';
import { getMaxScore, getProgrammes } from './programmes';
import { runSpecial } from './special';
import type { CalculateResponse, Programme, ProgrammeResult, PublicProgramme, StudentProfile, Year } from './types';
import { applyWeights } from './weights';

// Strip scoring-rule fields before sending. Done once per scoreOne result.
function toPublic(p: Programme): PublicProgramme {
  const out: Record<string, unknown> = {};
  for (const k in p) {
    if ((STRIPPED_PROGRAMME_FIELDS as readonly string[]).includes(k)) continue;
    out[k] = (p as unknown as Record<string, unknown>)[k];
  }
  out.formulaLabel = formulaLabel(p);
  return out as PublicProgramme;
}

function formulaLabel(p: Programme): string {
  if (p.special) return 'Special';
  switch (p.formula.type) {
    case 'hkust': return 'HKUST capped (Best 5 + 6th bonus)';
    case 'polyu': return 'PolyU (Best 5 + 6th if ≥L3)';
    case 'fixed': return `Fixed: ${(p.formula.fixed ?? []).join('+')} + ${p.formula.electives ?? 0} electives`;
    case 'bestN':
    default: {
      const n = p.formula.n ?? 5;
      if (p.hku.sixthMultiplier != null && p.hku.sixthMultiplier < 1) {
        return `Best ${n - 1} + ${n}th × ${p.hku.sixthMultiplier}`;
      }
      return `Best ${n}`;
    }
  }
}

export function scoreOne(programme: Programme, profile: StudentProfile, maxScore: number): ProgrammeResult {
  const year = (profile.options?.year ?? DEFAULT_YEAR) as Year;
  const wantBreakdown = profile.options?.breakdown === true;
  const wantFlex = profile.options?.flex !== false;

  // 1. Gates.
  const gate = checkGates(programme, profile.subjects);
  if (!gate.pass) {
    const flex = wantFlex ? checkFlex({
      programme, input: profile.subjects, rawScore: 0, rawEligible: false,
      ineligibilityReason: gate.reason, year,
    }) : undefined;

    // If flex eligible, recompute the score (gate would have failed by 1 grade but we still score).
    let flexScore: number | null = null;
    if (flex?.eligible) {
      const r = computeScore(programme, profile);
      flexScore = round2(flex.adjustedScore ?? r.score);
    }
    const c = classify(programme, flexScore, !!flex?.eligible, year);
    return {
      programme: toPublic(programme), eligible: false, ineligibilityReason: gate.reason,
      score: flexScore, maxScore,
      scoreDelta: deltaVs2025Median(flexScore, programme),
      tier: c.tier, tierKey: c.tierKey,
      yearUsed: c.yearUsed, scaleNote: c.scaleNote,
      flex,
    };
  }

  // 2. Score. Round to 2 dp to kill float-addition artifacts (e.g. 280.50000001).
  const computed = computeScore(programme, profile);
  const score = round2(computed.score) as number;
  const { breakdown, steps } = computed;

  // 3. Classify.
  const c = classify(programme, score, true, year);

  return {
    programme: toPublic(programme), eligible: true, score, maxScore,
    scoreDelta: deltaVs2025Median(score, programme),
    tier: c.tier, tierKey: c.tierKey, yearUsed: c.yearUsed, scaleNote: c.scaleNote,
    breakdown: wantBreakdown ? { weightedScores: breakdown, formulaSteps: steps } : undefined,
  };
}

function round2(n: number | null): number | null {
  return n == null ? null : +n.toFixed(2);
}

function deltaVs2025Median(score: number | null, programme: Programme): number | null {
  if (score == null) return null;
  const med = programme.cutoffs['2025']?.median;
  if (med == null) return null;
  return +(score - med).toFixed(2);
}

function computeScore(programme: Programme, profile: StudentProfile) {
  const scores = convertSubjects(profile.subjects, programme);

  if (programme.special) {
    const sp = runSpecial(programme.special, scores, programme);
    if (sp) return { score: sp.score, breakdown: sp.breakdown, steps: sp.steps };
  }

  const ws = applyWeights(scores, programme);

  switch (programme.formula.type) {
    case 'hkust':
      return runHkust(ws, programme);
    case 'polyu':
      return runPolyu(ws);
    case 'fixed':
      return runFixed(ws, programme);
    case 'bestN':
    default:
      return runBestN(ws, programme);
  }
}

export function scoreAll(profile: StudentProfile): CalculateResponse {
  const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const programmes = getProgrammes();
  const includeIneligible = profile.options?.includeIneligible !== false;

  const results: ProgrammeResult[] = [];
  let eligibleCount = 0;

  for (let i = 0; i < programmes.length; i++) {
    const r = scoreOne(programmes[i], profile, getMaxScore(i));
    if (r.eligible) eligibleCount++;
    if (!r.eligible && !includeIneligible && !r.flex?.eligible) continue;
    results.push(r);
  }

  // Sort: eligible first by score desc, then flex-eligible, then ineligible.
  const tierRank: Record<string, number> = { highchance: 0, comp: 1, bord: 2, low: 3, unmet: 4 };
  results.sort((a, b) => {
    const ar = tierRank[a.tierKey] ?? 99;
    const br = tierRank[b.tierKey] ?? 99;
    if (ar !== br) return ar - br;
    return (b.score ?? -Infinity) - (a.score ?? -Infinity);
  });

  const t1 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

  return {
    count: results.length,
    eligibleCount,
    yearUsed: (profile.options?.year ?? DEFAULT_YEAR) as Year,
    results,
    meta: { runtimeMs: +(t1 - t0).toFixed(3), version: ENGINE_VERSION },
  };
}
