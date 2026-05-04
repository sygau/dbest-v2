import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import { BiDownload } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { generateYearMeta } from '../../utils/yearSlugSEO'
import { getSubjectYearSlugLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';

// Available years for this subject
const AVAILABLE_YEARS = ['2024'];

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
  language: 'chi';
  paperType: string;
}

// Helper function to get paper display info
function getPaperDisplayInfo(paperId: string, year: string): PaperData | null {
  const citizenPaperTypeMap: Record<string, string> = {
    'question': '問題簿',
    'answer': '答題簿'
  };

  // Extract paper type from paperId (format: "2024_question", "2024_answer", "sp_question", "sp_answer")
  const match = paperId.match(new RegExp(`(?:${year}|sp)_(.+)`));
  if (!match) return null;

  const [, paperType] = match;
  const displayType = citizenPaperTypeMap[paperType] || paperType.toUpperCase();

  return {
    paperId,
    title: displayType,
    description: paperId.startsWith('sp') ? `Sample ${displayType}` : `${year} ${displayType}`,
    language: 'chi' as 'chi',
    paperType
  };
}

export default function CitizenYearPage({ subject, year, papers, availableFiles }: YearPageProps) {
  const lastUpdated = getSubjectYearSlugLastUpdated('citizen');
  
  // Generate meta data for this specific year page
  const meta = generateYearMeta('citizen', year);

  return (
    <>
      <PageSEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        ogImage="https://dse.best/assets/images/logo-icon.png"
        ogUrl={`https://dse.best/citizen/${year}`}
        robots={['index', 'follow']}
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": meta.seoTitle,
          "description": meta.seoDescription,
          "url": `https://dse.best/citizen/${year}`,
          "mainEntity": {
            "@type": "Dataset",
            "name": `DSE 公民與社會發展科 ${year} 歷屆試題`,
            "description": `${year}年香港中學文憑試公民與社會發展科試卷及答案`,
            "keywords": [`DSE ${year}`, "公民與社會發展科", "Citizenship and Social Development", "Past Papers"],
            "creator": {
              "@type": "Organization",
              "name": "dse.best"
            }
          }
        }]}
      />

      {/* Breadcrumb */}
      <PageBreadcrumb section="公民與社會發展科" text={year} />

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <h1 className="mb-4">DSE 公民與社會發展科 {year} 歷屆試題</h1>
          <p className="mb-4">
            {year}年香港中學文憑試公民與社會發展科試卷及答案。包含問題簿、答題簿，助您掌握考試趨勢。
          </p>
          
          <LastUpdatedAlert date={lastUpdated} />
          <br />
          <hr className="my-4" />
          
          {/* Papers Grid */}
          {papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers.map((paper) => (
                <div key={paper.paperId} className="col">
                  <div className="card h-full flex flex-col">
                    <div className="card-body">
                      <h5 className="card-title">{paper.title}</h5>
                      <p className="card-text">{paper.description}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <a
                        href="#"
                        className="btn btn-info px-4 inline-flex gap-2"
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
          ) : (
            <div className="bg-blue-50 border border-blue-400 text-blue-800 px-4 py-3 rounded" role="alert">
              <h5 className="font-semibold mb-2">暫無{year}年試卷</h5>
              <p className="mb-0">
                {year}年公民與社會發展科試卷尚未上載，請稍後再查看或瀏覽其他年份的試卷。
              </p>
            </div>
          )}

          <hr className="my-4" />

          {/* Year Navigation */}
          <div className="mt-5">
            <div>
              <h3 className="mb-4">其他年份</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {AVAILABLE_YEARS.map((yearStr) => {
                  const yearNum = parseInt(yearStr);
                  const isCurrentYear = yearNum === parseInt(year);
                  return (
                    <NavigationLink
                      key={yearNum}
                      href={`/citizen/${yearNum}`}
                      className={`btn ${isCurrentYear ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                      style={{
                        minWidth: '60px',
                        fontWeight: isCurrentYear ? '600' : '400',
                        transition: 'all 0.2s ease',
                        cursor: isCurrentYear ? 'default' : 'pointer'
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (!isCurrentYear) {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.backgroundColor = '#0d6efd';
                          e.currentTarget.style.borderColor = '#0d6efd';
                        }
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (!isCurrentYear) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.color = '#0d6efd';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#0d6efd';
                        }
                      }}
                    >
                      {yearNum}
                    </NavigationLink>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA to Main Page */}
          <div className="text-center mt-5 mb-5">
            <h3>Need More Citizen Papers?</h3>
            <p className="mb-4">Access all years (2024+), sample papers, and comprehensive study materials.</p>
            <NavigationLink 
              href="/citizen" 
              className="btn btn-primary btn-lg inline-flex align-items-center gap-3"
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
              <span>View All Citizen Papers (2024+)</span>
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
    // Read citizen config file
    const configPath = path.join(process.cwd(), 'public', 'config', 'citizen.json');
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
        subject: 'citizen',
        year,
        papers,
        availableFiles
      }
    };
  } catch (error) {
    console.error(`Error loading citizen ${year}:`, error);
    return {
      notFound: true
    };
  }
};
