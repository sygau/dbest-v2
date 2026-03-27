import React from 'react';
import Head from 'next/head';
import { BiBarChartAlt2, BiTrendingUp, BiBookOpen, BiBook, BiCalculator, BiBot, BiTestTube, BiLeaf, BiLaptop, BiGlobe, BiMoney, BiBriefcase, BiPlanet } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { AVAILABLE_CUTOFF_SUBJECTS, CUTOFF_SUBJECT_NAMES } from '../../utils/cutoffSlugSEO';
import { getPageMetadata } from '../../utils/pageMetadata';
import { generateSubjectStructuredData, generatePageFAQStructuredData } from '../../utils/structuredData';
import { getCutoffIndexLastUpdated } from '../../utils/lastUpdated';

const SUBJECT_STYLES: Record<string, { icon: any; color: string }> = {
  chinese: { icon: BiBook, color: '#ff69b4' },
  english: { icon: BiBook, color: '#40c4ff' },
  math: { icon: BiCalculator, color: '#eab308' },
  citizen: { icon: BiGlobe, color: '#28a745' },
  physics: { icon: BiBot, color: '#6366f1' },
  chemistry: { icon: BiTestTube, color: '#06b6d4' },
  biology: { icon: BiLeaf, color: '#22c55e' },
  ict: { icon: BiLaptop, color: '#ff3d00' },
  m1: { icon: BiCalculator, color: '#b388ff' },
  m2: { icon: BiCalculator, color: '#22d3ee' },
  geography: { icon: BiGlobe, color: '#16a34a' },
  economics: { icon: BiMoney, color: '#f97316' },
  bafs: { icon: BiBriefcase, color: '#10b981' },
  history: { icon: BiBook, color: '#ffab91' },
  'chinese-history': { icon: BiBook, color: '#ff1744' },
  ths: { icon: BiPlanet, color: '#2196f3' },
};

export default function CutoffIndexPage() {
  const metadata = getPageMetadata('cutoff') || {
    title: '【DSE Cut Off 分數】全港最齊 2012–2025 全部科目等級分界線｜英文、中文、數學等',
    description: '【DSE Cut Off 分數一覽】全港最齊2012–2025年全部科目等級分界線！涵蓋英文、中文、數學、物理、化學、生物、ICT、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術等。做完past paper？立即對cut off分數，精準預測你嘅DSE Level！',
  };
  const structuredData = generateSubjectStructuredData('cutoff');
  const faqData = generatePageFAQStructuredData('cutoff');
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
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        {faqData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
          />
        )}
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
        <div className="card-body" style={{ fontFamily: "var(--font-noto-sans-hk), 'PingFang HK', 'Microsoft JhengHei', -apple-system, BlinkMacSystemFont, sans-serif" }}>
          <div className="d-flex align-items-center mb-4">
            <h1 className="mb-0">DSE Cut-off Scores 分數線 (2012-2025)</h1>
          </div>
          
          <p className="mb-4 lead">
            歡迎瀏覽DSE各科目的Cut Off資料，包括英文、中文、數學、物理、化學、生物、ICT、M1、M2、地理、經濟、BAFS、歷史、中國歷史、旅遊與款待等科目。在此，您可以找到按年份排列的等級Cut Off，助您了解各等級的達標分數。
            <br />
            <br />
            Welcome to browse DSE cut-off scores for all subjects including English, Chinese, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2, Geography, Economics, BAFS, History, Chinese History, Tourism & Hospitality and more. Here you can find grade boundaries arranged by year to help you understand the score requirements for each grade level.
          </p>

          {/* Subject Grid */}
          <div className="cutoff-subject-list mb-4">
            {AVAILABLE_CUTOFF_SUBJECTS.map((subject) => {
              const subjectStyle = SUBJECT_STYLES[subject];
              const IconComponent = subjectStyle?.icon || BiTrendingUp;
              const accentColor = subjectStyle?.color || '#2563eb';

              return (
                <NavigationLink
                  key={subject}
                  href={`/cutoff/${subject}`}
                  className="text-decoration-none d-block mb-2"
                >
                  <div
                    className="cutoff-subject-row"
                    style={{
                      border: `1px solid ${accentColor}44`,
                      background: `linear-gradient(90deg, ${accentColor}1a, rgba(15, 23, 42, 0.012))`,
                      boxShadow: `0 10px 24px ${accentColor}1f`,
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 cutoff-subject-left">
                      <div
                        className="cutoff-subject-icon-wrapper"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}22, rgba(59, 130, 246, 0.15))`,
                        }}
                      >
                        <IconComponent
                          className="cutoff-subject-icon"
                          size={22}
                          style={{ color: accentColor }}
                        />
                      </div>
                      <div className="cutoff-subject-text">
                        <div className="cutoff-subject-name">
                          {CUTOFF_SUBJECT_NAMES[subject]}
                        </div>
                        <div className="cutoff-subject-subtitle text-muted">
                          Click to view
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 cutoff-subject-meta">
                      <span
                        className="cutoff-year-pill"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}18)`,
                        }}
                      >
                        2012–2025
                      </span>
                      <i className="bx bx-chevron-right text-muted"></i>
                    </div>
                  </div>
                </NavigationLink>
              );
            })}
          </div>

          {/* Information Section */}
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <div className="card h-100" style={{ border: '1px solid var(--bs-border-color)' }}>
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
              <div className="card h-100" style={{ border: '1px solid var(--bs-border-color)' }}>
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
                Cut-off分數資料來源於學生提交，並定期更新以確保準確性。
                <br />
                <small className="text-muted">
                  Cut-off score data is sourced from student submissions, and is regularly updated to ensure accuracy.
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
          <div className="alert alert-warning mb-4" role="alert">
            <div className="d-flex align-items-start">
              <div>
                <strong>注意事項 Important Notice:</strong>
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
        .cutoff-subject-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .cutoff-subject-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 999px;
        }

        .cutoff-subject-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(16, 185, 129, 0.15));
        }

        .cutoff-subject-icon {
          color: #2563eb;
        }

        .cutoff-subject-name {
          font-weight: 600;
          font-size: 0.98rem;
        }

        .cutoff-subject-subtitle {
          font-size: 0.78rem;
        }

        .cutoff-year-pill {
          padding: 0.18rem 0.55rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--bs-body-color);
        }


        @media (max-width: 576px) {
          .cutoff-subject-row {
            padding-inline: 0.75rem;
          }
          .cutoff-year-pill {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
