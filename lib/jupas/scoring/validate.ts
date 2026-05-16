// Hand-rolled request validator. No external deps to keep worker bundle small.

import { DEFAULT_YEAR } from './config';
import type { StudentProfile, SubjectInput } from './types';

const VALID_DSE_LEVELS = new Set([0, 1, 2, 3, 4, 5, '5*', '5**']);
const VALID_CATB = new Set(['attained', 'dist1', 'dist2']);
const VALID_LANGS = new Set(['japanese', 'korean', 'french', 'german', 'spanish', 'urdu']);
const VALID_YEARS = new Set([2023, 2024, 2025]);

export interface ValidationOk { ok: true; profile: StudentProfile; }
export interface ValidationFail { ok: false; error: string; }
export type ValidationResult = ValidationOk | ValidationFail;

export function validateProfile(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') return { ok: false, error: 'body must be a JSON object' };
  const b = body as Record<string, unknown>;

  if (!Array.isArray(b.subjects)) return { ok: false, error: 'subjects must be an array' };
  if (b.subjects.length === 0) return { ok: false, error: 'subjects cannot be empty' };
  if (b.subjects.length > 30) return { ok: false, error: 'too many subjects' };

  const subjects: SubjectInput[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < b.subjects.length; i++) {
    const s = b.subjects[i] as Record<string, unknown>;
    if (!s || typeof s !== 'object') return { ok: false, error: `subjects[${i}] not object` };
    const subject = s.subject;
    if (typeof subject !== 'string') return { ok: false, error: `subjects[${i}].subject missing` };
    if (seen.has(subject)) return { ok: false, error: `duplicate subject ${subject}` };
    seen.add(subject);

    if (subject.startsWith('core:') || subject.startsWith('ext:') || subject.startsWith('elec:')) {
      const lvl = s.level;
      if (!VALID_DSE_LEVELS.has(lvl as never)) return { ok: false, error: `subjects[${i}] invalid level` };
      subjects.push({ subject, level: lvl } as SubjectInput);
    } else if (subject.startsWith('catB:')) {
      if (!VALID_CATB.has(s.level as string)) return { ok: false, error: `subjects[${i}] invalid catB level` };
      subjects.push({ subject, level: s.level } as SubjectInput);
    } else if (subject.startsWith('catC:')) {
      const lang = s.language;
      const lvl = s.level;
      if (typeof lang !== 'string' || !VALID_LANGS.has(lang)) return { ok: false, error: `subjects[${i}] invalid catC language` };
      if (typeof lvl !== 'string') return { ok: false, error: `subjects[${i}] catC level must be string` };
      subjects.push({ subject, language: lang, level: lvl } as SubjectInput);
    } else {
      return { ok: false, error: `subjects[${i}] unknown subject prefix` };
    }
  }

  const opts = (b.options ?? {}) as Record<string, unknown>;
  const year = opts.year;
  if (year != null && !VALID_YEARS.has(year as number)) return { ok: false, error: 'invalid year' };

  return {
    ok: true,
    profile: {
      subjects,
      options: {
        year: (year as 2023 | 2024 | 2025 | undefined) ?? DEFAULT_YEAR,
        includeIneligible: opts.includeIneligible !== false,
        flex: opts.flex !== false,
        breakdown: opts.breakdown === true,
      },
    },
  };
}
