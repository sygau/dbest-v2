// Frontend-only mapping from Chinese display labels (used in selectors) to
// API subject codes accepted by /api/jupas/calculate. NEVER imports from
// lib/jupas/scoring/* — engine internals stay server-side.

export type GradeStr = '' | 'U' | '1' | '2' | '3' | '4' | '5' | '5*' | '5**';

export const GRADES: Exclude<GradeStr, ''>[] = ['U', '1', '2', '3', '4', '5', '5*', '5**'];

// Numeric value table for client-side pre-flight rejection (best-5 floor check).
// Mirrors the simple numeric scale: 5**=7, 5*=6, 5=5, ..., U=0.
export const GRADE_NUMERIC: Record<Exclude<GradeStr, ''>, number> = {
  'U': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '5*': 6, '5**': 7,
};

// Convert grade string to API level: 'U' -> 0, '1'..'5' -> number, '5*'/'5**' pass through.
export function gradeToApiLevel(g: GradeStr): 0 | 1 | 2 | 3 | 4 | 5 | '5*' | '5**' | null {
  if (!g) return null;
  if (g === 'U') return 0;
  if (g === '5*' || g === '5**') return g;
  const n = parseInt(g, 10);
  return n as 1 | 2 | 3 | 4 | 5;
}

// Display label -> API subject code. Keep keys identical to ELECTIVE_SUBJECTS in components/jupas/parts.
// Subjects with trailing whitespace/emojis are matched via .trim() at runtime.
type ElecMapEntry = { code: string; isCatC?: boolean; language?: string };

const NORMALIZE = (s: string) => s.replace(/\s+/g, '').replace(/[️]/g, '');

const ELEC_TABLE: Record<string, ElecMapEntry> = {
  '生物': { code: 'elec:bio' },
  '化學': { code: 'elec:chem' },
  '物理': { code: 'elec:phys' },
  '經濟': { code: 'elec:econ' },
  '地理': { code: 'elec:geog' },
  '歷史': { code: 'elec:hist' },
  '中國歷史': { code: 'elec:chin_hist' },
  '中國文學': { code: 'elec:chin_lit' },
  '英國文學': { code: 'elec:eng_lit' },
  '視覺藝術': { code: 'elec:va' },
  '音樂': { code: 'elec:music' },
  '體育': { code: 'elec:pe' },
  '資訊及通訊科技': { code: 'elec:ict' },
  '旅遊與款待': { code: 'elec:tourism' },
  '企業、會計及財務概論': { code: 'elec:bafs' },
  '設計與應用科技': { code: 'elec:dat' },
  '健康管理與社會關懷': { code: 'elec:hm_sc' },
  '倫理與宗教': { code: 'elec:ethics_religion' },
  '科技與生活': { code: 'elec:tech_living' },
  '數延1/M1': { code: 'ext:M1' },
  '數延2/M2': { code: 'ext:M2' },
  '法語🇫🇷': { code: 'catC:french', isCatC: true, language: 'french' },
  '德語🇩🇪': { code: 'catC:german', isCatC: true, language: 'german' },
  '日語🇯🇵': { code: 'catC:japanese', isCatC: true, language: 'japanese' },
  '韓語🇰🇷': { code: 'catC:korean', isCatC: true, language: 'korean' },
  '西班牙語🇪🇸': { code: 'catC:spanish', isCatC: true, language: 'spanish' },
  '烏爾都語🇵🇰': { code: 'catC:urdu', isCatC: true, language: 'urdu' },
};

export const ELECTIVE_SUBJECTS = [
  '生物', '化學', '物理', '經濟', '地理', '歷史', '中國歷史', '中國文學', '英國文學',
  '視覺藝術', '音樂', '體育', '資訊及通訊科技', '旅遊與款待', '企業、會計及財務概論',
  '設計與應用科技', '健康管理與社會關懷', '倫理與宗教', '科技與生活',
  '數延1 / M1', '數延2 / M2',
  '法語 🇫🇷', '德語 🇩🇪', '日語 🇯🇵', '韓語 🇰🇷', '西班牙語 🇪🇸', '烏爾都語 🇵🇰',
];

export function lookupElective(label: string): ElecMapEntry | null {
  return ELEC_TABLE[NORMALIZE(label)] ?? null;
}

// Subjects shown in the elective dropdown that are M1/M2 (treated specially)
export function isExtSubject(label: string): boolean {
  const c = lookupElective(label)?.code;
  return c === 'ext:M1' || c === 'ext:M2';
}

export function isCatC(label: string): boolean {
  return !!lookupElective(label)?.isCatC;
}
