import type { GetStaticPaths, GetStaticProps } from 'next'
import PageSEO from '../../../components/PageSEO'
import PageBreadcrumb from '../../../components/PageBreadcrumb'
import SectionHero from '../../../components/vocab/SectionHero'
import SetCapsule from '../../../components/vocab/SetCapsule'
import { getAllSectionPaths, getSection } from '../../../lib/vocab.server'
import type { SectionMeta, SetFile } from '../../../lib/vocab'

interface Props {
  section: SectionMeta
  sets: SetFile[]
}

export default function SectionPage({ section, sets }: Props) {
  const entryCount = sets.reduce((n, s) => n + s.entries.length, 0)
  return (
    <>
      <PageSEO
        title={`${section.nameZh} ${section.nameEn} | DSE 詞彙庫 | dse.best`}
        description={
          section.description ??
          `${section.nameZh} — DSE English 備考詞彙，涵蓋 ${sets.length} 個主題 set，適用於 HKDSE 英文科 Paper 2 Writing 及 Paper 3 Speaking。`
        }
        canonical={`https://dse.best/vocab/${section.slug}`}
      />

      <PageBreadcrumb section="詞彙庫" text={section.nameZh} />

      <div className="vocab-section-page">
        <SectionHero section={section} setCount={sets.length} entryCount={entryCount} />

        {sets.length === 0 ? (
          <div className="vocab-section-page__empty">未有 set。</div>
        ) : (
          <div className="vocab-section-page__grid">
            {sets.map((set) => (
              <SetCapsule key={set.slug} section={section} set={set} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllSectionPaths(),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const section = String(params?.section)
  const { meta, sets } = getSection(section)
  return { props: { section: meta, sets } }
}
