import Head from 'next/head';
import Link from 'next/link';
import { Public, Private } from '../components/Private';
import {
  BiBook,
  BiCalculator,
  BiBot,
  BiTestTube,
  BiLeaf,
  BiLaptop,
  BiGlobe,
  BiMoney,
  BiBriefcase,
  BiPlanet,
  BiLogoInstagram
} from 'react-icons/bi';
import {
  UnifiedSubjectCard,
} from '../components/SubjectCardVariants'
import FAQSection from '../components/FAQSection'
import ChangelogSection from '../components/ChangelogSection'
import NavigationLink from '../components/NavigationLink'
import { changelogData } from '../utils/changelogData'
import { 
  generateWebsiteStructuredData, 
  generateHomepageStructuredData, 
  generatePageFAQStructuredData,
  getMainPageMetadata 
} from '../utils/structuredData'

// FAQ data moved inline to fix Vercel build issue
const homepageFAQs = [
  {
    id: 'faq1',
    question: 'dse.best 係咩平台？有咩資源？',
    answer: 'dse.best 係一個專為香港中學文憑試（HKDSE）學生而設嘅 <strong>網上平台</strong>，提供溫習筆記、模擬試卷同教育博客文章等實用學習資源。'
  }
]
export default function HomePage() {
  const metadata = getMainPageMetadata('homepage');

  return (
    <>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta name="robots" content={metadata?.robots} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata?.ogTitle} />
        <meta property="og:description" content={metadata?.ogDescription} />
        <meta property="og:image" content={metadata?.ogImage} />
        <meta property="og:url" content={metadata?.ogUrl} />
        <meta property="og:type" content={metadata?.ogType} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteStructuredData())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateHomepageStructuredData())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePageFAQStructuredData('homepage'))
          }}
        />
      </Head>
      
      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">首頁</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card rounded-4" style={{ height: 'auto', padding: '20px' }}>
        <div className="card-body text-center">
          {/* Hero Section */}
          <h1 className="fw-bold mb-4" style={{ marginTop: '50px', fontSize: '3.0rem' }}>
            <span style={{
              /* background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #d8b4fe 75%, #e9d5ff 100%)', */
              background: '#8b5cf6',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(2px 2px 4px rgba(139, 92, 246, 0.3))'
            }}>
              歡迎來到 DSE.BEST
            </span>
          </h1>

          <p className="mb-4" style={{ marginTop: '40px', fontSize: '1.4rem' }}>
            本網站提供全面的香港中學文憑試 DSE 各科歷屆試題 (Past Papers) 及答案⸻涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。
          </p>

          <br />
          <hr className="my-4" />
          <br />
          <br />

          {/* Copyright Notice Section */}
          
          {/* Past Papers Section */}
          <Private>
            <h1 className="fw-bold mb-4">歷屆試題</h1>
          </Private>
          


          <br />
          <br />

          {/* Core Subjects Section */}
          <h2 className="fw-bold mb-4">核心科目 Core</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Chinese */}
            <div className="col">
              <UnifiedSubjectCard
                title="中文 Chinese Language"
                href="/chinese"
                icon={<BiBook style={{ color: '#ff69b4', fontSize: 40 }} />}
                accent="#ff69b4"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中' }]}
              />
            </div>

            {/* English */}
            <div className="col">
              <UnifiedSubjectCard
                title="英文 English Language"
                href="/english"
                icon={<BiBook style={{ color: '#40c4ff', fontSize: 40 }} />}
                accent="#40c4ff"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]}
              />
            </div>

            {/* Mathematics */}
            <div className="col">
              <UnifiedSubjectCard
                title="數學 Mathematics"
                href="/math"
                icon={<BiCalculator style={{ color: '#ffd600', fontSize: 40 }} />}
                accent="#ffd600"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* Citizenship and Social Development */}
            <div className="col">
              <UnifiedSubjectCard
                title="公民與社會發展 Citizenship"
                href="/citizen"
                icon={<BiGlobe style={{ color: '#28a745', fontSize: 40 }} />}
                accent="#28a745"
                details={[{ label: '年份', value: '2024' }, { label: '語言', value: '中' }]}
              />
            </div>
          </div>

          {/* Electives Section */}
          <h2 className="fw-bold mb-4 mt-5">選修科目 Electives</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Physics */}
            <div className="col">
              <UnifiedSubjectCard
                title="物理 Physics"
                href="/physics"
                icon={<BiBot style={{ color: '#ffd600', fontSize: 40 }} />}
                accent="#ffd600"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* Chemistry */}
            <div className="col">
              <UnifiedSubjectCard
                title="化學 Chemistry"
                href="/chemistry"
                icon={<BiTestTube style={{ color: '#00e676', fontSize: 40 }} />}
                accent="#00e676"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* Biology */}
            <div className="col">
              <UnifiedSubjectCard
                title="生物 Biology"
                href="/biology"
                icon={<BiLeaf style={{ color: '#00c853', fontSize: 40 }} />}
                accent="#00c853"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* ICT */}
            <div className="col">
              <UnifiedSubjectCard
                title="資訊及通訊技術 ICT"
                href="/ict"
                icon={<BiLaptop style={{ color: '#ff3d00', fontSize: 40 }} />}
                accent="#ff3d00"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* M1 */}
            <div className="col">
              <UnifiedSubjectCard
                title="數學延伸部分 (M1)"
                href="/m1"
                icon={<BiCalculator style={{ color: '#b388ff', fontSize: 40 }} />}
                accent="#b388ff"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]}
              />
            </div>

            {/* M2 */}
            <div className="col">
              <UnifiedSubjectCard
                title="數學延伸部分 (M2)"
                href="/m2"
                icon={<BiCalculator style={{ color: '#64ffda', fontSize: 40 }} />}
                accent="#64ffda"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '英' }]}
              />
            </div>

            {/* Geography */}
            <div className="col">
              <UnifiedSubjectCard
                title="地理 Geography"
                href="/geography"
                icon={<BiGlobe style={{ color: '#00bfae', fontSize: 40 }} />}
                accent="#00bfae"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* Economics */}
            <div className="col">
              <UnifiedSubjectCard
                title="經濟 Economics"
                href="/economics"
                icon={<BiMoney style={{ color: '#ffd600', fontSize: 40 }} />}
                accent="#ffd600"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* BAFS */}
            <div className="col">
              <UnifiedSubjectCard
                title="企業、會計與財務概論 BAFS"
                href="/bafs"
                icon={<BiBriefcase style={{ color: '#ffea00', fontSize: 40 }} />}
                accent="#ffea00"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* History */}
            <div className="col">
              <UnifiedSubjectCard
                title="歷史 History"
                href="/history"
                icon={<BiBook style={{ color: '#ffab91', fontSize: 40 }} />}
                accent="#ffab91"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中/英' }]}
              />
            </div>

            {/* Chinese History */}
            <div className="col">
              <UnifiedSubjectCard
                title="中國歷史 Chinese History"
                href="/chinese-history"
                icon={<BiBook style={{ color: '#ff1744', fontSize: 40 }} />}
                accent="#ff1744"
                details={[{ label: '年份', value: '2025' }, { label: '語言', value: '中' }]}
              />
            </div>

            {/* Tourism and Hospitality Studies */}
            <div className="col">
              <UnifiedSubjectCard
                title="旅遊與款待 Tourism & Hospitality"
                href="/ths"
                icon={<BiPlanet style={{ color: '#2196f3', fontSize: 40 }} />}
                accent="#2196f3"
                details={[{ label: '年份', value: '2023' }, { label: '語言', value: '中' }]}
              />
            </div>
          </div>

        </div>

        {/* Instagram Follow Section */}
        <div className="container my-5 instagram-section">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-2" style={{ 
                borderImage: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%) 1',
                background: 'linear-gradient(45deg, rgba(240,148,51,0.1) 0%, rgba(230,104,60,0.1) 25%, rgba(220,39,67,0.1) 50%, rgba(204,35,102,0.1) 75%, rgba(188,24,136,0.1) 100%)'
              }}>
                <div className="card-body text-center p-4">
                  <h3 className="mb-3" style={{
                    background: '#bc1888',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold'
                  }}>
                    Follow dse.best on Instagram
                  </h3>
                  <p className="mb-3" style={{ color: 'var(--bs-body-color)' }}>
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
                        borderRadius: '25px',
                        padding: '12px 32px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        color: 'white',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(240,148,51,0.3)'
                      }}
                    onClick={(e) => {
                      // Try to open Instagram app first on mobile
                      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        e.preventDefault();
                        const appUrl = 'instagram://user?username=dse_best';
                        const webUrl = 'https://www.instagram.com/dse_best';
                        
                        // Try to open app, fallback to website after 2 seconds
                        window.location.href = appUrl;
                        setTimeout(() => {
                          window.location.href = webUrl;
                        }, 2000);
                      }
                    }}
                  >
                    <BiLogoInstagram style={{ fontSize: '1.4rem' }} />
                    <span>Follow us on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Changelog Section */}
        <ChangelogSection 
          date={changelogData.date}
          changes={changelogData.changes}
        />

        {/* FAQ Section */}
        <FAQSection faqs={homepageFAQs} />
      </div>
    </>
  );
}
