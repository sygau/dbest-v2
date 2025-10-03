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
          <Public>
            <div className="alert alert-warning border-warning" style={{ 
              backgroundColor: '#fff3cd', 
              borderColor: '#ffeaa7', 
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '30px'
            }}>
              <h5 className="alert-heading mb-3" style={{ color: '#856404', fontWeight: 'bold' }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                版權聲明 Copyright Notice
              </h5>
              <p className="mb-3" style={{ color: '#856404', fontSize: '1.1rem' }}>
                由於版權原因，我們已經移除過往試題。我們致力於遵守版權法規，確保所有內容的合法使用。
              </p>
              <p className="mb-0" style={{ color: '#856404', fontSize: '1.1rem' }}>
                Due to copyright reasons, we have taken down past papers. We are committed to complying with copyright regulations and ensuring the lawful use of all content.
              </p>
            </div>
          </Public>
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
              <div className="card border-primary border-2">
                <div className="card-body text-center p-2">
                  <h3 className="mb-3">
                    <span className="text-primary">Follow us on Instagram</span>
                  </h3>
                  <p className="mb-3">
                    追蹤我們的 Instagram 獲取最新消息和更新！
                  </p>
                                      <a 
                      href="https://www.instagram.com/dse_best"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary d-inline-flex align-items-center gap-2"
                      style={{
                        borderRadius: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                        minWidth: '160px',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        color: 'white'
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
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <BiLogoInstagram style={{ fontSize: '1.2rem' }} />
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
