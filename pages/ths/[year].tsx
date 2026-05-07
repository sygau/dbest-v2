import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import { useRouter } from 'next/router'
import { BiDownload } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { generateYearMeta } from '../../utils/yearSlugSEO';
import { buildYearSlugJsonLd } from '../../data/jsonld/year-slug';
import { getSubjectYearSlugLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';

// Available years for this subject
const AVAILABLE_YEARS = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

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
  const thsPaperTypeMap: Record<string, string> = {
    'p1': '卷一',
    'p2': '卷二',
    'ans': '參考答案',
    'per': '考生表現'
  };

  // Extract paper type from paperId (format: "2012_p1_chi", "2012_p2_chi", "2012_ans_chi")
  const match = paperId.match(new RegExp(`${year}_(.+)_chi`));
  if (!match) return null;

  const [, paperType] = match;
  const displayType = thsPaperTypeMap[paperType] || paperType.toUpperCase();

  return {
    paperId,
    title: displayType,
    description: `${year} ${displayType} (中文)`,
    language: 'chi' as 'chi' | 'eng',
    paperType: displayType
  };
}

export default function THSYearPage({ subject, year, papers, availableFiles }: YearPageProps) {
  const router = useRouter()

  // Use the clean single function approach
  const meta = generateYearMeta('ths', year);
  const lastUpdated = getSubjectYearSlugLastUpdated('ths');

  // If the page is not yet generated, this will be displayed
  // until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageSEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        ogImage="https://dse.best/assets/images/logo-icon.webp"
        ogUrl={`https://dse.best/ths/${year}`}
        robots={['index', 'follow']}
        jsonLd={[buildYearSlugJsonLd('ths', year)]}
      />
      <PageBreadcrumb section="旅遊與款待" text={year} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <div key={paper.paperId} className="col">
                <div className="card h-full flex flex-col">
                  <div className="card-body">
                    <h5 className="card-title">{paper.title}</h5>
                    <p className="card-text">{paper.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <a href="#" className="btn btn-info px-4 inline-flex gap-2" data-paper-id={paper.paperId}>
                      <BiDownload style={{ fontSize: 22 }} />下載
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                href={`/ths/${yearNum}`}
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
        <h3>需要更多旅遊與款待試題？</h3>
        <p className="mb-4">瀏覽所有年份 (2012-2023) 的完整試題集合。</p>
        <NavigationLink 
          href="/ths" 
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
          <span>瀏覽所有旅遊與款待試題 (2012-2023)</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
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
    // Read ths config file
    const configPath = path.join(process.cwd(), 'public', 'config', 'ths.json');
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
        subject: 'ths',
        year,
        papers,
        availableFiles
      }
    };
  } catch (error) {
    console.error(`Error loading ths ${year}:`, error);
    return {
      notFound: true
    };
  }
}; 