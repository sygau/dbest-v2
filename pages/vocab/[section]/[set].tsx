import { useEffect, useState } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import PageSEO from '../../../components/PageSEO'
import PageBreadcrumb from '../../../components/PageBreadcrumb'
import SetHero from '../../../components/vocab/SetHero'
import EntryCard from '../../../components/vocab/EntryCard'
import EntryTable from '../../../components/vocab/EntryTable'
import ViewToggle, { type ViewMode } from '../../../components/vocab/ViewToggle'
import { setKey, useBookmarks } from '../../../components/vocab/useBookmarks'
import { useRecent } from '../../../components/vocab/useRecent'
import { getAllSetPaths, getSet } from '../../../lib/vocab.server'
import type { SectionMeta, SetFile } from '../../../lib/vocab'

interface Props {
  section: SectionMeta
  set: SetFile
}

export default function SetPage({ section, set }: Props) {
  const { hasSet, hasEntry, toggleSet, toggleEntry } = useBookmarks()
  const { bump } = useRecent()
  const [view, setView] = useState<ViewMode>('cards')
  const sk = setKey(section.slug, set.slug)

  useEffect(() => {
    bump(section.slug, set.slug)
    if (typeof window !== 'undefined' && window.location.hash === '#table') {
      setView('table')
    }
  }, [bump, section.slug, set.slug])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const newHash = view === 'table' ? '#table' : ''
    if (window.location.hash !== newHash) {
      const url = window.location.pathname + window.location.search + newHash
      window.history.replaceState(null, '', url)
    }
  }, [view])

  return (
    <>
      <PageSEO
        title={`${set.nameZh} ${set.nameEn} | ${section.nameZh} | DSE 詞彙庫 | dse.best`}
        description={set.description ?? `${set.nameZh}（${set.nameEn}）— ${set.entries.length} 個 HKDSE English 備考詞彙，適用於 Paper 2 Writing 及 Paper 3 Speaking，歸屬「${section.nameZh}」。`}
        canonical={`https://dse.best/vocab/${section.slug}/${set.slug}`}
      />

      <PageBreadcrumb section={section.nameZh} text={set.nameZh} />

      <div className="vocab-set-page">
        <SetHero
          section={section}
          set={set}
          bookmarked={hasSet(sk)}
          onToggleBookmark={() => toggleSet(sk)}
        />

        <div className="vocab-set-page__toolbar">
          <div className="vocab-set-page__count">
            {set.entries.length} {set.entries.length === 1 ? 'entry' : 'entries'}
          </div>
          {set.entries.length > 0 && <ViewToggle value={view} onChange={setView} />}
        </div>

        {set.entries.length === 0 ? (
          <div className="vocab-set-page__empty">
            <strong>未有內容。</strong>
            <p>
              Set 結構已建立。喺 <code>data/vocab/{section.slug}/{set.slug}.json</code> 嘅 <code>entries</code>{' '}
              array 加 entry 即可。
            </p>
          </div>
        ) : view === 'cards' ? (
          <div className="vocab-set-page__grid">
            {set.entries.map((e) => (
              <EntryCard
                key={e.id}
                entry={e}
                bookmarked={hasEntry(e.id)}
                onToggleBookmark={() => toggleEntry(e.id)}
              />
            ))}
          </div>
        ) : (
          <EntryTable entries={set.entries} isBookmarked={hasEntry} onToggle={toggleEntry} />
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllSetPaths(),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const sectionSlug = String(params?.section)
  const setSlug = String(params?.set)
  const { section, set } = getSet(sectionSlug, setSlug)
  return { props: { section, set } }
}
