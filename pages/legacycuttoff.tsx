import Head from 'next/head'
import { useState, useEffect } from 'react';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../utils/structuredData';
import { getPageMetadata } from '../utils/pageMetadata';
import CutoffTable from '../components/CutoffTable';
import { loadSubjectData, CutoffTableData, SubjectConfig } from '../utils/clientCutoffData';
import { getOtherPageLastUpdated } from '../utils/lastUpdated';

export default function CutoffPage() {
  const metadata = getPageMetadata('cutoff');
  const structuredData = generateSubjectStructuredData('cutoff');
  const faqData = generateSubjectFAQStructuredData('cutoff');
  
  const [selectedSubject, setSelectedSubject] = useState('english');
  const [cutoffData, setCutoffData] = useState<CutoffTableData | null>(null);
  const [cutoffConfig, setCutoffConfig] = useState<SubjectConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lastUpdated = getOtherPageLastUpdated('cutoff');

  const handleSubjectChange = async (subject: string) => {
    setSelectedSubject(subject);
    
    if (!subject) {
      setCutoffData(null);
      setCutoffConfig(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, config } = await loadSubjectData(subject);
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

  // Load English data by default when page loads
  useEffect(() => {
    handleSubjectChange('english');
  }, []);



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
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
        {faqData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqData)
            }}
          />
        )}
      </Head>

      {/* Page Header */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">其他</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">
                DSE Cut Off Scores
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <h1 className="mb-4">DSE Cut-Off 分數</h1>
          <p className="mb-4">
            歡迎瀏覽DSE各科目的Cut Off資料，包括英文、中文、數學、物理、化學、生物、ICT、M1、M2、地理、經濟、BAFS、歷史、中國歷史、旅遊與款待等科目。在此，您可以找到按年份排列的等級Cut Off，助您了解各等級的達標分數。
            <br />
            <br />
            Welcome to browse DSE cut-off scores for all subjects including English, Chinese, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2, Geography, Economics, BAFS, History, Chinese History, Tourism & Hospitality and more. Here you can find grade boundaries arranged by year to help you understand the score requirements for each grade level.
          </p>
          {lastUpdated && (
            <div className="alert alert-info alert-dismissible fade show mb-4" role="alert" style={{ backgroundColor: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1' }}>
              <div className="d-flex align-items-center">
                <svg className="bi flex-shrink-0 me-2" width="16" height="16" fill="currentColor">
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <div>
                  <strong>資料更新 Data Updated:</strong> {lastUpdated}
                </div>
              </div>
            </div>
          )}
          {/* Subject Selection */}
          <div className="row mb-4">
            <div className="col-md-12">
              <label htmlFor="subjectSelect" className="form-label">
                <BiBarChartAlt2 className="me-2" />
                選擇科目 Select Subject
              </label>
              <select 
                className="form-select" 
                id="subjectSelect"
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
              >
                <option value="english">英文 English</option>
                <option value="chinese">中文 Chinese</option>
                <option value="math">數學 Mathematics</option>
                <option value="physics">物理 Physics</option>
                <option value="chemistry">化學 Chemistry</option>
                <option value="biology">生物 Biology</option>
                <option value="ict">資訊及通訊科技 ICT</option>
                <option value="m1">數學延伸部分 M1</option>
                <option value="m2">數學延伸部分 M2</option>
                <option value="geography">地理 Geography</option>
                <option value="economics">經濟 Economics</option>
                <option value="bafs">企業、會計與財務概論 BAFS</option>
                <option value="history">歷史 History</option>
                <option value="chinese-history">中國歷史 Chinese History</option>
                <option value="ths">旅遊與款待 Tourism & Hospitality</option>
              </select>
            </div>
          </div>

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
            subject={selectedSubject}
            loading={loading}
          />

          {/* Warning Message */}
          <div className="alert alert-warning mt-4 mb-0" role="alert">
            <div className="d-flex align-items-start">
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use href="#exclamation-triangle-fill"/>
              </svg>
              <div>
                <strong>⚠️ 注意事項：</strong>
                <br />
                Cut Off 資料僅供參考，可能存有錯誤，並會按年更新。
                <br />
                <small className="text-muted">
                  This cut-off score data is for reference only. It may contain errors and is subject to change annually.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 