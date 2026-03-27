import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';

export default function EnglishPage() {
  const metadata = getSubjectMetadata('english');

    const subjectKey = 'english';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);
    const lastUpdated = getSubjectIndexLastUpdated(subjectKey);

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

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">英文</div>
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
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">DSE 英文 歷屆試題 Past Papers (By year)</h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE English 英文歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE English Language past papers. Here you can find comprehensive English Language examination materials including reading comprehension, writing tasks, listening exercises, and speaking assessments arranged by year, along with detailed marking schemes and sample answers to enhance your DSE English Language preparation.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    
                    {/* Navigation Section */}
                    <div className="text-center mb-4">
                        {/* All Years Row */}
                        <div className="mb-2 d-flex flex-wrap justify-content-center align-items-center">
                            <a href="#year-2024" className="text-decoration-none text-info fw-bold nav-link-year">2024</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2023" className="text-decoration-none text-info fw-bold nav-link-year">2023</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2022" className="text-decoration-none text-info fw-bold nav-link-year">2022</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2021" className="text-decoration-none text-info fw-bold nav-link-year">2021</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2020" className="text-decoration-none text-info fw-bold nav-link-year">2020</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2019" className="text-decoration-none text-info fw-bold nav-link-year">2019</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2018" className="text-decoration-none text-info fw-bold nav-link-year">2018</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2017" className="text-decoration-none text-info fw-bold nav-link-year">2017</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2016" className="text-decoration-none text-info fw-bold nav-link-year">2016</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2015" className="text-decoration-none text-info fw-bold nav-link-year">2015</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2014" className="text-decoration-none text-info fw-bold nav-link-year">2014</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2013" className="text-decoration-none text-info fw-bold nav-link-year">2013</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2012" className="text-decoration-none text-info fw-bold nav-link-year">2012</a>
                        </div>
                        {/* Sections Row */}
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            <a href="#practice-papers" className="text-decoration-none text-info fw-bold nav-link-section">Practice Papers</a>
                            <span className="nav-separator">|</span>
                            <a href="#sample-papers" className="text-decoration-none text-info fw-bold nav-link-section">Sample Papers</a>
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    {/* Year-wise Past Paper Listing */}
                    <PaperSection id="year-2024" title="2024">
                        <DownloadCard title="Paper 1 Reading" description="2024 Paper 1: Reading" paperId="2024_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2024 Paper 2: Writing" paperId="2024_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2024 Paper 3: Listening & Integrated Skills" paperId="2024_P3" />
                        <DownloadCard title="Answers" description="2024 Answer Booklet" paperId="2024_ans" />
                    </PaperSection>
                    <PaperSection id="year-2023" title="2023">
                        <DownloadCard title="Paper 1 Reading" description="2023 Paper 1: Reading" paperId="2023_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2023 Paper 2: Writing" paperId="2023_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2023 Paper 3: Listening & Integrated Skills" paperId="2023_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2023 Paper 4: Speaking" paperId="2023_P4" />
                        <DownloadCard title="Performance Descriptors" description="2023 Performance Descriptors" paperId="2023_per" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet" paperId="2023_ans" />
                    </PaperSection>
                    <PaperSection id="year-2022" title="2022">
                        <DownloadCard title="Paper 1 Reading" description="2022 Paper 1: Reading" paperId="2022_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2022 Paper 2: Writing" paperId="2022_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2022 Paper 3: Listening & Integrated Skills" paperId="2022_P3" />
                        <DownloadCard title="Performance Descriptors" description="2022 Performance Descriptors" paperId="2022_per" />
                        <DownloadCard title="Answers" description="2022 Answer Booklet" paperId="2022_ans" />
                    </PaperSection>
                    <PaperSection id="year-2021" title="2021">
                        <DownloadCard title="Paper 1 Reading" description="2021 Paper 1: Reading" paperId="2021_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2021 Paper 2: Writing" paperId="2021_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2021 Paper 3: Listening & Integrated Skills" paperId="2021_P3" />
                        <DownloadCard title="Performance Descriptors" description="2021 Performance Descriptors" paperId="2021_per" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet" paperId="2021_ans" />
                    </PaperSection>
                    <PaperSection id="year-2020" title="2020">
                        <DownloadCard title="Paper 1 Reading" description="2020 Paper 1: Reading" paperId="2020_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2020 Paper 2: Writing" paperId="2020_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2020 Paper 3: Listening & Integrated Skills" paperId="2020_P3" />
                        <DownloadCard title="Performance Descriptors" description="2020 Performance Descriptors" paperId="2020_per" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet" paperId="2020_ans" />
                    </PaperSection>
                    <PaperSection id="year-2019" title="2019">
                        <DownloadCard title="Paper 1 Reading" description="2019 Paper 1: Reading" paperId="2019_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2019 Paper 2: Writing" paperId="2019_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2019 Paper 3: Listening & Integrated Skills" paperId="2019_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2019 Paper 4: Speaking" paperId="2019_P4" />
                        <DownloadCard title="Performance Descriptors" description="2019 Performance Descriptors" paperId="2019_per" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet" paperId="2019_ans" />
                    </PaperSection>
                    <PaperSection id="year-2018" title="2018">
                        <DownloadCard title="Paper 1 Reading" description="2018 Paper 1: Reading" paperId="2018_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2018 Paper 2: Writing" paperId="2018_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2018 Paper 3: Listening & Integrated Skills" paperId="2018_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2018 Paper 4: Speaking" paperId="2018_P4" />
                        <DownloadCard title="Performance Descriptors" description="2018 Performance Descriptors" paperId="2018_per" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet" paperId="2018_ans" />
                    </PaperSection>
                    <PaperSection id="year-2017" title="2017">
                        <DownloadCard title="Paper 1 Reading" description="2017 Paper 1: Reading" paperId="2017_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2017 Paper 2: Writing" paperId="2017_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2017 Paper 3: Listening & Integrated Skills" paperId="2017_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2017 Paper 4: Speaking" paperId="2017_P4" />
                        <DownloadCard title="Performance Descriptors" description="2017 Performance Descriptors" paperId="2017_per" />
                        <DownloadCard title="Answers" description="2017 Answer Booklet" paperId="2017_ans" />
                    </PaperSection>
                    <PaperSection id="year-2016" title="2016">
                        <DownloadCard title="Paper 1 Reading" description="2016 Paper 1: Reading" paperId="2016_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2016 Paper 2: Writing" paperId="2016_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2016 Paper 3: Listening & Integrated Skills" paperId="2016_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2016 Paper 4: Speaking" paperId="2016_P4" />
                        <DownloadCard title="Performance Descriptors" description="2016 Performance Descriptors" paperId="2016_per" />
                        <DownloadCard title="Answers" description="2016 Answer Booklet" paperId="2016_ans" />
                    </PaperSection>
                    <PaperSection id="year-2015" title="2015">
                        <DownloadCard title="Paper 1 Reading" description="2015 Paper 1: Reading" paperId="2015_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2015 Paper 2: Writing" paperId="2015_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2015 Paper 3: Listening & Integrated Skills" paperId="2015_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2015 Paper 4: Speaking" paperId="2015_P4" />
                        <DownloadCard title="Performance Descriptors" description="2015 Performance Descriptors" paperId="2015_per" />
                        <DownloadCard title="Answers" description="2015 Answer Booklet" paperId="2015_ans" />
                    </PaperSection>
                    <PaperSection id="year-2014" title="2014">
                        <DownloadCard title="Paper 1 Reading" description="2014 Paper 1: Reading" paperId="2014_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2014 Paper 2: Writing" paperId="2014_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2014 Paper 3: Listening & Integrated Skills" paperId="2014_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2014 Paper 4: Speaking" paperId="2014_P4" />
                        <DownloadCard title="Performance Descriptors" description="2014 Performance Descriptors" paperId="2014_per" />
                        <DownloadCard title="Answers" description="2014 Answer Booklet" paperId="2014_ans" />
                    </PaperSection>
                    <PaperSection id="year-2013" title="2013">
                        <DownloadCard title="Paper 1 Reading" description="2013 Paper 1: Reading" paperId="2013_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2013 Paper 2: Writing" paperId="2013_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2013 Paper 3: Listening & Integrated Skills" paperId="2013_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2013 Paper 4: Speaking" paperId="2013_P4" />
                        <DownloadCard title="Performance Descriptors" description="2013 Performance Descriptors" paperId="2013_per" />
                        <DownloadCard title="Answers" description="2013 Answer Booklet" paperId="2013_ans" />
                    </PaperSection>
                    <PaperSection id="year-2012" title="2012">
                        <DownloadCard title="Paper 1 Reading" description="2012 Paper 1: Reading" paperId="2012_P1" />
                        <DownloadCard title="Paper 2 Writing" description="2012 Paper 2: Writing" paperId="2012_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="2012 Paper 3: Listening & Integrated Skills" paperId="2012_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="2012 Paper 4: Speaking" paperId="2012_P4" />
                        <DownloadCard title="Performance Descriptors" description="2012 Performance Descriptors" paperId="2012_per" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet" paperId="2012_ans" />
                    </PaperSection>
                    <PaperSection id="practice-papers" title="Practice Papers">
                        <DownloadCard title="Paper 1 Reading" description="Practice Paper 1: Reading" paperId="pp_P1" />
                        <DownloadCard title="Paper 2 Writing" description="Practice Paper 2: Writing" paperId="pp_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="Practice Paper 3: Listening & Integrated Skills" paperId="pp_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="Practice Paper 4: Speaking" paperId="pp_P4" />
                        <DownloadCard title="Answers" description="Practice Paper Answers" paperId="pp_ans" />
                    </PaperSection>
                    <PaperSection id="sample-papers" title="Sample Papers" showDivider={false}>
                        <DownloadCard title="Paper 1 Reading" description="Sample Paper 1: Reading" paperId="sp_P1" />
                        <DownloadCard title="Paper 2 Writing" description="Sample Paper 2: Writing" paperId="sp_P2" />
                        <DownloadCard title="Paper 3 Listening & Integrated Skills" description="Sample Paper 3: Listening & Integrated Skills" paperId="sp_P3" />
                        <DownloadCard title="Paper 4 Speaking" description="Sample Paper 4: Speaking" paperId="sp_P4" />
                        <DownloadCard title="Answers" description="Sample Paper Answers" paperId="sp_ans" />
                    </PaperSection>
                </div>
            </div>
        </>
    )
}
