import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'
import { BiDownload } from 'react-icons/bi';
import { getSubjectMetadata } from '../../utils/structuredData';
export default function ICTPage() {
  const metadata = getSubjectMetadata('ict');

    const subjectKey = 'ict';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);

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
                <div className="breadcrumb-title pe-3">資訊及通訊科技</div>
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
                        DSE 資訊及通訊科技 ICT 歷屆試題 Past Papers (By year + Practice Papers +
                        Sample Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 資訊及通訊科技 ICT
                        歷屆試題。在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Information and Communication Technology (ICT) past papers. Here you can find comprehensive ICT examination materials including database management, programming, networking, multimedia, and information processing topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed marking schemes to help you master DSE ICT concepts and prepare effectively for your examination.
                    </p>
                    <div className="alert alert-border-primary alert-dismissible fade show">
                        <div className="">
                            <b>最後更新: </b>1/7/2025
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        />
                    </div>
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
                                    <p className="card-text">DSE資訊及通訊科技 評核內容 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="syll_chi"
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
                                    <p className="card-text">DSE ICT Syllabus (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="syll_eng"
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
                                    <h5 className="card-title">考試報告</h5>
                                    <p className="card-text">2023 考試報告 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_exam_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2023 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2023 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2023 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Exam Report</h5>
                                    <p className="card-text">2023 Exam Report (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_exam_eng"
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2023 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2023 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2023 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2023 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2023 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2022 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2022 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2022 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2022 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2022 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2022 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2022 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2022 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2022 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2022 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                    {/* 2021 */}
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2021 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2021 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2021 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2021 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2021 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2021 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2021 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2021 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2021 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2021 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                    {/* 2020 */}
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2020 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2020 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2020 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2020 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2020 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2020 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2020 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2020 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2020 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2020 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                    {/* 2019 */}
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2019 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2019 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2019 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2019 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2019 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2019 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2019 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2019 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2019 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2019 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2018 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2018 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2018 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2018 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2018 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2018 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2018 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2018 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2018 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2018 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2017 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2017 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2017 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2017 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2017 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2017 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2017 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2017 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2017 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2017 Paper 2D ftware Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2016 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2016 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2016 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2016 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2016 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2016 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2016 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2016 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2016 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2016 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2015 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2015 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2015 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2015 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2015 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2015 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2015 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2015 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2015 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2015 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2014 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2014 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2014 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2014 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2014 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2014 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2014 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2014 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2014 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2014 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2013 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2013 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2013 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2013 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2013 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2013 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2013 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2013 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2013 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2013 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷一</h5>
                                    <p className="card-text">2012 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二甲</h5>
                                    <p className="card-text">2012 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二乙</h5>
                                    <p className="card-text">2012 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丙</h5>
                                    <p className="card-text">2012 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">卷二丁</h5>
                                    <p className="card-text">2012 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">參考答案</h5>
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
                                    <h5 className="card-title">Paper 1</h5>
                                    <p className="card-text">2012 Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p1_eng"
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
                                    <h5 className="card-title">Paper 2A</h5>
                                    <p className="card-text">2012 Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2a_eng"
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
                                    <h5 className="card-title">Paper 2B</h5>
                                    <p className="card-text">
                                        2012 Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2b_eng"
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
                                    <h5 className="card-title">Paper 2C</h5>
                                    <p className="card-text">2012 Paper 2C Web Authoring (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2c_eng"
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
                                    <h5 className="card-title">Paper 2D</h5>
                                    <p className="card-text">
                                        2012 Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_p2d_eng"
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
                                    <h5 className="card-title">Answers</h5>
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
                                    <h5 className="card-title">Performance</h5>
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
                    {/* Practice Papers */}
                    <h2 style={{ textAlign: "center" }}>練習卷 / Practice Papers</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷一</h5>
                                    <p className="card-text">練習卷 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷二甲</h5>
                                    <p className="card-text">練習卷 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷二乙</h5>
                                    <p className="card-text">練習卷 Paper 2B 數據通訊及建網 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷二丙</h5>
                                    <p className="card-text">練習卷 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷二丁</h5>
                                    <p className="card-text">練習卷 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2d_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷參考答案</h5>
                                    <p className="card-text">練習卷參考答案 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_ans_chi"
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
                                    <h5 className="card-title">Practice Paper 1</h5>
                                    <p className="card-text">Practice Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p1_eng"
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
                                    <h5 className="card-title">Practice Paper 2A</h5>
                                    <p className="card-text">Practice Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2a_eng"
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
                                    <h5 className="card-title">Practice Paper 2B</h5>
                                    <p className="card-text">
                                        Practice Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2b_eng"
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
                                    <h5 className="card-title">Practice Paper 2C</h5>
                                    <p className="card-text">
                                        Practice Paper 2C Web Authoring (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2c_eng"
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
                                    <h5 className="card-title">Practice Paper 2D</h5>
                                    <p className="card-text">
                                        Practice Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2d_eng"
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
                                    <h5 className="card-title">Practice Paper Answers</h5>
                                    <p className="card-text">
                                        Practice Paper Answer Booklet (English)
                                    </p>
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
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 style={{ textAlign: "center" }}>樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷一</h5>
                                    <p className="card-text">樣本試卷 Paper 1 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷二甲</h5>
                                    <p className="card-text">樣本試卷 Paper 2A 數據庫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2a_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷二乙</h5>
                                    <p className="card-text">
                                        樣本試卷 Paper 2B 數據通訊及建網 (中文)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2b_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷二丙</h5>
                                    <p className="card-text">樣本試卷 Paper 2C 網頁編寫 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2c_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷二丁</h5>
                                    <p className="card-text">樣本試卷 Paper 2D 軟件開發 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2d_chi"
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
                                    <h5 className="card-title">Sample Paper 1</h5>
                                    <p className="card-text">Sample Paper 1 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p1_eng"
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
                                    <h5 className="card-title">Sample Paper 2A</h5>
                                    <p className="card-text">Sample Paper 2A Database (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2a_eng"
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
                                    <h5 className="card-title">Sample Paper 2B</h5>
                                    <p className="card-text">
                                        Sample Paper 2B Data Communications &amp; Networking (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2b_eng"
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
                                    <h5 className="card-title">Sample Paper 2C</h5>
                                    <p className="card-text">
                                        Sample Paper 2C Web Authoring (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2c_eng"
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
                                    <h5 className="card-title">Sample Paper 2D</h5>
                                    <p className="card-text">
                                        Sample Paper 2D Software Development (English)
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_p2d_eng"
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
                                    <h5 className="card-title">Sample Paper Answers</h5>
                                    <p className="card-text">Sample Paper Answer Booklet (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_ans_eng"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />
                                        Download
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
