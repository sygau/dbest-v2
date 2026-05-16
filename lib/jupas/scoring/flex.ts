// Flexible admissions per university. Per JUPAS_MECHANISM §7.
// Core rule: fail exactly 1 subject requirement by exactly 1 grade level.

import { HKU_FLEX_DEDUCTION } from './config';
import type { FlexResult, Programme, SubjectInput, Year } from './types';
import { dseRawLevel } from './grades';

interface FlexContext {
  programme: Programme;
  input: SubjectInput[];
  rawScore: number;
  rawEligible: boolean;
  ineligibilityReason?: string;
  year: Year;
}

function rawMap(input: SubjectInput[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const s of input) {
    if (s.subject.startsWith('core:') || s.subject.startsWith('ext:') || s.subject.startsWith('elec:')) {
      m[s.subject] = dseRawLevel((s as { level: import('./types').DseLevel }).level);
    }
  }
  return m;
}

// Identify the single subject that fails by exactly 1 grade. Return null if zero or >1 failures, or any failure by >1.
function findSingleNearMiss(programme: Programme, input: SubjectInput[]): { code: string; deficit: number } | null {
  const g = programme.gates;
  const raw = rawMap(input);
  const misses: { code: string; deficit: number }[] = [];

  if (g.minChi != null) {
    const lvl = raw['core:chi'] ?? 0;
    if (lvl < g.minChi) misses.push({ code: 'core:chi', deficit: g.minChi - lvl });
  }
  if (g.minEng != null) {
    const lvl = raw['core:eng'] ?? 0;
    if (lvl < g.minEng) misses.push({ code: 'core:eng', deficit: g.minEng - lvl });
  }
  if (g.minMath != null) {
    const lvl = raw['core:math'] ?? 0;
    if (lvl < g.minMath) misses.push({ code: 'core:math', deficit: g.minMath - lvl });
  }
  // Elective slot misses.
  if (g.minElec1 != null || g.minElec2 != null) {
    const lvls: number[] = [];
    for (const k in raw) if (k.startsWith('elec:') || k.startsWith('ext:')) lvls.push(raw[k]);
    lvls.sort((a, b) => b - a);
    if (g.minElec1 != null && (lvls[0] ?? 0) < g.minElec1) misses.push({ code: 'elec:1st', deficit: g.minElec1 - (lvls[0] ?? 0) });
    if (g.minElec2 != null && (lvls[1] ?? 0) < g.minElec2) misses.push({ code: 'elec:2nd', deficit: g.minElec2 - (lvls[1] ?? 0) });
  }
  if (misses.length !== 1) return null;
  if (misses[0].deficit !== 1) return null;
  return misses[0];
}

function notFlexible(reason: string): FlexResult {
  return { eligible: false, adjustedScore: null, rule: null, reason };
}

export function checkFlex(ctx: FlexContext): FlexResult | undefined {
  const { programme, input, rawScore, rawEligible, year } = ctx;

  if (rawEligible) return undefined; // Flex only matters for the ineligible.

  const miss = findSingleNearMiss(programme, input);
  if (!miss) return notFlexible('not a single-subject 1-grade miss');

  const failedRaw = rawMap(input)[miss.code] ?? 0;
  // Universal: failed subject must be ≥ Level 2 (cannot flex from L1/L0).
  if (miss.code.startsWith('core:') || miss.code.startsWith('elec:') || miss.code.startsWith('ext:')) {
    if (failedRaw < 2) return notFlexible('failed subject below L2');
  }

  switch (programme.uni) {
    case 'HKU': {
      // Math excluded from flex.
      if (miss.code === 'core:math') return notFlexible('HKU does not flex on Math');
      const adjusted = rawScore * HKU_FLEX_DEDUCTION;
      return { eligible: true, adjustedScore: adjusted, rule: 'hku-10pct', failedSubject: miss.code };
    }
    case 'CUHK': {
      // Heuristic: score ≥ programme UQ.
      const uq = programme.cutoffs[String(year) as '2025'].uq;
      if (uq == null) return notFlexible('CUHK flex needs UQ data');
      if (rawScore >= uq) {
        return { eligible: true, adjustedScore: rawScore, rule: 'cuhk-uq', failedSubject: miss.code };
      }
      return notFlexible('CUHK flex requires score ≥ UQ');
    }
    case 'POLYU': {
      const t = programme.flexThreshold;
      if (t == null) return notFlexible('PolyU flex threshold data pending');
      if (rawScore >= t) {
        return { eligible: true, adjustedScore: rawScore, rule: 'polyu-threshold', failedSubject: miss.code };
      }
      return notFlexible(`PolyU flex requires score ≥ ${t}`);
    }
    case 'CITYU': {
      const t = programme.flexThreshold;
      if (t == null) return notFlexible('CityU flex threshold data pending');
      if (rawScore >= t) {
        return { eligible: true, adjustedScore: rawScore, rule: 'cityu-threshold', failedSubject: miss.code };
      }
      return notFlexible(`CityU flex requires score ≥ ${t}`);
    }
    case 'HKBU':
    case 'EDUHK':
    case 'LINGU':
    case 'HKMU':
    case 'HKUST':
      return notFlexible('HKUST flex policy not standardized');
  }
}
