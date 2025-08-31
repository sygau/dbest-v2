import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { generateYearMeta } from '../../utils/yearSlugSEO';
import { getSubjectYearSlugLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';

// Define types
interface YearPageProps {
  subject: string;
  year: string;
  papers: PaperData[];
  availableFiles: string[];
}

interface PaperData {
  paperId: string;
  title: string;
  description: string;
  language: 'chi' | 'eng';
  paperType: string;
}

// Helper function to get paper display info
function getPaperDisplayInfo(paperId: string, year: string): PaperData | null {
  const geographyPaperTypeMapEng: Record<string, string> = {
    'p1': 'Paper 1',
    'p2': 'Paper 2',
    'map': 'Map',
    'ans': 'Answers / Marking Scheme',
    'per': 'Performance Report'
  };

  const geographyPaperTypeMapChi: Record<string, string> = {
    'p1': '卷一',
    'p2': '卷二',
    'map': '地圖',
    'ans': '參考答案',
    'per': '考生表現報告'
  };

  // Extract paper type and language from paperId (format: "2012_p1_chi", "2012_p2_eng", etc.)
  const match = paperId.match(new RegExp(`${year}_(.+)_(chi|eng)`));
  if (!match) return null;

  const [, paperType, language] = match;
  const displayType = language === 'chi' 
    ? geographyPaperTypeMapChi[paperType] || paperType.toUpperCase()
    : geographyPaperTypeMapEng[paperType] || paperType.toUpperCase();

  return {
    paperId,
    title: displayType,
    description: `${year} ${displayType}`,
    language: language as 'chi' | 'eng',
    paperType: displayType
  };
}

export default function GeographyYearPage({ subject, year, papers, availableFiles }: YearPageProps) {
  // Use the clean single function approach
  const meta = generateYearMeta('geography', year);
  const lastUpdated = getSubjectYearSlugLastUpdated('geography');

  // Separate papers by language
  const chinesePapers = papers.filter(paper => paper.language === 'chi');
  const englishPapers = papers.filter(paper => paper.language === 'eng');

  return (
    <>
      <Head>
        <title>{meta.seoTitle}</title>
        <meta name="description" content={meta.seoDescription} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={meta.seoTitle} />
        <meta property="og:description" content={meta.seoDescription} />
        <meta property="og:image" content="https://dse.best/assets/images/logo-icon.webp" />
        <meta property="og:url" content={`https://dse.best/geography/${year}`} />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": meta.seoTitle,
              "description": meta.seoDescription,
              "url": `https://dse.best/geography/${year}`,
              "mainEntity": {
                "@type": "EducationalResource",
                "name": meta.seoTitle,
                "description": meta.seoDescription,
                "educationalLevel": "Secondary Education",
                "inLanguage": ["zh-HK", "en-HK"]
              }
            })
          }}
        />
      </Head>

      {/*breadcrumb*/}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">地理</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">
                DSE Past Paper
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <h1 className="mb-4">{meta.pageTitle}</h1>

          <p className="mb-4">
            {meta.pageDescriptionChi}
            <br />
            <br />
            {meta.pageDescriptionEng}
          </p>

          <LastUpdatedAlert date={lastUpdated} />

          <br />
          <hr className="my-4" />
          <br />

          {/* Chinese Papers Section */}
          {chinesePapers.length > 0 && (
            <div className="mb-5">
              <h3 className="text-center mb-4">
                <span style={{ color: '#dc3545' }}>中文試題</span>
              </h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {chinesePapers
                  .sort((a, b) => {
                    // Sort order: Paper 1, Paper 2, Map, then Answers, then Performance
                    const order: Record<string, number> = { '卷一': 1, '卷二': 2, '地圖': 3, '參考答案': 4, '考生表現報告': 5 };
                    return (order[a.paperType] || 999) - (order[b.paperType] || 999);
                  })
                  .map((paper) => (
                  <div key={paper.paperId} className="col">
                    <div className="card h-100 d-flex flex-column border-danger border-2">
                      <div className="card-body">
                        <h5 className="card-title">{paper.title}</h5>
                        <p className="card-text">{paper.description}</p>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <a
                          href="#"
                          className="btn btn-danger px-4 d-inline-flex gap-2"
                          data-paper-id={paper.paperId}
                        >
                          <BiDownload style={{ fontSize: 22 }} />
                          下載
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* English Papers Section */}
          {englishPapers.length > 0 && (
            <div className="mb-5">
              <h3 className="text-center mb-4">
                <span style={{ color: '#0d6efd' }}>English Papers</span>
              </h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {englishPapers
                  .sort((a, b) => {
                    // Sort order: Paper 1, Paper 2, Map, then Answers, then Performance
                    const order: Record<string, number> = { 'Paper 1': 1, 'Paper 2': 2, 'Map': 3, 'Answers / Marking Scheme': 4, 'Performance Report': 5 };
                    return (order[a.paperType] || 999) - (order[b.paperType] || 999);
                  })
                  .map((paper) => (
                  <div key={paper.paperId} className="col">
                    <div className="card h-100 d-flex flex-column border-primary border-2">
                      <div className="card-body">
                        <h5 className="card-title">{paper.title}</h5>
                        <p className="card-text">{paper.description}</p>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <a
                          href="#"
                          className="btn btn-primary px-4 d-inline-flex gap-2"
                          data-paper-id={paper.paperId}
                        >
                          <BiDownload style={{ fontSize: 22 }} />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="my-4" />

          {/* Related Years */}
          <div className="mt-5 text-center">
            <h3 className="mb-4">其他年份 / Other Years</h3>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((yearNum) => {
                const isCurrentYear = yearNum === parseInt(year);
                return (
                  <NavigationLink
                    key={yearNum}
                    href={`/geography/${yearNum}`}
                    className={`btn ${isCurrentYear ? 'btn-active' : 'btn-inactive'}`}
                    style={{
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: 'none',
                      backgroundColor: isCurrentYear ? 'linear-gradient(135deg, rgb(38, 111, 201), rgb(26, 79, 138))' : '#1e293b',
                      color: isCurrentYear ? '#ffffff' : '#d1d5db',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      minWidth: '60px',
                      textAlign: 'center',
                      boxShadow: isCurrentYear ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                    onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (!isCurrentYear) {
                        e.currentTarget.style.backgroundColor = '#334155';
                        e.currentTarget.style.color = '#f3f4f6';
                      }
                    }}
                    onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (!isCurrentYear) {
                        e.currentTarget.style.backgroundColor = '#1e293b';
                        e.currentTarget.style.color = '#d1d5db';
                      }
                    }}
                    onFocus={(e: React.FocusEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.outline = '2px solid #93c5fd';
                    }}
                    onBlur={(e: React.FocusEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    {yearNum}
                  </NavigationLink>
                );
              })}
            </div>
          </div>

          {/* CTA to Main Page */}
          <div className="text-center mt-5 mb-5">
            <h3>Need More Geography Papers?</h3>
            <p className="mb-4">Access all years (2012-2023), topic-based practice, and comprehensive study materials.</p>
            <NavigationLink 
              href="/geography" 
              className="btn btn-primary btn-lg d-inline-flex align-items-center gap-3"
              style={{
                borderRadius: '25px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(13, 110, 253, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
                background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                minWidth: '300px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(13, 110, 253, 0.4)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
              }}
            >
              <span>View All Geography Papers (2012-2023)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NavigationLink>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

  const paths = years.map((year) => ({
    params: { year }
  }));

  return {
    paths,
    fallback: false // No fallback for static export
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;

  if (!year) {
    return {
      notFound: true
    };
  }

  try {
    // Read geography config file
    const configPath = path.join(process.cwd(), 'public', 'config', 'geography.json');
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Filter papers for the specific year
    const availableFiles = Object.keys(configData).filter(key =>
      key.startsWith(year) || key.includes(year)
    );

    // Generate paper data
    const papers = availableFiles
      .map(file => getPaperDisplayInfo(file, year))
      .filter(paper => paper !== null) as PaperData[];

    return {
      props: {
        subject: 'geography',
        year,
        papers,
        availableFiles
      }
    };
  } catch (error) {
    console.error(`Error loading geography ${year}:`, error);
    return {
      notFound: true
    };
  }
}; 