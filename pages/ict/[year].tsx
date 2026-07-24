import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import { BiDownload } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { generateYearMeta } from '../../utils/yearSlugSEO';
import { getSubjectYearSlugLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';

// Available years for this subject
const AVAILABLE_YEARS = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

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
  const ictPaperTypeMapEng: Record<string, string> = {
    'p1': 'Paper 1',
    'p2a': 'Paper 2A',
    'p2b': 'Paper 2B',
    'p2c': 'Paper 2C',
    'p2d': 'Paper 2D',
    'ans': 'Answers / Marking Scheme',
    'per': 'Performance Report'
  };

  const ictPaperTypeMapChi: Record<string, string> = {
    'p1': '卷一',
    'p2a': '卷二A',
    'p2b': '卷二B',
    'p2c': '卷二C',
    'p2d': '卷二D',
    'ans': '參考答案',
    'per': '考生表現報告'
  };

  // Extract paper type and language from paperId (format: "2012_p1_chi", "2012_p2a_eng", etc.)
  const match = paperId.match(new RegExp(`${year}_(.+)_(chi|eng)`));
  if (!match) return null;

  const [, paperType, language] = match;
  const displayType = language === 'chi' 
    ? ictPaperTypeMapChi[paperType] || paperType.toUpperCase()
    : ictPaperTypeMapEng[paperType] || paperType.toUpperCase();

  return {
    paperId,
    title: displayType,
    description: `${year} ${displayType}`,
    language: language as 'chi' | 'eng',
    paperType: displayType
  };
}

export default function ICTYearPage({ subject, year, papers, availableFiles }: YearPageProps) {
  // Use the clean single function approach
  const meta = generateYearMeta('ict', year);
  const lastUpdated = getSubjectYearSlugLastUpdated('ict');

  // Separate papers by language
  const chinesePapers = papers.filter(paper => paper.language === 'chi');
  const englishPapers = papers.filter(paper => paper.language === 'eng');

  return (
    <>
      <PageSEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        ogImage="https://dse.best/assets/images/logo-icon.webp"
        ogUrl={`https://dse.best/ict/${year}`}
        robots={['index', 'follow']}
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": meta.seoTitle,
          "description": meta.seoDescription,
          "url": `https://dse.best/ict/${year}`,
          "mainEntity": {
            "@type": "EducationalResource",
            "name": meta.seoTitle,
            "description": meta.seoDescription,
            "educationalLevel": "Secondary Education",
            "inLanguage": ["zh-HK", "en-HK"]
          }
        }]}
      />

      {/*breadcrumb*/}
      <PageBreadcrumb section="ICT" text="DSE Past Paper" />

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chinesePapers
                  .sort((a, b) => {
                    // Sort order: Paper 1, Paper 2A, Paper 2B, Paper 2C, Paper 2D, then Answers, then Performance
                    const order: Record<string, number> = { '卷一': 1, '卷二A': 2, '卷二B': 3, '卷二C': 4, '卷二D': 5, '參考答案': 6, '考生表現報告': 7 };
                    return (order[a.paperType] || 999) - (order[b.paperType] || 999);
                  })
                  .map((paper) => (
                  <div key={paper.paperId} className="col">
                    <div className="flex flex-col h-full rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-card-inner-bg)' }}>
                      <div className="p-4 flex-1">
                        <h5 className="font-bold text-lg mb-2" style={{ color: 'var(--color-heading)' }}>{paper.title}</h5>
                        <p className="text-sm" style={{ color: 'var(--color-body)', opacity: 0.8 }}>{paper.description}</p>
                      </div>
                      <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <a
                          href="https://www.threads.com/@ethanchk91/post/DV1K7wVk51J"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {englishPapers
                  .sort((a, b) => {
                    // Sort order: Paper 1, Paper 2A, Paper 2B, Paper 2C, Paper 2D, then Answers, then Performance
                    const order: Record<string, number> = { 'Paper 1': 1, 'Paper 2A': 2, 'Paper 2B': 3, 'Paper 2C': 4, 'Paper 2D': 5, 'Answers / Marking Scheme': 6, 'Performance Report': 7 };
                    return (order[a.paperType] || 999) - (order[b.paperType] || 999);
                  })
                  .map((paper) => (
                  <div key={paper.paperId} className="col">
                    <div className="flex flex-col h-full rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-card-inner-bg)' }}>
                      <div className="p-4 flex-1">
                        <h5 className="font-bold text-lg mb-2" style={{ color: 'var(--color-heading)' }}>{paper.title}</h5>
                        <p className="text-sm" style={{ color: 'var(--color-body)', opacity: 0.8 }}>{paper.description}</p>
                      </div>
                      <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <a
                          href="https://www.threads.com/@ethanchk91/post/DV1K7wVk51J"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
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

        </div>
      </div>

      {/* Related Years */}
          <div className="mt-5 text-center">
            <h3 className="mb-4">其他年份 / Other Years</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {AVAILABLE_YEARS.map((yearStr) => {
                const yearNum = parseInt(yearStr);
                const isCurrentYear = yearNum === parseInt(year);
                return (
                  <NavigationLink
                    key={yearNum}
                    href={`/ict/${yearNum}`}
                    className={`btn ${isCurrentYear ? 'btn-active' : 'btn-inactive'}`}
                    style={{
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: 'none',
                      background: isCurrentYear ? '#0d6efd' : 'var(--color-card-inner-bg)',
                      color: isCurrentYear ? '#ffffff' : 'var(--color-body)',
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
                        e.currentTarget.style.backgroundColor = 'var(--color-card-inner-bg)';
                        e.currentTarget.style.color = 'var(--color-body)';
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
            <h3>Need More ICT Papers?</h3>
            <p className="mb-4">Access all years (2012-2025), topic-based practice, and comprehensive study materials.</p>
            <NavigationLink 
              href="/ict" 
              className="btn btn-primary btn-lg inline-flex align-items-center gap-3"
              style={{
                borderRadius: '25px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                border: 'none',
                background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                minWidth: '300px',
                justifyContent: 'center'
              }}
            >
              <span>View All ICT Papers (2012-2025)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NavigationLink>
          </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = AVAILABLE_YEARS.map((year) => ({
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
    // Read ict config file
    const configPath = path.join(process.cwd(), 'public', 'config', 'ict.json');
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
        subject: 'ict',
        year,
        papers,
        availableFiles
      }
    };
  } catch (error) {
    console.error(`Error loading ict ${year}:`, error);
    return {
      notFound: true
    };
  }
}; 