import Head from 'next/head';
import Link from 'next/link';
import {
  BiBook,
  BiCalculator,
  BiBot,
  BiTestTube,
  BiLeaf,
  BiLaptop,
  BiGlobe,
  BiMoney,
  BiBriefcase
} from 'react-icons/bi';
import {
  UnifiedSubjectCard,
} from '../components/SubjectCardVariants'
export default function HomePage() {
  return (
    <>
      <Head>
        <title>HKDSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio、M1/M2等 - dse.best</title>
        <meta name="description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="HKDSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio、M1/M2等 - dse.best" />
        <meta property="og:description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
        <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
        <meta property="og:url" content="https://dse.best/" />
        <meta property="og:type" content="website" />
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
              background: 'linear-gradient(to right, #663399, #007bff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
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

          {/* Past Papers Section */}
          <h1 className="fw-bold mb-4">歷屆試題</h1>
          <p className="mb-4" style={{ fontSize: '1.5rem' }}>
            以下是按科目和年份分類的歷屆試題資源，點擊連結即可查看詳細內容。
          </p>
          <p className="mb-4" style={{ fontSize: '1rem' }}>
            原 <strong>dse.life</strong> 站內的資源現已整合Backup至{' '}
            <a href="https://dse.best/">dse.best</a>，歡迎繼續使用！
          </p>

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
          </div>

        </div>

        {/* FAQ Section */}
        <section className="container my-5" id="faq">
          <h2 className="fw-bold mb-4">常見問題 FAQ</h2>
          <div className="accordion" id="faqAccordion">
            {/* FAQ Item 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1-heading">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                  DSEBest 係咩平台？有咩資源？
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show" aria-labelledby="faq1-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  DSEBest（dse.best）係一個專為香港中學文憑試（HKDSE）學生而設嘅 <strong>免費網上平台</strong>，提供歷屆試題、溫習筆記、模擬試卷同教育博客文章等實用學習資源。
                </div>
              </div>
            </div>
            {/* FAQ Item 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                  「dse.life」停咗，點解喺 DSEBest 仲搵到啲文件？
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" aria-labelledby="faq2-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  我哋已經將 <strong>dse.life backup</strong> 嘅所有公開資源妥善備份並整合到 DSEBest，確保同學依然可以免費存取重要嘅 DSE 資料。
                </div>
              </div>
            </div>
            {/* FAQ Item 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                  點樣下載 PDF 試卷同答案？
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse" aria-labelledby="faq3-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  喺各科頁面揀選年份後，直接按「下載」或「查看」按鈕即可開啟或下載 PDF 試卷／答案檔案，毋須登入。
                </div>
              </div>
            </div>
            {/* FAQ Item 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq4-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                  可唔可以離線瀏覽？
                </button>
              </h2>
              <div id="faq4" className="accordion-collapse collapse" aria-labelledby="faq4-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  DSEBest 個 <abbr title="Progressive Web App">PWA</abbr>，只要你用 Chrome 或 Safari 加到主畫面，網站就會自動快取資源，離線都能睇到以往載入過嘅內容。
                </div>
              </div>
            </div>
            {/* FAQ Item 6 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq5-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
                  DSEBest 嘅資源幾時會更新？
                </button>
              </h2>
              <div id="faq5" className="accordion-collapse collapse" aria-labelledby="faq5-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  我哋會定期更新 DSEBest 嘅試題、答案同學習資源，確保內容最新最齊全。一般每月都會有新資料或功能加入，歡迎大家多啲留意網站公告或追蹤我哋嘅社交平台獲取最新消息。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
