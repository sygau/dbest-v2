export type Grade = '' | 'U' | '1' | '2' | '3' | '4' | '5' | '5*' | '5**'

export const GRADE_OPTS: Grade[] = ['', 'U', '1', '2', '3', '4', '5', '5*', '5**']

const CAT_A_PTS: Record<string, number> = {
  U: 0, '1': 0, '2': 0, '3': 16, '4': 32, '5': 48, '5*': 52, '5**': 56,
}

const MATH_HALF_PTS: Record<string, number> = {
  U: 0, '1': 0, '2': 0, '3': 8, '4': 16, '5': 24, '5*': 26, '5**': 28,
}

export function calcCategoryA(grade: Grade): number {
  return grade ? (CAT_A_PTS[grade] ?? 0) : 0
}

export function calcMathHalf(grade: Grade): number {
  return grade ? (MATH_HALF_PTS[grade] ?? 0) : 0
}

export const ELECTIVE_SUBJECTS = [
  '物理 Physics',
  '化學 Chemistry',
  '生物 Biology',
  '資訊及通訊科技 ICT',
  '企業、會計與財務概論 BAFS',
  '經濟 Economics',
  '地理 Geography',
  '歷史 History',
  '中國歷史 Chinese History',
  '旅遊與款待 Tourism & Hospitality',
  '視覺藝術 Visual Arts',
  '音樂 Music',
  '體育 Physical Education',
  '設計與應用科技 DAT',
  '科技與生活 Technology and Living',
  '健康管理與社會關懷 HMSC',
  '倫理與宗教 Ethics & Religious Studies',
]

export const CAT_A_TABLE = [
  { level: '5**', ucas: 56, aLevel: 'A*' },
  { level: '5*',  ucas: 52, aLevel: 'Between A* and A' },
  { level: '5',   ucas: 48, aLevel: 'A' },
  { level: '4',   ucas: 32, aLevel: 'C' },
  { level: '3',   ucas: 16, aLevel: 'E' },
  { level: '2',   ucas: 0,  aLevel: '—' },
  { level: '1',   ucas: 0,  aLevel: '—' },
  { level: 'U',   ucas: 0,  aLevel: '—' },
]

export const MATH_TABLE = [
  { level: '5**', compulsory: 28, extended: 28, combined: 56 },
  { level: '5*',  compulsory: 26, extended: 26, combined: 52 },
  { level: '5',   compulsory: 24, extended: 24, combined: 48 },
  { level: '4',   compulsory: 16, extended: 16, combined: 32 },
  { level: '3',   compulsory: 8,  extended: 8,  combined: 16 },
  { level: '2',   compulsory: 0,  extended: 0,  combined: 0  },
]
