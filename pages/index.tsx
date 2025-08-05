import Head from 'next/head'
import Link from 'next/link'

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
              <li className="breadcrumb-item">
                <a href="javascript:;" aria-label="menu">
                  <i className="bx bx-home-alt"></i>
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card rounded-4" style={{height: 'auto', padding: '20px'}}>
        <div className="card-body text-center">
          {/* Hero Section */}
          <h1 className="fw-bold mb-4" style={{marginTop: '50px', fontSize: '3.0rem'}}>
            <span style={{
              background: 'linear-gradient(to right, #663399, #007bff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              歡迎來到 DSE.BEST
            </span>
          </h1>
          
          <p className="mb-4" style={{marginTop: '40px', fontSize: '1.4rem'}}>
            本網站提供全面的香港中學文憑試 DSE 各科歷屆試題 (Past Papers) 及答案⸻涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。(v1.2.07f)
          </p>
          
          <br />
          <hr className="my-4" />
          <br />
          <br />

          {/* Past Papers Section */}
          <h1 className="fw-bold mb-4">歷屆試題</h1>
          <p className="mb-4" style={{fontSize: '1.5rem'}}>
            以下是按科目和年份分類的歷屆試題資源，點擊連結即可查看詳細內容。
          </p>
          <p className="mb-4" style={{fontSize: '1rem'}}>
            原 <strong>dse.life</strong> 站內的資源現已整合Backup至{' '}
            <a href="https://dse.best/">dse.best</a>，歡迎繼續使用！
          </p>
          
          <br />
          <br />

          {/* Core Subjects Section */}
          <h2 className="fw-bold mb-4">核心科目 Core</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Chinese Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined text-primary mb-3" style={{fontSize: '48px'}}>language</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>中文 Chinese Language</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中</li>
                    </ul>
                  </div>
                  <Link href="chinese" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* English Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined text-success mb-3" style={{fontSize: '48px'}}>translate</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>英文 English Language</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>英</li>
                    </ul>
                  </div>
                  <Link href="english" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Mathematics Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined text-warning mb-3" style={{fontSize: '48px'}}>calculate</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>數學 Mathematics</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="math" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Liberal Studies / Citizenship Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#ff9800'}}>school</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>公民與社會發展科 Citizenship and Social Development</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="citizen" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Electives Section */}
          <h2 className="fw-bold mb-4 mt-5">選修科目 Electives</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Physics Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined text-danger mb-3" style={{fontSize: '48px'}}>bolt</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>物理 Physics</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="physics" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Chemistry Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#6f42c1'}}>biotech</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>化學 Chemistry</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="chemistry" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Biology Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#4CAF50'}}>eco</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>生物 Biology</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="biology" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* ICT Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#007bff'}}>computer</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>資訊及通訊技術 ICT</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="ict" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* M1 Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#8bc34a'}}>functions</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>數學延伸部分 (M1)</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>英</li>
                    </ul>
                  </div>
                  <Link href="m1" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* M2 Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#cddc39'}}>functions</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>數學延伸部分 (M2)</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>英</li>
                    </ul>
                  </div>
                  <Link href="m2" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Geography Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#009688'}}>public</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>地理 Geography</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="geography" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#607d8b'}}>history</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>歷史 History</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="history" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Chinese History Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#795548'}}>book</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>中國歷史 Chinese History</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中</li>
                    </ul>
                  </div>
                  <Link href="chinese-history" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Economics Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#ff5722'}}>attach_money</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>經濟 Economics</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="economics" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* BAFS Card */}
            <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#ffb300'}}>business</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>企業、會計與財務概論 BAFS</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <Link href="bafs" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</Link>
                </div>
              </div>
            </div>

            {/* Visual Arts Card */}
            {/* <div className="col">
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center d-flex flex-column" style={{minHeight: '300px', padding: '1.5rem'}}>
                  <div>
                    <i className="material-icons-outlined mb-3" style={{fontSize: '48px', color: '#03a9f4'}}>palette</i>
                    <h2 className="card-title mt-3" style={{fontSize: '1.3rem'}}>視覺藝術 Visual Arts</h2>
                    <ul className="mb-3" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem'}}>
                      <li>年份: 2025</li>
                      <li>中/英</li>
                    </ul>
                  </div>
                  <a href="visual-arts" className="btn btn-primary w-100 mt-auto" style={{padding: '0.6rem 1.2rem'}}>查看</a>
                </div>
              </div>
            </div> */}
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
            {/* FAQ Item 5 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq5-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
                  試題版權屬邊個？可以免費使用嗎？
                </button>
              </h2>
              <div id="faq5" className="accordion-collapse collapse" aria-labelledby="faq5-heading" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  歷屆試題及其版權均屬香港考試及評核局（HKEAA）所有。本站只作教育用途展示公開資源，嚴禁任何未經授權嘅商業用途或再發佈。如有疑問，請即 <Link href="/contact">聯絡我們</Link>。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
