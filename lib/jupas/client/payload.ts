// Build StudentProfile payload from form state, validate, and hash for cache keys.
// Pure client logic; no engine imports.

import { GRADE_NUMERIC, gradeToApiLevel, lookupElective } from './subjectMap';
import type { GradeStr } from './subjectMap';

export interface ElectiveSlot { id: string; subject: string; grade: GradeStr }

export interface FormState {
  chi: GradeStr;
  eng: GradeStr;
  math: GradeStr;
  csd: 'attained' | 'notAttained';
  electives: ElectiveSlot[];
  year: 2023 | 2024 | 2025;
}

export interface ApiSubject {
  subject: string;
  level: number | string;
  language?: string;
}

export interface BuiltProfile {
  subjects: ApiSubject[];
  options: {
    year: 2023 | 2024 | 2025;
    includeIneligible: true;
    flex: true;
    breakdown: false;
  };
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

export function validateForm(f: FormState): ValidationResult {
  const errors: string[] = [];

  // Cores must be filled.
  if (!f.chi) errors.push('請填寫中文語文成績');
  if (!f.eng) errors.push('請填寫英文語文成績');
  if (!f.math) errors.push('請填寫數學成績');

  // U on any core OR any filled elective → reject (engine would still run, but UI blocks early).
  const allGrades: { name: string; g: GradeStr }[] = [
    { name: '中文', g: f.chi }, { name: '英文', g: f.eng }, { name: '數學', g: f.math },
  ];
  for (const e of f.electives) {
    if (e.subject && e.grade) allGrades.push({ name: e.subject, g: e.grade });
  }
  for (const { name, g } of allGrades) {
    if (g === 'U') errors.push(`${name} 評為 U，無法計算`);
  }

  // Partial or empty slots must not exist — user should fill or remove them.
  for (const e of f.electives) {
    if (!e.subject && !e.grade) errors.push('有空白選修科目行，請填寫或移除');
    else if (e.subject && !e.grade) errors.push(`「${e.subject}」未選成績等級`);
    else if (!e.subject && e.grade) errors.push('有選修科目未選擇科目名稱');
  }

  // Need ≥2 fully-filled electives.
  const filled = f.electives.filter(e => e.subject && e.grade);
  if (filled.length < 2) errors.push('請選擇至少兩科選修科目');

  // No duplicate elective subjects.
  const seen = new Set<string>();
  for (const e of filled) {
    if (seen.has(e.subject)) {
      errors.push(`選修科目「${e.subject}」重複`);
      break;
    }
    seen.add(e.subject);
  }

  // Pre-flight floor: numeric best-5 sum < 10 → reject.
  if (errors.length === 0) {
    const nums = [
      GRADE_NUMERIC[f.chi as Exclude<GradeStr, ''>],
      GRADE_NUMERIC[f.eng as Exclude<GradeStr, ''>],
      GRADE_NUMERIC[f.math as Exclude<GradeStr, ''>],
      ...filled.map(e => GRADE_NUMERIC[e.grade as Exclude<GradeStr, ''>]),
    ].filter(n => typeof n === 'number');
    nums.sort((a, b) => b - a);
    const best5 = nums.slice(0, 5).reduce((a, b) => a + b, 0);
    if (best5 < 10) {
      errors.push('預估 Best 5 總分過低，未達基本入學門檻');
    }
  }

  return { ok: errors.length === 0, errors };
}

export function buildPayload(f: FormState): BuiltProfile {
  const subjects: ApiSubject[] = [];

  const chiLvl = gradeToApiLevel(f.chi);
  if (chiLvl != null) subjects.push({ subject: 'core:chi', level: chiLvl });
  const engLvl = gradeToApiLevel(f.eng);
  if (engLvl != null) subjects.push({ subject: 'core:eng', level: engLvl });
  const mathLvl = gradeToApiLevel(f.math);
  if (mathLvl != null) subjects.push({ subject: 'core:math', level: mathLvl });

  // CSD: attained → level 1, notAttained → level 0.
  subjects.push({ subject: 'core:csd', level: f.csd === 'attained' ? 1 : 0 });

  for (const e of f.electives) {
    if (!e.subject || !e.grade) continue;
    const map = lookupElective(e.subject);
    if (!map) continue;
    const lvl = gradeToApiLevel(e.grade);
    if (lvl == null) continue;
    if (map.isCatC) {
      // Cat C uses string level; pass numeric DSE level as string for V1.
      subjects.push({ subject: map.code, level: String(lvl), language: map.language });
    } else {
      subjects.push({ subject: map.code, level: lvl });
    }
  }

  return {
    subjects,
    options: { year: f.year, includeIneligible: true, flex: true, breakdown: false },
  };
}

// Stable djb2 hash → 8-char base36 string. Used for cache keys.
export function hashProfile(p: BuiltProfile): string {
  const normalized = {
    subjects: [...p.subjects].sort((a, b) => a.subject.localeCompare(b.subject)),
    options: p.options,
  };
  const s = JSON.stringify(normalized);
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).padStart(8, '0').slice(0, 8);
}

// Stable form hash for "did anything change?" check.
export function hashForm(f: FormState): string {
  return hashProfile(buildPayload(f));
}
