import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  BiBarChartAlt2, 
  BiArrowBack, 
  BiBook, 
  BiCalculator, 
  BiBot, 
  BiTestTube, 
  BiLeaf, 
  BiLaptop, 
  BiGlobe, 
  BiMoney, 
  BiBriefcase, 
  BiPlanet 
} from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { 
  getCutoffSEOConfig, 
  generateCutoffMetadata, 
  hasSubjectCutoffData,
  AVAILABLE_CUTOFF_SUBJECTS,
  CUTOFF_SUBJECT_NAMES 
} from '../../utils/cutoffSlugSEO';
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import CutoffTable from '../../components/CutoffTable';
import { loadSubjectData, CutoffTableData, SubjectConfig } from '../../utils/clientCutoffData';
import { getSubjectCutoffLastUpdated, getOtherPageLastUpdated } from '../../utils/lastUpdated';

// Subject icon mapping based on sidebar colors
const SUBJECT_ICONS: Record<string, { icon: any, color: string }> = {
  'chinese': { icon: BiBook, color: '#ff69b4' },
  'english': { icon: BiBook, color: '#40c4ff' },
  'math': { icon: BiCalculator, color: '#eab308' },
  'citizen': { icon: BiGlobe, color: '#28a745' },
  'physics': { icon: BiBot, color: '#6366f1' },
  'chemistry': { icon: BiTestTube, color: '#06b6d4' },
  'biology': { icon: BiLeaf, color: '#22c55e' },
  'ict': { icon: BiLaptop, color: '#ff3d00' },
  'm1': { icon: BiCalculator, color: '#b388ff' },
  'm2': { icon: BiCalculator, color: '#22d3ee' },
  'geography': { icon: BiGlobe, color: '#16a34a' },
  'economics': { icon: BiMoney, color: '#f97316' },
  'bafs': { icon: BiBriefcase, color: '#10b981' },
  'history': { icon: BiBook, color: '#ffab91' },
  'chinese-history': { icon: BiBook, color: '#ff1744' },
  'ths': { icon: BiPlanet, color: '#2196f3' }
};

export default function CutoffSubjectPage() {
  const router = useRouter();
  const { subject } = router.query;
  const subjectStr = Array.isArray(subject) ? subject[0] : subject;

  const [cutoffData, setCutoffData] = useState<CutoffTableData | null>(null);
  const [cutoffConfig, setCutoffConfig] = useState<SubjectConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get SEO configuration
  const seoConfig = subjectStr ? getCutoffSEOConfig(subjectStr) : null;
  const metadata = subjectStr ? generateCutoffMetadata(subjectStr) : null;
  const structuredData = generateSubjectStructuredData('cutoff');
  const faqData = generateSubjectFAQStructuredData('cutoff');
  const lastUpdated = subjectStr ? getSubjectCutoffLastUpdated(subjectStr) : null;

  // Load cutoff data for the subject
  useEffect(() => {
    if (!subjectStr) return;

    const loadData = async () => {
      setLoading(true);
      setError('');

      try {
        const { data, config } = await loadSubjectData(subjectStr);
        setCutoffData(data);
        setCutoffConfig(config);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cutoff data');
        setCutoffData(null);
        setCutoffConfig(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subjectStr]);

  // If no subject string, this will be handled by Next.js 404
  if (!subjectStr) {
    return null;
  }

  // Get other subjects for the bottom section
  const otherSubjects = AVAILABLE_CUTOFF_SUBJECTS.filter(s => s !== subjectStr);

  return (
    <>
      <Head>
        <title>{metadata?.title || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} Cut-off Scores`}</title>
        <meta name="description" content={metadata?.description || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} cut-off scores and grade boundaries`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata?.ogTitle || metadata?.title} />
        <meta property="og:description" content={metadata?.ogDescription || metadata?.description} />
        <meta property="og:image" content={metadata?.ogImage || "https://dse.best/assets/images/logo-icon.png"} />
        <meta property="og:url" content={metadata?.ogUrl || `https://dse.best/cutoff/${subjectStr}`} />
        <meta property="og:type" content={metadata?.ogType || "website"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata?.title} />
        <meta name="twitter:description" content={metadata?.description} />
        <meta name="twitter:image" content={metadata?.ogImage || "https://dse.best/assets/images/logo-icon.png"} />
        <link rel="canonical" href={`https://dse.best/cutoff/${subjectStr}`} />
        
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

              <li className="breadcrumb-item active" aria-current="page">
                {CUTOFF_SUBJECT_NAMES[subjectStr]}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <h1 className="mb-0">{seoConfig?.pageTitle || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} Cut-off Scores`}</h1>
          </div>
          
          <div className="mb-4">
            <p className="mb-3">
              {seoConfig?.pageDescriptionChi || `瀏覽DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]}的Cut-off分數及等級界線資料，助您了解各等級的達標分數要求。`}
            </p>
            <p className="mb-0">
              {seoConfig?.pageDescriptionEng || `Browse DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} cut-off scores and grade boundaries to understand the score requirements for each grade level.`}
            </p>
          </div>

          {/* Last Updated Message Bubble */}
          {lastUpdated && (
            <div className="alert alert-info alert-dismissible fade show mb-4" role="alert" style={{ backgroundColor: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1' }}>
              <div className="d-flex align-items-center">
                <svg className="bi flex-shrink-0 me-2" width="16" height="16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <div>
                  <strong>資料更新 Data Updated:</strong> {lastUpdated}
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show mb-4">
              <strong>錯誤 Error:</strong> {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
                aria-label="Close"
              />
            </div>
          )}

          {/* Cut-off Table */}
          <CutoffTable 
            data={cutoffData || {}}
            config={cutoffConfig || undefined}
            subject={subjectStr}
            loading={loading}
          />

          {/* Other Subjects Section */}
          {otherSubjects.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-4 text-center">DSE 科目分數線 | Cut-off scores for DSE Subjects</h3>
              <div className="row g-3">
                {otherSubjects.map((otherSubject) => {
                  const subjectIcon = SUBJECT_ICONS[otherSubject];
                  const IconComponent = subjectIcon?.icon || BiBarChartAlt2;
                  const iconColor = subjectIcon?.color || '#6c757d';
                  
                  return (
                    <div key={otherSubject} className="col-lg-4 col-md-6">
                      <NavigationLink href={`/cutoff/${otherSubject}`} className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm hover-card">
                          <div className="card-body d-flex align-items-center">
                            <div className="me-3">
                              <div className="bg-opacity-10 rounded-circle p-2" style={{ backgroundColor: `${iconColor}20` }}>
                                <IconComponent style={{ color: iconColor }} size={20} />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="card-title mb-0">{CUTOFF_SUBJECT_NAMES[otherSubject]}</h6>
                            </div>
                            <div>
                              <i className="bx bx-chevron-right text-muted"></i>
                            </div>
                          </div>
                        </div>
                      </NavigationLink>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Warning Message */}
          <div className="alert alert-warning mt-4 mb-0" role="alert">
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
