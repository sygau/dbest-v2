// Grade-to-numeric conversion. Per JUPAS_MECHANISM §1 + JSON_SCHEMA Grade Conversion Tables.

import { CUHK_STANDARD_SCALE_IDS } from './config';
import type { CatBLevel, DseLevel, Programme, SubjectInput, SubjectScore } from './types';

const ENHANCED: Record<string, number> = {
  '5**': 8.5, '5*': 7, '5': 5.5, '4': 4, '3': 3, '2': 2, '1': 1, '0': 0, U: 0,
};
const STANDARD: Record<string, number> = {
  '5**': 7, '5*': 6, '5': 5, '4': 4, '3': 3, '2': 2, '1': 1, '0': 0, U: 0,
};

// Raw DSE level for gate checks: 5*=6, 5**=7, else numeric.
const RAW_LEVEL: Record<string, number> = {
  '5**': 7, '5*': 6, '5': 5, '4': 4, '3': 3, '2': 2, '1': 1, '0': 0, U: 0,
};

const CAT_B: Record<CatBLevel, number> = {
  attained: 0,   // not counted
  dist1: 3,
  dist2: 4,
};

// Cat C universal — keys: language code + level string (case-insensitive).
// Languages match the names used in programmes.json weight keys (catC:japanese, etc.).
const CAT_C: Record<string, number> = {
  'japanese:N1': 7, 'japanese:N2': 5.5, 'japanese:N3': 4,
  'korean:6': 7, 'korean:5': 5.5, 'korean:4': 4, 'korean:3': 3,
  'french:C2': 7, 'french:C1': 5.5, 'french:B2': 4, 'french:B1': 3, 'french:A2': 3,
  'german:C2': 7, 'german:C1': 5.5, 'german:B2': 4, 'german:B1': 3, 'german:A2': 3,
  'spanish:C2': 7, 'spanish:C1': 5.5, 'spanish:B2': 4, 'spanish:B1': 3, 'spanish:A2': 3,
  'urdu:A++': 7, 'urdu:A+': 7, 'urdu:A': 7,
  'urdu:B++': 5.5, 'urdu:B+': 5.5,
  'urdu:B': 4,
  'urdu:C': 3, 'urdu:D': 3, 'urdu:E': 3,
};

export function isEnhancedScale(programme: Programme): boolean {
  const { uni, id } = programme;
  if (uni === 'CUHK') return !CUHK_STANDARD_SCALE_IDS.has(id);
  return uni === 'HKU' || uni === 'HKUST' || uni === 'CITYU' || uni === 'POLYU';
}

function toKey(level: DseLevel): string {
  return String(level);
}

export function dseToNumeric(level: DseLevel, enhanced: boolean): number {
  const k = toKey(level);
  return (enhanced ? ENHANCED : STANDARD)[k] ?? 0;
}

export function dseRawLevel(level: DseLevel): number {
  return RAW_LEVEL[toKey(level)] ?? 0;
}

export function catBNumeric(level: CatBLevel): number {
  return CAT_B[level] ?? 0;
}

export function catCNumeric(language: string, level: string): number {
  return CAT_C[`${language}:${level}`] ?? 0;
}

// Convert input subjects → SubjectScore[] for a given programme's scale.
// Drops Cat B/C if programme excludes them. CSD always normalised but score=0.
export function convertSubjects(input: SubjectInput[], programme: Programme): SubjectScore[] {
  const enhanced = isEnhancedScale(programme);
  const out: SubjectScore[] = [];

  for (const s of input) {
    if (s.subject.startsWith('core:') || s.subject.startsWith('ext:') || s.subject.startsWith('elec:')) {
      const lvl = (s as { level: DseLevel }).level;
      const raw = dseRawLevel(lvl);
      // CSD scores zero — universal gate, no point contribution.
      const numeric = s.subject === 'core:csd' ? 0 : dseToNumeric(lvl, enhanced);
      out.push({ subject: s.subject, rawLevel: raw, numeric, cat: 'A' });
    } else if (s.subject.startsWith('catB:')) {
      if (programme.gates.excludeCatB) continue;
      const lvl = (s as { level: CatBLevel }).level;
      // Raw level: dist2≈L4, dist1≈L3 for gate parity.
      const raw = lvl === 'dist2' ? 4 : lvl === 'dist1' ? 3 : 0;
      out.push({ subject: s.subject, rawLevel: raw, numeric: catBNumeric(lvl), cat: 'B' });
    } else if (s.subject.startsWith('catC:')) {
      if (programme.gates.excludeCatC) continue;
      const cs = s as { subject: `catC:${string}`; language: string; level: string };
      const numeric = catCNumeric(cs.language, cs.level);
      // Raw level proxy from numeric: 7→L5*, 5.5→L5, 4→L4, 3→L3.
      const raw = numeric >= 7 ? 6 : numeric >= 5.5 ? 5 : numeric >= 4 ? 4 : numeric >= 3 ? 3 : 0;
      out.push({ subject: s.subject, rawLevel: raw, numeric, cat: 'C' });
    }
  }

  return out;
}
