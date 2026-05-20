export type CalcModel = 'fx-50FH' | 'fx-50FH II' | 'fx-3650P' | 'fx-3650P II' | 'fx-3950P'
export type Subject = 'core' | 'm1' | 'm2' | 'physics' | 'chemistry' | 'biology'
export type Difficulty = 'essential' | 'common' | 'advanced'
export type CalcMode = 'COMP' | 'CMPLX' | 'REG-LIN' | 'REG-LOG' | 'REG-EXP' | 'SD' | 'BASE-N' | 'EQN'
export type TokenKind = 'cmd' | 'op' | 'var' | 'num' | 'paren' | 'prompt' | 'arrow' | 'disp' | 'sep' | 'fn'

export interface Token {
  text: string
  kind: TokenKind
}

export interface ProgrammeSetup {
  enterPrgm: string[]
  slotInstruction: string
  requiredMode?: CalcMode
  modeSetupKeys?: string[]
  notes?: string
}

export interface InputSpec {
  label: string
  labelZh?: string
  description: string
  example: string
}

export interface DisplaySpec {
  order: number
  label: string
  labelZh?: string
  meaning: string
  meaningZh?: string
}

export interface ExampleStep {
  press: string
  display: string
  note?: string
}

export interface Example {
  question: string
  questionZh?: string
  steps: ExampleStep[]
  finalNote?: string
}

export interface ProgrammeVariant {
  models: CalcModel[]
  tokens: Token[]
  bytes: number
  note: string
}

export interface ProgrammeError {
  trigger: string
  meaning: string
}

export interface ProgrammeSource {
  label: string
  url: string
}

export interface Programme {
  slug: string
  title: string
  titleZh?: string
  subjects: Subject[]
  models: CalcModel[]
  difficulty: Difficulty
  bytes: number
  description: string
  descriptionZh?: string
  formula?: string
  glyph?: string
  setup: ProgrammeSetup
  tokens: Token[]
  inputs: InputSpec[]
  displays: DisplaySpec[]
  examples: Example[]
  variants?: ProgrammeVariant[]
  errors?: ProgrammeError[]
  sources: ProgrammeSource[]
  tags?: string[]
  dseRelevance?: {
    paperHints: string[]
    topics: string[]
    notes?: string
  }
}

export const SUBJECT_META: Record<Subject, { label: string; en: string; color: string }> = {
  core: { label: '數學必修', en: 'Maths Core', color: '#549ee8' },
  m1: { label: '數學 M1', en: 'Maths M1', color: '#7c5ce7' },
  m2: { label: '數學 M2', en: 'Maths M2', color: '#d98e3f' },
  physics: { label: '物理', en: 'Physics', color: '#dc2626' },
  chemistry: { label: '化學', en: 'Chemistry', color: '#16a34a' },
  biology: { label: '生物', en: 'Biology', color: '#0d9488' },
}

export const DIFFICULTY_META: Record<Difficulty, { label: string; color: string }> = {
  essential: { label: 'Essential 必入', color: '#dc2626' },
  common: { label: 'Common 常用', color: '#549ee8' },
  advanced: { label: 'Advanced 進階', color: '#7c5ce7' },
}

export const MODEL_META: Record<CalcModel, { maxBytes: number; slots: number }> = {
  'fx-50FH':    { maxBytes: 680, slots: 4 },
  'fx-50FH II': { maxBytes: 680, slots: 4 },
  'fx-3650P':   { maxBytes: 360, slots: 4 },
  'fx-3650P II':{ maxBytes: 360, slots: 4 },
  'fx-3950P':   { maxBytes: 300, slots: 4 },
}

export const CALC_MODES: CalcModel[] = ['fx-50FH', 'fx-50FH II', 'fx-3650P', 'fx-3650P II', 'fx-3950P']

export const TOKEN_KIND_COLOR: Record<TokenKind, string> = {
  cmd:    '#549ee8',
  op:     '#94a3b8',
  var:    '#f59e0b',
  num:    '#e2e8f0',
  paren:  '#94a3b8',
  prompt: '#fbbf24',
  arrow:  '#fb923c',
  disp:   '#34d399',
  sep:    '#64748b',
  fn:     '#a78bfa',
}

export function tokensToInline(tokens: Token[]): string {
  return tokens.map((t) => t.text).join(' ')
}

export function maxBytesForModels(models: CalcModel[]): number {
  return Math.max(...models.map((m) => MODEL_META[m].maxBytes))
}
