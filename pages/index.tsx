import {
  BiBook, BiCalculator, BiBot, BiTestTube, BiLeaf, BiLaptop,
  BiGlobe, BiMoney, BiBriefcase, BiPlanet, BiLogoInstagram
} from 'react-icons/bi'
import SubjectCard from '../components/tw/SubjectCard'
import FAQSection from '../components/FAQSection'
import ChangelogSection from '../components/ChangelogSection'
import PageBreadcrumb from '../components/PageBreadcrumb'
import { changelogData } from '../utils/changelogData'
import PageSEO from '../components/PageSEO'
import Hero from '../components/home/Hero'
import DseCountdown from '../components/home/DseCountdown'
import ToolGrid from '../components/home/ToolGrid'

const homepageFAQs = [
  {
    id: 'faq1',
    question: 'dse.best 係咩平台？有咩資源？',
    answer: 'dse.best 係一個專為香港中學文憑試（HKDSE）學生而設嘅 <strong>網上平台</strong>，提供溫習筆記、模擬試卷同教育博客文章等實用學習資源。'
  }
]

export default function HomePage() {
  return (
    <>
      <PageSEO
        title="DSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio"
        description="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
        ogTitle="DSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio等"
        ogDescription="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。"
        ogUrl="https://dse.best/"
        robots={['index', 'follow']}
        pageKey="homepage"
      />

      {/* Breadcrumb */}
      <PageBreadcrumb section="首頁" text="Home" />

      {/* Main Content Card */}
      <div className="bg-[var(--color-card-bg)] rounded-2xl px-7 sm:px-9 py-5 mb-6 shadow-sm border border-[var(--color-border)]">
        <div className="text-center">
          {/* Hero Section */}
          <Hero />

          <hr className="mt-7 mb-9" style={{ borderColor: 'var(--color-body)', opacity: 0.2 }} />

          {/* DSE 2027 countdown */}
          <DseCountdown />

          {/* Learning tools */}
          <div className="mt-12">
            <ToolGrid />
          </div>

          <hr className="mt-16 mb-12" style={{ borderColor: 'var(--color-body)', opacity: 0.2 }} />

          {/* Past Papers Section */}
          <h1
            className="font-bold mb-2 text-[var(--color-heading)]"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 3.1rem)', marginTop: '5rem' }}
          >
            歷屆試題
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10 mx-auto" style={{ color: 'var(--color-secondary)', maxWidth: '68ch' }}>
            全科 DSE 歷屆試題（Past Papers）連參考答案，由 2012 年起逐年收錄，按科目同年份即時查閱。
          </p>

          {/* Core Subjects */}
          <h2 className="font-bold mb-4 text-[var(--color-heading)] text-2xl">核心科目 Core</h2>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SubjectCard title="中文 Chinese Language" href="/chinese" icon={<BiBook style={{ color: '#ff69b4', fontSize: 40 }} />} accent="#ff69b4" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中' }]} />
            <SubjectCard title="英文 English Language" href="/english" icon={<BiBook style={{ color: '#40c4ff', fontSize: 40 }} />} accent="#40c4ff" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]} />
            <SubjectCard title="數學 Mathematics" href="/math" icon={<BiCalculator style={{ color: '#eab308', fontSize: 40 }} />} accent="#eab308" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="公民與社會發展 Citizenship" href="/citizen" icon={<BiGlobe style={{ color: '#28a745', fontSize: 40 }} />} accent="#28a745" details={[{ label: '年份', value: '2024' }, { label: '語言', value: '中' }]} />
          </div>

          {/* Electives */}
          <h2 className="font-bold mb-4 mt-24 text-[var(--color-heading)] text-2xl">選修科目 Electives</h2>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SubjectCard title="物理 Physics" href="/physics" icon={<BiBot style={{ color: '#6366f1', fontSize: 40 }} />} accent="#6366f1" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="化學 Chemistry" href="/chemistry" icon={<BiTestTube style={{ color: '#06b6d4', fontSize: 40 }} />} accent="#06b6d4" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="生物 Biology" href="/biology" icon={<BiLeaf style={{ color: '#22c55e', fontSize: 40 }} />} accent="#22c55e" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="資訊及通訊技術 ICT" href="/ict" icon={<BiLaptop style={{ color: '#ff3d00', fontSize: 40 }} />} accent="#ff3d00" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="數學延伸部分 (M1)" href="/m1" icon={<BiCalculator style={{ color: '#b388ff', fontSize: 40 }} />} accent="#b388ff" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]} />
            <SubjectCard title="數學延伸部分 (M2)" href="/m2" icon={<BiCalculator style={{ color: '#22d3ee', fontSize: 40 }} />} accent="#22d3ee" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]} />
            <SubjectCard title="地理 Geography" href="/geography" icon={<BiGlobe style={{ color: '#16a34a', fontSize: 40 }} />} accent="#16a34a" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="經濟 Economics" href="/economics" icon={<BiMoney style={{ color: '#f97316', fontSize: 40 }} />} accent="#f97316" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="企業、會計與財務概論 BAFS" href="/bafs" icon={<BiBriefcase style={{ color: '#10b981', fontSize: 40 }} />} accent="#10b981" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="歷史 History" href="/history" icon={<BiBook style={{ color: '#ffab91', fontSize: 40 }} />} accent="#ffab91" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]} />
            <SubjectCard title="中國歷史 Chinese History" href="/chinese-history" icon={<BiBook style={{ color: '#ff1744', fontSize: 40 }} />} accent="#ff1744" details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中' }]} />
            <SubjectCard title="旅遊與款待 Tourism & Hospitality" href="/ths" icon={<BiPlanet style={{ color: '#2196f3', fontSize: 40 }} />} accent="#2196f3" details={[{ label: '年份', value: '2023' }, { label: '語言', value: '中' }]} />
          </div>
        </div>

        

        {/* Changelog Section */}
        <ChangelogSection date={changelogData.date} changes={changelogData.changes} />

        {/* FAQ Section */}
        <FAQSection faqs={homepageFAQs} />
      </div>
    </>
  )
}
