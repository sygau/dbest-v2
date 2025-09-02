import Head from 'next/head'
import { getMainPageMetadata, generateResourcesStructuredData, generatePageFAQStructuredData } from '../utils/structuredData';
import { BiBookReader } from 'react-icons/bi';

export default function ResourcesPage() {
  const metadata = getMainPageMetadata('resources');

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
            __html: JSON.stringify(generateResourcesStructuredData())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePageFAQStructuredData('resources'))
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">其他</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">
                學習資源
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <h1>DSE 學習資源 Learning Resources</h1>
          <p>
            Here you can browse all the additional HKDSE resources including study room locations, exclusive deals, student discounts, helpful tools/websites and more to help you ace your DSE exams!
          </p>
          <br>
          </br>
          <p>
            呢度你可以搵到所有額外嘅 DSE 資源，包括溫習室位置、獨家優惠、學生折扣、實用工具同網站等等，幫你喺 DSE 考試度攞到好成績！
          </p>
          <hr />
          <h2 className="text-center">
            溫習室 Study Rooms/Locations
          </h2>
          <hr style={{ marginTop: '-4px', borderWidth: '2px' }} />
          <h3>
            1. GrabASeat Public Spaces Collection | 公共空間介紹
          </h3>
          <p><strong> Credits: </strong> <a href="https://www.threads.com/@grabaseat.hk" target="_blank" rel="noopener noreferrer">@grabaseat.hk</a>
          </p>
          
          <div className="text-center mb-4">
            <img 
              src="https://images.ctfassets.net/fqnskombkl24/6ffN3DeqVzRGdKyC60aMUG/c22b68f0cde66a6ec4c860f379b6de82/image.png?fm=webp" 
              alt="GrabASeat Study Room Collection" 
              className="img-fluid rounded"
              style={{ maxWidth: '600px', width: '100%', height: 'auto' }}
            />
            <div className="mt-3">
              <a 
                href="https://maps.app.goo.gl/uP9oFzLCep2jNp9F8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                🗺️ 查看地圖 View Maps
              </a>
            </div>
          </div>
          
          <h2 className="text-center">
            獨家優惠 Exclusive Offers
          </h2>
          <hr style={{ marginTop: '-4px', borderWidth: '2px' }} />
          <h3>
            1. NoteSity | 超過 1,000 款優質 DSE 筆記/模擬試卷/補充練習
          </h3>

          <p>
            除了DSE Past Papers，我們也為你推薦 <strong>NoteSity 網上書店</strong>，無論是 <strong>精讀筆記</strong>、<strong>模擬試卷</strong>，還是 <strong>各科補充練習</strong>，NoteSity 都為你一網打盡，涵蓋中文、英文、數學、理科、商科等所有科目，助你針對弱項加強操練，穩奪 <strong>5**</strong>
          </p>


          <div className="text-center mt-4">
            <img
              src="https://images.ctfassets.net/fqnskombkl24/2TAiG8vyutgs2BSRA4f50J/bfe117e8951f5ddd12e0bf5e7cf533b3/image.png?fm=webp"
              alt="NoteSity DSE Resources"
              className="img-fluid rounded"
              style={{ maxWidth: '500px', width: '100%', height: 'auto' }}
            />
          </div>
          <br />
          <div className="text-center">
            <p>
              凡使用優惠碼 <strong>DSEBEST</strong>，即可在 NoteSity 購物享 <strong>九五折優惠</strong>
            </p>

            <p>
              <a href="https://notesity.hk/?utm_source=dsebest&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="btn btn-primary">👉 前往 NoteSity 官網選購</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 