export type ContentKind =
  | 'vocab'
  | 'idiom'
  | 'sentence-pattern'
  | 'opening'
  | 'template'
  | 'upgrade'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type DifficultyDot = 1 | 2 | 3

export interface EntryBase {
  id: string
  kind: ContentKind
  meaningZh: string
  difficulty?: DifficultyDot
  notes?: string
  audio?: { lang?: 'en-US' | 'en-GB'; word?: string }
  dictionary?: {
    provider?: 'cambridge' | 'oxford' | 'merriam-webster' | 'collins' | 'custom'
    url?: string
  }
}

export type Pos = 'noun phrase' | 'verb' | 'adjective' | 'idiom' | 'phrase' | 'noun' | 'adverb'

export interface VocabEntry extends EntryBase {
  kind: 'vocab'
  term: string
  pos: Pos
  example?: string
  exampleZh?: string
  synonyms?: string[]
  /** @deprecated use synonyms */
  collocations?: string[]
}

export const POS_META: Record<Pos, { label: string; color: string }> = {
  'noun phrase': { label: 'noun phrase', color: '#549ee8' },
  noun: { label: 'noun', color: '#ec4899' },
  verb: { label: 'verb', color: '#16a34a' },
  adjective: { label: 'adjective', color: '#d98e3f' },
  adverb: { label: 'adverb', color: '#0d9488' },
  phrase: { label: 'phrase', color: '#dc2626' },
  idiom: { label: 'idiom', color: '#a855f7' },
}

export function entrySynonyms(entry: Entry): string[] | undefined {
  if (entry.kind === 'vocab') return entry.synonyms ?? entry.collocations
  if (entry.kind === 'upgrade') return entry.synonyms
  return undefined
}

export interface IdiomEntry extends EntryBase {
  kind: 'idiom'
  idiom: string
  literalZh?: string
  example?: string
  origin?: string
}

export interface SentencePatternEntry extends EntryBase {
  kind: 'sentence-pattern'
  pattern: string
  slots?: string[]
  example?: string
}

export interface OpeningEntry extends EntryBase {
  kind: 'opening'
  snippet: string
  bestFor?: string[]
  example?: string
}

export interface TemplateEntry extends EntryBase {
  kind: 'template'
  title: string
  body: string
}

export interface UpgradeEntry extends EntryBase {
  kind: 'upgrade'
  basicTerm: string
  advancedTerm: string
  pos: Pos
  example?: string
  basicExample?: string
  synonyms?: string[]
}

export type Entry =
  | VocabEntry
  | IdiomEntry
  | SentencePatternEntry
  | OpeningEntry
  | TemplateEntry
  | UpgradeEntry

export interface SetFile {
  slug: string
  nameZh: string
  nameEn: string
  description?: string
  difficulty: Difficulty
  contentKind?: ContentKind
  thumbnail?: string
  backdrop?: string
  tags?: string[]
  entries: Entry[]
}

export interface SectionMeta {
  slug: string
  nameZh: string
  nameEn: string
  tagline?: string
  description?: string
  icon: string
  accent: string
  capsule?: string
  hero?: string
  defaultContentKind: ContentKind
  sets: string[]
}

export interface SectionWithSets {
  meta: SectionMeta
  sets: SetFile[]
}

export function entryDisplayTerm(entry: Entry): string {
  switch (entry.kind) {
    case 'vocab':
      return entry.term
    case 'idiom':
      return entry.idiom
    case 'sentence-pattern':
      return entry.pattern
    case 'opening':
      return entry.snippet
    case 'template':
      return entry.title
    case 'upgrade':
      return entry.advancedTerm
  }
}

export function entryExample(entry: Entry): string | undefined {
  if ('example' in entry) return entry.example
  return undefined
}

export function entryKindLabel(kind: ContentKind): string {
  switch (kind) {
    case 'vocab':
      return 'Vocab'
    case 'idiom':
      return 'Idiom'
    case 'sentence-pattern':
      return 'Pattern'
    case 'opening':
      return 'Snippet'
    case 'template':
      return 'Template'
    case 'upgrade':
      return 'Upgrade'
  }
}

export function buildDictionaryUrl(entry: Entry): string {
  if (entry.dictionary?.url) return entry.dictionary.url
  const headword = entry.audio?.word ?? entryDisplayTerm(entry) ?? ''
  if (!headword) return `https://dictionary.cambridge.org/dictionary/english/`
  const cleaned = headword
    .replace(/^to\s+/i, '')
    .replace(/[^a-zA-Z\s-]/g, '')
    .trim()
    .toLowerCase()
  const provider = entry.dictionary?.provider ?? 'cambridge'
  const encoded = encodeURIComponent(cleaned)
  switch (provider) {
    case 'oxford':
      return `https://www.oxfordlearnersdictionaries.com/definition/english/${encoded}`
    case 'merriam-webster':
      return `https://www.merriam-webster.com/dictionary/${encoded}`
    case 'collins':
      return `https://www.collinsdictionary.com/dictionary/english/${encoded.replace(/%20/g, '-')}`
    case 'cambridge':
    default:
      return `https://dictionary.cambridge.org/dictionary/english/${encoded}`
  }
}

export const DIFFICULTY_META: Record<Difficulty, { label: string; short: string; color: string }> = {
  easy: { label: '入門', short: '入門', color: '#16a34a' },
  medium: { label: '進階', short: '進階', color: '#549ee8' },
  hard: { label: '挑戰', short: '挑戰', color: '#dc2626' },
}
