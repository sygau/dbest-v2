import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'
import { BiDownload } from 'react-icons/bi';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
export default function PhysicsPage() {
  const metadata = getSubjectMetadata('physics');

    const subjectKey = 'physics';
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
                <div className="breadcrumb-title pe-3">物理</div>
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
                    <h1 className="mb-4">
                        DSE 物理 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Physics 物理歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Physics past papers. Here you can find comprehensive Physics examination materials including mechanics, electricity, waves, and modern physics topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed marking schemes to help you master DSE Physics concepts and achieve excellent results in your examination.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Year-wise Past Paper Listing */}
                    {/* Syllabus */}
                    <h2 style={{ textAlign: "center" }}>評核內容 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">中文 評核內容</h5>
                                    <p className="card-text">DSE物理 評核內容 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="syllabus_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">English Syllabus</h5>
                                    <p className="card-text">DSE Physics Syllabus (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="syllabus_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2023 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2023 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2023 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2023 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2023 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2023 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2023 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2023 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2023 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2023 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2022 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2022 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2022 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2022 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2022 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2022 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2022 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2022 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2022 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2022 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2020 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2020 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2020 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2020 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2020 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2020 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2020 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2020 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2020 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2020 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2021 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2021 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2021 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2021 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2021 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2021 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2021 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2021 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2021 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2021 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2019 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2019 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2019 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2019 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2019 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2019 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2019 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2019 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2019 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2019 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2018 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2018 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2018 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2018 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2018 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2018 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2018 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2018 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2018 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2018 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2017 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2017 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2017 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2017 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2017 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2017 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2017 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2017 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2017 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2017 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 style={{ textAlign: "center" }}>2016</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2016 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2016 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2016 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2016 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2016 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2016 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2016 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2016 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2016 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2016 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 style={{ textAlign: "center" }}>2015</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2015 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2015 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2015 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2015 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2015 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2015 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2015 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2015 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2015 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2015 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 style={{ textAlign: "center" }}>2014</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2014 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2014 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2014 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2014 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2014 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2014 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2014 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2014 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2014 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2014 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 style={{ textAlign: "center" }}>2013</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2013 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2013 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2013 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2013 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2013 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2013 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2013 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2013 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2013 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2013 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 style={{ textAlign: "center" }}>2012</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一甲 (中)</h5>
                                    <p className="card-text">2012 Paper 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一乙 (中)</h5>
                                    <p className="card-text">2012 Paper 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二 (中)</h5>
                                    <p className="card-text">2012 Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案 (中)</h5>
                                    <p className="card-text">2012 參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2012 考生表現 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_per_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1A (Eng)</h5>
                                    <p className="card-text">2012 Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 1B (Eng)</h5>
                                    <p className="card-text">2012 Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Paper 2 (Eng)</h5>
                                    <p className="card-text">2012 Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Answers (Eng)</h5>
                                    <p className="card-text">2012 Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Performance (Eng)</h5>
                                    <p className="card-text">
                                        2012 Performance Descriptors (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_per_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (中文) */}
                    <h2 style={{ textAlign: "center" }}>主題練習（中文）</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題一 熱和氣體</h5>
                                    <p className="card-text">By Topic 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題二 力和運動</h5>
                                    <p className="card-text">By Topic 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題三 波動</h5>
                                    <p className="card-text">By Topic 3 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_3_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題四 電和磁</h5>
                                    <p className="card-text">By Topic 4 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_4_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題五 放射現象和核能</h5>
                                    <p className="card-text">By Topic 5 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_5_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題六 天文學和航天科學</h5>
                                    <p className="card-text">By Topic 6 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_6_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題七 原子世界</h5>
                                    <p className="card-text">By Topic 7 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_7_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題八 能量和能源的使用</h5>
                                    <p className="card-text">By Topic 8 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_8_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題九 醫學物理學</h5>
                                    <p className="card-text">By Topic 9 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_9_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">MC 答案</h5>
                                    <p className="card-text">MC 答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_10_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">CE 長題目答案</h5>
                                    <p className="card-text">CE 長題目答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_11_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">DSE 答案</h5>
                                    <p className="card-text">DSE 答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_12_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2018-2021 By Topic</h5>
                                    <p className="card-text">2018-2021 By Topic (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_13_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2018-2021 答案</h5>
                                    <p className="card-text">2018-2021 答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_14_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題1-5 BK1</h5>
                                    <p className="card-text">主題1-5 BK1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題6-9 BK2</h5>
                                    <p className="card-text">主題6-9 BK2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (English) */}
                    <h2 style={{ textAlign: "center" }}>By Topic (English)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Topics 1–28 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 1 Temperature, Heat and Internal Energy
                                    </h5>
                                    <p className="card-text">Temperature, Heat and Internal Energy</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_1_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 2 Transfer Processes</h5>
                                    <p className="card-text">Transfer Processes</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 3 Change of State</h5>
                                    <p className="card-text">Change of State</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_3_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 4 General Gas Law</h5>
                                    <p className="card-text">General Gas Law</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_4_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 5 Kinetic Theory</h5>
                                    <p className="card-text">Kinetic Theory</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_5_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 6 Position and Movement</h5>
                                    <p className="card-text">Position and Movement</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_6_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 7 Newton's Laws</h5>
                                    <p className="card-text">Newton's Laws</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_7_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 8 Moment of Force</h5>
                                    <p className="card-text">Moment of Force</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_8_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 9 Work, Energy and Power</h5>
                                    <p className="card-text">Work, Energy and Power</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_9_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 10 Momentum</h5>
                                    <p className="card-text">Momentum</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_10_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 11 Projectile Motion</h5>
                                    <p className="card-text">Projectile Motion</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_11_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 12 Circular Motion</h5>
                                    <p className="card-text">Circular Motion</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_12_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 13 Gravitation</h5>
                                    <p className="card-text">Gravitation</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_13_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 14 Wave Propagation</h5>
                                    <p className="card-text">Wave Propagation</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_14_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 15 Wave Phenomena</h5>
                                    <p className="card-text">Wave Phenomena</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_15_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 16 Reflection and Refraction of Light
                                    </h5>
                                    <p className="card-text">Reflection and Refraction of Light</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_16_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 17 Lenses</h5>
                                    <p className="card-text">Lenses</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_17_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 18 Wave Nature of Light</h5>
                                    <p className="card-text">Wave Nature of Light</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_18_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 19 Sound</h5>
                                    <p className="card-text">Sound</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_19_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 20 Electrostatics</h5>
                                    <p className="card-text">Electrostatics</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_20_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 21 Electric Circuits</h5>
                                    <p className="card-text">Electric Circuits</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_21_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 22 Domestic Electricity</h5>
                                    <p className="card-text">Domestic Electricity</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_22_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 23 Magnetic Field</h5>
                                    <p className="card-text">Magnetic Field</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_23_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 24 Electromagnetic Induction</h5>
                                    <p className="card-text">Electromagnetic Induction</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_24_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 25 Alternating Current</h5>
                                    <p className="card-text">Alternating Current</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_25_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 26 Radiation and Radioactivity
                                    </h5>
                                    <p className="card-text">Radiation and Radioactivity</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_26_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 27 Atomic Model</h5>
                                    <p className="card-text">Atomic Model</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_27_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 28 Nuclear Energy</h5>
                                    <p className="card-text">Nuclear Energy</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_28_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* BK and E papers */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Book 1 Topic 1-5</h5>
                                    <p className="card-text">Book 1 Topic 1-5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk1_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Book 2 Topic 6-13</h5>
                                    <p className="card-text">Book 2 Topic 6-13</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Book 3 Topic 14-19</h5>
                                    <p className="card-text">Book 3 Topic 14-19</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk3_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Book 4 Topic 20-25</h5>
                                    <p className="card-text">Book 4 Topic 20-25</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk4_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Book 5 Topic 26-28</h5>
                                    <p className="card-text">Book 5 Topic 26-28</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk5_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">E1</h5>
                                    <p className="card-text">By Topic E1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_e1_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">E2</h5>
                                    <p className="card-text">By Topic E2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_e2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">E3</h5>
                                    <p className="card-text">By Topic E3 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_e3_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* Practice/Sample/Special Papers */}
                    <h2 style={{ textAlign: "center" }}>練習卷 / Practice Papers</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷 1A (中)</h5>
                                    <p className="card-text">練習卷 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷 1B (中)</h5>
                                    <p className="card-text">練習卷 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷 1A (中)</h5>
                                    <p className="card-text">練習卷 1A (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷 1B (中)</h5>
                                    <p className="card-text">練習卷 1B (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷 2 (中)</h5>
                                    <p className="card-text">練習卷 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English versions */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Practice Paper 1A (Eng)</h5>
                                    <p className="card-text">Practice Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Practice Paper Answers (Eng)</h5>
                                    <p className="card-text">2023 Practice Paper Answer Booklet</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Sample Paper 1A (Eng)</h5>
                                    <p className="card-text">Sample Paper 1A (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1a_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Sample Paper 1B (Eng)</h5>
                                    <p className="card-text">Sample Paper 1B (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1b_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Sample Paper 2 (Eng)</h5>
                                    <p className="card-text">Sample Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
            </div>
        </>
    )
}
