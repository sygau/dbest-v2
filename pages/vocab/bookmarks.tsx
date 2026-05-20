import { useMemo } from 'react'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { LuChevronLeft } from 'react-icons/lu'
import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import SetCapsule from '../../components/vocab/SetCapsule'
import EntryCard from '../../components/vocab/EntryCard'
import { setKey, useBookmarks } from '../../components/vocab/useBookmarks'
import { getHomeShelfData } from '../../lib/vocab.server'
import type { Entry, SectionMeta, SetFile } from '../../lib/vocab'

interface Props {
  setLookup: Record<string, { section: SectionMeta; set: SetFile }>
  entryLookup: Record<string, { section: SectionMeta; set: SetFile; entry: Entry }>
}

export default function BookmarksPage({ setLookup, entryLookup }: Props) {
  const { sets, entries, hasEntry, toggleEntry } = useBookmarks()

  const setItems = useMemo(
    () => sets.map((k) => setLookup[k]).filter((x): x is { section: SectionMeta; set: SetFile } => Boolean(x)),
    [sets, setLookup],
  )

  const entryItems = useMemo(
    () =>
      entries
        .map((id) => entryLookup[id])
        .filter((x): x is { section: SectionMeta; set: SetFile; entry: Entry } => Boolean(x)),
    [entries, entryLookup],
  )

  const grouped = useMemo(() => {
    const map: Record<string, { section: SectionMeta; set: SetFile; entries: Entry[] }> = {}
    for (const it of entryItems) {
      const k = setKey(it.section.slug, it.set.slug)
      if (!map[k]) map[k] = { section: it.section, set: it.set, entries: [] }
      map[k].entries.push(it.entry)
    }
    return Object.values(map)
  }, [entryItems])

  return (
    <>
      <PageSEO
        title="書籤 Bookmarks | DSE 詞彙庫 | dse.best"
        description="儲存咗嘅 sets 同詞彙。"
        canonical="https://dse.best/vocab/bookmarks"
        robots="noindex, nofollow"
      />

      <PageBreadcrumb section="詞彙庫" text="書籤" />

      <div className="vbm">
        <Link href="/vocab" className="vbm__back">
          <LuChevronLeft size={16} /> 詞彙庫
        </Link>
        <h1>我的書籤</h1>
        <div className="vbm__sub">Bookmarks</div>

        <section className="vbm__section">
          <h2>Sets ({setItems.length})</h2>
          {setItems.length === 0 ? (
            <div className="vbm__empty">未有書籤嘅 set。</div>
          ) : (
            <div className="vbm__grid">
              {setItems.map(({ section, set }) => (
                <SetCapsule key={`${section.slug}/${set.slug}`} section={section} set={set} />
              ))}
            </div>
          )}
        </section>

        <section className="vbm__section">
          <h2>詞彙 Entries ({entryItems.length})</h2>
          {entryItems.length === 0 ? (
            <div className="vbm__empty">未有書籤嘅 entry。</div>
          ) : (
            grouped.map(({ section, set, entries: es }) => (
              <div key={`${section.slug}/${set.slug}`} className="vbm__group">
                <div className="vbm__group-head">
                  <Link href={`/vocab/${section.slug}/${set.slug}`}>
                    {section.nameZh} · {set.nameZh}
                  </Link>
                  <span>{es.length}</span>
                </div>
                <div className="vbm__cards">
                  {es.map((e) => (
                    <EntryCard
                      key={e.id}
                      entry={e}
                      bookmarked={hasEntry(e.id)}
                      onToggleBookmark={() => toggleEntry(e.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { sections, setsBySection } = getHomeShelfData()
  const setLookup: Record<string, { section: SectionMeta; set: SetFile }> = {}
  const entryLookup: Record<string, { section: SectionMeta; set: SetFile; entry: Entry }> = {}
  for (const section of sections) {
    for (const set of setsBySection[section.slug] ?? []) {
      setLookup[`${section.slug}/${set.slug}`] = { section, set }
      for (const e of set.entries) {
        entryLookup[e.id] = { section, set, entry: e }
      }
    }
  }
  return { props: { setLookup, entryLookup } }
}
