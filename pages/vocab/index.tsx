import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { LuBookmark, LuLayers, LuType, LuArrowRight } from 'react-icons/lu'
import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import Shelf from '../../components/vocab/Shelf'
import SetCapsule from '../../components/vocab/SetCapsule'
import { useRecent } from '../../components/vocab/useRecent'
import { getHomeShelfData } from '../../lib/vocab.server'
import type { SectionMeta, SetFile } from '../../lib/vocab'

interface Props {
  sections: SectionMeta[]
  setsBySection: Record<string, SetFile[]>
  setLookup: Record<string, { section: SectionMeta; set: SetFile }>
}

export default function VocabHome({ sections, setsBySection, setLookup }: Props) {
  const { recent } = useRecent()

  const totalSets = sections.reduce((n, s) => n + (setsBySection[s.slug]?.length ?? 0), 0)

  return (
    <>
      <PageSEO
        title="詞彙庫 DSE English Writing Vocabulary Bank | dse.best"
        description="DSE English Writing 詞彙庫：時事議題、文體模板、用字升級、句式、成語。Steam Library 風格瀏覽，翻轉卡同表格雙模式，書籤同發音支援。"
        canonical="https://dse.best/vocab"
      />

      <PageBreadcrumb section="資源" text="詞彙庫 Vocab Bank" />

      <div className="vocab-home">
        <section className="vocab-home__hero">
          <div className="vocab-home__hero-inner">
            <div className="vocab-home__hero-top">
              <div>
                <h1>詞彙庫 Vocab Bank</h1>
                <div className="vocab-home__sub">DSE English Writing 寫作詞彙資源庫</div>
                <p className="vocab-home__desc">
                  專為 HKDSE English Paper 2 而設嘅寫作資源庫。涵蓋常考時事議題詞彙、文體模板、用字升級、句式同成語。
                  支援翻卡學習、發音、字典外連、書籤同搜尋。喺呢度執靚你嘅 vocab，寫作直接拎 advanced level。
                </p>
              </div>
              <Link href="/vocab/bookmarks" className="vocab-home__bookmarks">
                <LuBookmark size={16} />
                我的書籤
              </Link>
            </div>
            <div className="vocab-home__stats">
              <span className="vocab-home__stat">
                <LuLayers size={13} /> {sections.length} Sections
              </span>
              <span className="vocab-home__stat">
                <LuType size={13} /> {totalSets} Sets
              </span>
            </div>
          </div>
        </section>

        {sections.map((s) => {
          const list = setsBySection[s.slug] ?? []
          if (list.length === 0) return null
          return (
            <Shelf
              key={s.slug}
              title={`${s.nameZh} ${s.nameEn}`}
              description={s.description}
              action={
                <Link href={`/vocab/${s.slug}`}>
                  查看全部 <LuArrowRight size={14} />
                </Link>
              }
            >
              {list.map((set) => (
                <SetCapsule
                  key={set.slug}
                  section={s}
                  set={set}
                  width={320}
                  hideDifficulty
                />
              ))}
            </Shelf>
          )
        })}

        <RecentShelf recent={recent} setLookup={setLookup} />
      </div>
    </>
  )
}

function RecentShelf({
  recent,
  setLookup,
}: {
  recent: { sectionSlug: string; setSlug: string; ts: number }[]
  setLookup: Record<string, { section: SectionMeta; set: SetFile }>
}) {
  const resolved = recent
    .map((r) => setLookup[`${r.sectionSlug}/${r.setSlug}`])
    .filter((x): x is { section: SectionMeta; set: SetFile } => Boolean(x))

  if (resolved.length === 0) {
    return (
      <Shelf title="最近瀏覽" subtitle="Recently viewed" bare>
        <div className="vocab-home__empty">瀏覽過嘅 set 會喺度顯示。</div>
      </Shelf>
    )
  }

  return (
    <Shelf title="最近瀏覽" subtitle="Recently viewed" bare>
      {resolved.map(({ section, set }) => (
        <SetCapsule key={`${section.slug}/${set.slug}`} section={section} set={set} width={320} hideDifficulty />
      ))}
    </Shelf>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = getHomeShelfData()
  return { props: data }
}
