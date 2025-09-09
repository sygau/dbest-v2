import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';

export default function ChinesePage() {
  const metadata = getSubjectMetadata('chinese');

    const subjectKey = 'chinese';
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
                <div className="breadcrumb-title pe-3">中文</div>
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
                    <h1 className="mb-4">DSE 中文 歷屆試題 Past Papers</h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE中文歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Chinese Language past papers. Here you can find Chinese Language examination papers, answers, and marking schemes arranged by year, including reading comprehension, writing, listening, and speaking components to help you prepare for the DSE Chinese Language examination effectively.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    
                    {/* Navigation Section */}
                    <div className="text-center mb-4">
                        {/* All Years Row */}
                        <div className="mb-2 d-flex flex-wrap justify-content-center align-items-center">
                            <a href="#year-2025" className="text-decoration-none text-info fw-bold nav-link-year">2025</a>
                            <span className="nav-separator">|</span>
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
                            <a href="#sample-papers" className="text-decoration-none text-info fw-bold nav-link-section">模擬試卷</a>
                            <span className="nav-separator">|</span>
                            <a href="#practice-papers" className="text-decoration-none text-info fw-bold nav-link-section">練習試卷</a>
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    {/* Year-wise Past Paper Listing */}
                    {/* 模擬試卷 (Sample Papers) */}
                    <div id="sample-papers"></div>
                    <h2 style={{ textAlign: "center" }}>模擬試卷</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">Sample Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">Sample Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">Sample Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">Sample Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">Sample Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">Sample Paper Answers</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 練習試卷 (Practice Papers) */}
                    <div id="practice-papers"></div>
                    <h2 style={{ textAlign: "center" }}>練習試卷</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">Practice Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">Practice Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">Practice Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">Practice Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">Practice Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">Practice Paper Answers</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2025 */}
                    <div id="year-2025"></div>
                    <h2 style={{ textAlign: "center" }}>2025</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2025 試卷一</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2025_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2025 試卷二</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2025_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2024 */}
                    <div id="year-2024"></div>
                    <h2 style={{ textAlign: "center" }}>2024</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2024 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2024_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2024 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2024_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <div id="year-2023"></div>
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2023 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2023 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2023 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2023 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <div id="year-2022"></div>
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2022 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2022 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2022 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2022 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2022 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <div id="year-2021"></div>
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2021 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2021 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2021 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2021 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2021 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <div id="year-2020"></div>
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2020 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2020 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2020 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2020 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2020 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <div id="year-2019"></div>
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2019 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2019 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2019 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2019 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2019 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2019 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <div id="year-2018"></div>
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2018 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2018 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2018 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2018 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2018 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2018 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <div id="year-2017"></div>
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2017 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2017 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2017 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2017 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2017 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2017 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <div id="year-2016"></div>
                    <h2 style={{ textAlign: "center" }}>2016</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2016 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2016 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2016 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2016 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2016 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2016 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <div id="year-2015"></div>
                    <h2 style={{ textAlign: "center" }}>2015</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2015 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2015 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2015 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2015 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">2015 Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2015 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2015 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <div id="year-2014"></div>
                    <h2 style={{ textAlign: "center" }}>2014</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2014 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2014 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2014 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2014 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">2014 Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">評分參考</h5>
                                    <p className="card-text">2014 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_pe_r"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2014 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <div id="year-2013"></div>
                    <h2 style={{ textAlign: "center" }}>2013</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2013 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2013 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2013 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2013 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">2013 Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2013 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <div id="year-2012"></div>
                    <h2 style={{ textAlign: "center" }}>2012</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一 閱讀</h5>
                                    <p className="card-text">2012 Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_P1"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 寫作</h5>
                                    <p className="card-text">2012 Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_P2"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷三 聆聽</h5>
                                    <p className="card-text">2012 Paper 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_P3"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷四 說話</h5>
                                    <p className="card-text">2012 Paper 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_P4"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷五</h5>
                                    <p className="card-text">2012 Paper 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_P5"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">答案</h5>
                                    <p className="card-text">2012 Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_ans"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
