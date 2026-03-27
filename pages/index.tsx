import Head from 'next/head'
import { Private } from '../components/Private'
import {
  BiBook, BiCalculator, BiBot, BiTestTube, BiLeaf, BiLaptop,
  BiGlobe, BiMoney, BiBriefcase, BiPlanet, BiLogoInstagram
} from 'react-icons/bi'
import SubjectCard from '../components/tw/SubjectCard'
import FAQSection from '../components/FAQSection'
import ChangelogSection from '../components/ChangelogSection'
import { changelogData } from '../utils/changelogData'
import {
  generateWebsiteStructuredData,
  generateHomepageStructuredData,
  generatePageFAQStructuredData,
  getMainPageMetadata
} from '../utils/structuredData'

const homepageFAQs = [
  {
    id: 'faq1',
    question: 'dse.best 係咩平台？有咩資源？',
    answer: 'dse.best 係一個專為香港中學文憑試（HKDSE）學生而設嘅 <strong>網上平台</strong>，提供溫習筆記、模擬試卷同教育博客文章等實用學習資源。'
  }
]

export default function HomePage() {
  const metadata = getMainPageMetadata('homepage')

  return (
    <>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta name="robots" content={metadata?.robots} />
        <meta property="og:title" content={metadata?.ogTitle} />
        <meta property="og:description" content={metadata?.ogDescription} />
        <meta property="og:image" content={metadata?.ogImage} />
        <meta property="og:url" content={metadata?.ogUrl} />
        <meta property="og:type" content={metadata?.ogType} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomepageStructuredData()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageFAQStructuredData('homepage')) }} />
      </Head>

      {/* Breadcrumb */}
      <div className="hidden sm:flex items-center mb-3">
        <div className="text-xl font-medium pr-3 border-r border-[var(--color-border)] text-[var(--color-heading)]">首頁</div>
        <div className="pl-3">
          <nav aria-label="breadcrumb">
            <ol className="list-none flex p-0 m-0">
              <li className="text-base text-[var(--color-body)]" aria-current="page">Home</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--color-card-bg)] rounded-2xl p-5 mb-6 shadow-sm border border-[var(--color-border)]" style={{ minHeight: 800 }}>
        <div className="text-center">
          {/* Hero Section */}
          <h1 className="fw-bold mb-4" style={{ marginTop: '50px', fontSize: 'clamp(2rem, 7vw, 3rem)' }}>
            <span style={{
              background: '#8b5cf6',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(2px 2px 4px rgba(139, 92, 246, 0.3))'
            }}>
              歡迎來到 dse.best
            </span>
          </h1>

          <p className="mb-4 mt-10 text-base sm:text-[1.4rem] text-[var(--color-body)]">
            本網站提供全面的香港中學文憑試 DSE 各科歷屆試題 (Past Papers) 及答案⸻涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。
          </p>

          <br />
          <hr className="my-4" style={{ borderColor: 'var(--bs-body-color)', opacity: 0.25 }} />
          <br /><br />

          {/* Past Papers Section */}
          <Private>
            <h1 className="font-bold mb-4 text-[var(--color-heading)]">歷屆試題</h1>
          </Private>

          <br /><br />

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
          <h2 className="font-bold mb-4 mt-16 text-[var(--color-heading)] text-2xl">選修科目 Electives</h2>
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

        {/* Instagram Follow Section */}
        <div className="max-w-3xl mx-auto my-12" style={{backgroundColor: '#332225'}}>
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl">
            <div className="text-center p-6">
              <h3 className="mb-3 font-bold" style={{ background: '#bc1888', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Follow dse.best on Instagram
              </h3>
              <p className="mb-3 text-[var(--color-body)]">
                追蹤我們的 Instagram 獲取最新消息和更新！
              </p>
              <a
                href="https://www.instagram.com/dse_best"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg d-inline-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                  border: 'none',
                  borderRadius: 25,
                  padding: '12px 32px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(240,148,51,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
                onClick={(e) => {
                  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    e.preventDefault()
                    window.location.href = 'instagram://user?username=dse_best'
                    setTimeout(() => { window.location.href = 'https://www.instagram.com/dse_best' }, 2000)
                  }
                }}
              >
                <BiLogoInstagram style={{ fontSize: '1.4rem' }} />
                <span>Follow us on Instagram</span>
              </a>
            </div>
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