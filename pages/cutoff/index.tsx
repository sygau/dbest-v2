import React from 'react';
import Head from 'next/head';
import { BiBarChartAlt2, BiTrendingUp, BiBookOpen } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { AVAILABLE_CUTOFF_SUBJECTS, CUTOFF_SUBJECT_NAMES } from '../../utils/cutoffSlugSEO';
import { getPageMetadata } from '../../utils/pageMetadata';
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getCutoffIndexLastUpdated } from '../../utils/lastUpdated';

export default function CutoffIndexPage() {
  const metadata = getPageMetadata('cutoff');
  const structuredData = generateSubjectStructuredData('cutoff');
  const faqData = generateSubjectFAQStructuredData('cutoff');
  const lastUpdated = getCutoffIndexLastUpdated();

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
        <meta property="og:url" content="https://dse.best/cutoff" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://dse.best/assets/images/logo-icon.png" />
        <link rel="canonical" href="https://dse.best/cutoff" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">DSE Cut-off 分數</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <NavigationLink href="/">
                  <i className="bx bx-home-alt"></i>
                </NavigationLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cut-off 分數
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <BiBarChartAlt2 className="me-3" size={32} />
            <h1 className="mb-0">DSE Cut-off Scores 分數線</h1>
          </div>
          
          <p className="mb-4 lead">
            歡迎瀏覽DSE各科目的Cut Off資料，包括英文、中文、數學、物理、化學、生物、ICT、M1、M2、地理、經濟、BAFS、歷史、中國歷史、旅遊與款待等科目。在此，您可以找到按年份排列的等級Cut Off，助您了解各等級的達標分數。
            <br />
            <br />
            Welcome to browse DSE cut-off scores for all subjects including English, Chinese, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2, Geography, Economics, BAFS, History, Chinese History, Tourism & Hospitality and more. Here you can find grade boundaries arranged by year to help you understand the score requirements for each grade level.
          </p>

          {/* Subject Grid */}
          <div className="row g-3 mb-4">
            {AVAILABLE_CUTOFF_SUBJECTS.map((subject) => (
              <div key={subject} className="col-lg-4 col-md-6">
                <NavigationLink href={`/cutoff/${subject}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="me-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                          <BiTrendingUp className="text-primary" size={24} />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="card-title mb-1">{CUTOFF_SUBJECT_NAMES[subject]}</h6>
                        <small className="text-muted">View cut-off scores</small>
                      </div>
                      <div>
                        <i className="bx bx-chevron-right text-muted"></i>
                      </div>
                    </div>
                  </div>
                </NavigationLink>
              </div>
            ))}
          </div>

          {/* Information Section */}
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <div className="card border-0 bg-light h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <BiBookOpen className="me-2 text-primary" size={24} />
                    <h5 className="mb-0">關於Cut-off分數 About Cut-off Scores</h5>
                  </div>
                  <p className="mb-0">
                    Cut-off分數是指在DSE考試中達到特定等級所需的最低分數。這些分數每年會根據考生表現和試題難度進行調整，為考生提供重要的參考指標。
                    <br /><br />
                    Cut-off scores represent the minimum marks required to achieve specific grade levels in DSE examinations. These scores are adjusted annually based on candidate performance and paper difficulty, providing important reference benchmarks for students.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 bg-light h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <BiTrendingUp className="me-2 text-success" size={24} />
                    <h5 className="mb-0">如何使用 How to Use</h5>
                  </div>
                  <p className="mb-0">
                    點擊上方任何科目卡片即可查看該科目的詳細Cut-off分數資料。每個科目頁面都包含歷年的等級界線，助您制定學習策略和目標設定。
                    <br /><br />
                    Click on any subject card above to view detailed cut-off score data for that subject. Each subject page contains historical grade boundaries to help you develop study strategies and set realistic targets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Source & Credits */}
          <div className="alert alert-info mb-4" role="alert">
            <div className="d-flex align-items-start">
              <i className="bx bx-info-circle me-2 mt-1"></i>
              <div>
                <strong>資料來源 Data Sources:</strong>
                <br />
                Cut-off分數資料來源於dse00及afterschool等可靠渠道，並定期更新以確保準確性。
                <br />
                <small className="text-muted">
                  Cut-off score data is sourced from reliable channels including dse00 and afterschool, and is regularly updated to ensure accuracy.
                </small>
                {lastUpdated && (
                  <>
                    <br /><br />
                    <small className="text-muted">
                      <strong>最後更新 Last Updated:</strong> {lastUpdated}
                    </small>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="alert alert-warning mb-0" role="alert">
            <div className="d-flex align-items-start">
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use href="#exclamation-triangle-fill"/>
              </svg>
              <div>
                <strong>⚠️ 注意事項 Important Notice:</strong>
                <br />
                Cut Off 資料僅供參考，可能存有錯誤，並會按年更新。實際分數要求請以香港考試及評核局公布為準。
                <br />
                <small className="text-muted">
                  This cut-off score data is for reference only. It may contain errors and is subject to annual updates. Please refer to official announcements from the Hong Kong Examinations and Assessment Authority for actual score requirements.
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: all 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </>
  );
}
