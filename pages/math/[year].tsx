import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { generateYearMeta } from '../../utils/yearSlugSEO'
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
  const mathPaperTypeMap: Record<string, string> = {
    'P1': 'Paper 1',
    'P2': 'Paper 2',
    'ans': 'Answers / Marking Scheme'
  };

  // Extract paper type from paperId (format: "2012_P1", "2012_P2", "2012_ans")
  const match = paperId.match(new RegExp(`${year}_(.+)`));
  if (!match) return null;

  const [, paperType] = match;
  const displayType = mathPaperTypeMap[paperType] || paperType.toUpperCase();

  return {
    paperId,
    title: displayType,
    description: `${year} ${displayType}`,
    language: 'eng' as 'chi' | 'eng', // Math papers are English only
    paperType: displayType
  };
}

export default function MathYearPage({ subject, year, papers, availableFiles }: YearPageProps) {
  // Use the clean single function approach
  const meta = generateYearMeta('math', year);
  const lastUpdated = getSubjectYearSlugLastUpdated('math');



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
        <meta property="og:url" content={`https://dse.best/math/${year}`} />
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
              "url": `https://dse.best/math/${year}`,
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
        <div className="breadcrumb-title pe-3">數學</div>
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

          {/* Papers Section */}
          <div className="mb-5">
            <h3 className="text-center mb-4">
              <span style={{ color: '#0d6efd' }}>English Past Papers</span>
            </h3>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {papers
                .sort((a, b) => {
                  // Sort order: Paper 1, Paper 2, then Answers
                  const order: Record<string, number> = { 'Paper 1': 1, 'Paper 2': 2, 'Answers / Marking Scheme': 3 };
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

          <hr className="my-4" />

          {/* Related Years */}
          <div className="mt-5 text-center">
            <h3 className="mb-4">其他年份 / Other Years</h3>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((yearNum) => {
                const isCurrentYear = yearNum === parseInt(year);
                return (
                  <NavigationLink
                    key={yearNum}
                    href={`/math/${yearNum}`}
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
            <h3>Need More Mathematics Papers?</h3>
            <p className="mb-4">Access all years (2012-2024), topic-based practice, and comprehensive study materials.</p>
            <NavigationLink 
              href="/math" 
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
              <span>View All Mathematics Papers (2012-2024)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </NavigationLink>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

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
    // Read math config file
    const configPath = path.join(process.cwd(), 'public', 'config', 'math.json');
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
        subject: 'math',
        year,
        papers,
        availableFiles
      }
    };
  } catch (error) {
    console.error(`Error loading math ${year}:`, error);
    return {
      notFound: true
    };
  }
}; 