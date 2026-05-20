import fs from 'fs'
import path from 'path'
import type { SectionMeta, SectionWithSets, SetFile } from './vocab'

const VOCAB_ROOT = path.join(process.cwd(), 'data', 'vocab')

function readJson<T>(p: string): T {
  const raw = fs.readFileSync(p, 'utf8')
  return JSON.parse(raw) as T
}

function readRegistry(): { sections: string[] } {
  return readJson<{ sections: string[] }>(path.join(VOCAB_ROOT, 'sections.json'))
}

function readSectionMeta(slug: string): SectionMeta {
  return readJson<SectionMeta>(path.join(VOCAB_ROOT, slug, 'index.json'))
}

function readSetFile(sectionSlug: string, setSlug: string): SetFile {
  return readJson<SetFile>(path.join(VOCAB_ROOT, sectionSlug, `${setSlug}.json`))
}

export function getAllSections(): SectionMeta[] {
  const reg = readRegistry()
  return reg.sections.map((slug) => readSectionMeta(slug))
}

export function getSection(slug: string): SectionWithSets {
  const meta = readSectionMeta(slug)
  const sets = meta.sets.map((setSlug) => readSetFile(slug, setSlug))
  return { meta, sets }
}

export function getSet(
  sectionSlug: string,
  setSlug: string,
): { section: SectionMeta; set: SetFile } {
  const section = readSectionMeta(sectionSlug)
  const set = readSetFile(sectionSlug, setSlug)
  return { section, set }
}

export function getAllSetPaths(): { params: { section: string; set: string } }[] {
  const reg = readRegistry()
  const out: { params: { section: string; set: string } }[] = []
  for (const sectionSlug of reg.sections) {
    const meta = readSectionMeta(sectionSlug)
    for (const setSlug of meta.sets) {
      out.push({ params: { section: sectionSlug, set: setSlug } })
    }
  }
  return out
}

export function getAllSectionPaths(): { params: { section: string } }[] {
  const reg = readRegistry()
  return reg.sections.map((section) => ({ params: { section } }))
}

export function getHomeShelfData(): {
  sections: SectionMeta[]
  setsBySection: Record<string, SetFile[]>
  setLookup: Record<string, { section: SectionMeta; set: SetFile }>
} {
  const sections = getAllSections()
  const setsBySection: Record<string, SetFile[]> = {}
  const setLookup: Record<string, { section: SectionMeta; set: SetFile }> = {}
  for (const s of sections) {
    const list = s.sets.map((slug) => readSetFile(s.slug, slug))
    setsBySection[s.slug] = list
    for (const set of list) {
      setLookup[`${s.slug}/${set.slug}`] = { section: s, set }
    }
  }
  return { sections, setsBySection, setLookup }
}
