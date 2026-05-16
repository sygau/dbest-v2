// Eligibility gates. Per JSON_SCHEMA §Gates + JUPAS_MECHANISM §4.
// Run BEFORE scoring. Any failure → ineligible.

import type { Programme, SubjectInput } from './types';
import { dseRawLevel } from './grades';

export interface GateResult {
  pass: boolean;
  reason?: string;
}

interface RawMap {
  // subjectCode → raw DSE level (5*=6, 5**=7).
  // catB stored as 4/3/0; catC by numeric proxy.
  [code: string]: number;
}

function buildRawMap(input: SubjectInput[]): RawMap {
  const m: RawMap = {};
  for (const s of input) {
    if (s.subject.startsWith('core:') || s.subject.startsWith('ext:') || s.subject.startsWith('elec:')) {
      m[s.subject] = dseRawLevel((s as { level: import('./types').DseLevel }).level);
    } else if (s.subject.startsWith('catB:')) {
      const lvl = (s as { level: 'attained' | 'dist1' | 'dist2' }).level;
      m[s.subject] = lvl === 'dist2' ? 4 : lvl === 'dist1' ? 3 : 0;
    } else if (s.subject.startsWith('catC:')) {
      // Conservative gate proxy — Cat C does not satisfy core/elec gates anyway.
      m[s.subject] = 5;
    }
  }
  return m;
}

export function checkGates(programme: Programme, input: SubjectInput[]): GateResult {
  const g = programme.gates;
  const raw = buildRawMap(input);

  // 1. CSD universal — must be Attained (level ≥ 1).
  if ((raw['core:csd'] ?? 0) < 1) {
    return { pass: false, reason: 'CSD not Attained' };
  }

  // 2. Core minimums.
  if (g.minChi != null && (raw['core:chi'] ?? 0) < g.minChi) {
    return { pass: false, reason: `Chinese below L${g.minChi}` };
  }
  if (g.minEng != null && (raw['core:eng'] ?? 0) < g.minEng) {
    return { pass: false, reason: `English below L${g.minEng}` };
  }
  if (g.minMath != null && (raw['core:math'] ?? 0) < g.minMath) {
    return { pass: false, reason: `Math below L${g.minMath}` };
  }

  // 3. mustInclude — AND across array.
  for (const code of g.mustInclude) {
    if (!(code in raw)) {
      return { pass: false, reason: `Missing required subject ${code}` };
    }
  }

  // 4. minElec1 / minElec2 — slot-position semantics.
  // Interpret as: at least 1 elective at ≥ minElec1, at least 2 electives at ≥ minElec2.
  if (g.minElec1 != null || g.minElec2 != null) {
    const electiveLevels: number[] = [];
    for (const k in raw) {
      if (k.startsWith('elec:') || k.startsWith('ext:')) electiveLevels.push(raw[k]);
    }
    electiveLevels.sort((a, b) => b - a);
    if (g.minElec1 != null && (electiveLevels[0] ?? 0) < g.minElec1) {
      return { pass: false, reason: `1st elective below L${g.minElec1}` };
    }
    if (g.minElec2 != null && (electiveLevels[1] ?? 0) < g.minElec2) {
      return { pass: false, reason: `2nd elective below L${g.minElec2}` };
    }
  }

  // 5. requireAny groups — each group must have ≥pick subjects at ≥minLevel.
  for (const grp of g.requireAny) {
    let count = 0;
    for (const code of grp.pool) {
      if ((raw[code] ?? 0) >= grp.minLevel) count++;
    }
    if (count < grp.pick) {
      return { pass: false, reason: `Need ${grp.pick} of ${grp.pool.join('/')} at L${grp.minLevel}` };
    }
  }

  return { pass: true };
}
