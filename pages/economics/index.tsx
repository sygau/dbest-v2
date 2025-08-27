import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'
import { BiDownload } from 'react-icons/bi';
import { getSubjectMetadata } from '../../utils/structuredData';
export default function EconomicsPage() {
  const metadata = getSubjectMetadata('economics');

    const subjectKey = 'economics';
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
                <div className="breadcrumb-title pe-3">經濟</div>
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
                        DSE 經濟 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Economics 經濟歷屆試題。
                        在此，您可以找到按年份排列的經濟科試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Economics past papers. Here you can find comprehensive Economics examination materials including microeconomics, macroeconomics, international trade, and economic development topics arranged by year, along with data response questions, essay questions, and detailed marking schemes to help you master DSE Economics concepts and achieve excellent results in your examination.
                    </p>
                    <div className="alert alert-border-primary alert-dismissible fade show">
                        <div className="">
                            <b>最後更新: </b>12/8/2025
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
                    {/* Syllabus */}
                    <h2 style={{ textAlign: "center" }}>課程及評估指引 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">課程及評估指引</h5>
                                    <p className="card-text">DSE Economics Syllabus (中文)</p>
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
                                    <p className="card-text">DSE Economics Syllabus (English)</p>
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
                    {/* By Topic (Chinese) */}
                    <h2 style={{ textAlign: "center" }}>分類練習 / By Topic (中文)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* BK1 BK2 first */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題1-7</h5>
                                    <p className="card-text">主題1-7 (中文)</p>
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
                                    <h5 className="card-title">主題8-14</h5>
                                    <p className="card-text">主題8-14 (中文)</p>
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
                        {/* Numbered topics */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">主題1 基本經濟概念</h5>
                                    <p className="card-text">主題1 基本經濟概念 (中文)</p>
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
                                    <h5 className="card-title">主題2 需求及供應</h5>
                                    <p className="card-text">主題2 需求及供應 (中文)</p>
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
                                    <h5 className="card-title">主題3 效率與公平</h5>
                                    <p className="card-text">主題3 效率與公平 (中文)</p>
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
                                    <h5 className="card-title">主題4 生產要素和生產級別</h5>
                                    <p className="card-text">主題4 生產要素和生產級別 (中文)</p>
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
                                    <h5 className="card-title">主題5 短期與長期生產及成本</h5>
                                    <p className="card-text">主題5 短期與長期生產及成本 (中文)</p>
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
                                    <h5 className="card-title">主題6 廠商擁有權、握張及結合</h5>
                                    <p className="card-text">主題6 廠商擁有權、握張及結合 (中文)</p>
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
                                    <h5 className="card-title">主題7 競爭與市場結構</h5>
                                    <p className="card-text">主題7 競爭與市場結構 (中文)</p>
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
                                    <h5 className="card-title">主題8 國民收入會計</h5>
                                    <p className="card-text">主題8 國民收入會計 (中文)</p>
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
                                    <h5 className="card-title">主題9 失業及就業不足</h5>
                                    <p className="card-text">主題9 失業及就業不足 (中文)</p>
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
                                    <h5 className="card-title">主題10 總需求及總供應</h5>
                                    <p className="card-text">主題10 總需求及總供應 (中文)</p>
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
                                    <h5 className="card-title">主題11 公共財政</h5>
                                    <p className="card-text">主題11 公共財政 (中文)</p>
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
                                    <h5 className="card-title">主題12 貨幣與銀行</h5>
                                    <p className="card-text">主題12 貨幣與銀行 (中文)</p>
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
                                    <h5 className="card-title">主題13 匯率與國際收支平衡表</h5>
                                    <p className="card-text">主題13 匯率與國際收支平衡表 (中文)</p>
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
                                    <h5 className="card-title">主題14 國際貿易</h5>
                                    <p className="card-text">主題14 國際貿易 (中文)</p>
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
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (English) */}
                    <h2 style={{ textAlign: "center" }}>分類練習 / By Topic (English)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* BK1 BK2 first */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 1-9</h5>
                                    <p className="card-text">Topic 1-9 BK1 (English)</p>
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
                                    <h5 className="card-title">Topic 10-17</h5>
                                    <p className="card-text">Topic 10-17 BK2 (English)</p>
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
                        {/* Numbered topics 1-18 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 1 Basic Concept</h5>
                                    <p className="card-text">Basic Concept</p>
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
                                    <h5 className="card-title">Topic 2 Production</h5>
                                    <p className="card-text">Production</p>
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
                                    <h5 className="card-title">Topic 3 Input-Output Relationship</h5>
                                    <p className="card-text">Input-Output Relationship</p>
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
                                    <h5 className="card-title">
                                        Topic 4 Ownership And Expansion Of Firms
                                    </h5>
                                    <p className="card-text">Ownership And Expansion Of Firms</p>
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
                                    <h5 className="card-title">Topic 5 Market Structure</h5>
                                    <p className="card-text">Market Structure</p>
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
                                    <h5 className="card-title">Topic 6 Demand And Supply I</h5>
                                    <p className="card-text">Demand And Supply I</p>
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
                                    <h5 className="card-title">Topic 7 Demand And Supply II</h5>
                                    <p className="card-text">Demand And Supply II</p>
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
                                    <h5 className="card-title">Topic 8 Market Intervention</h5>
                                    <p className="card-text">Market Intervention</p>
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
                                    <h5 className="card-title">Topic 9 Roles Of Government</h5>
                                    <p className="card-text">Roles Of Government</p>
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
                                    <h5 className="card-title">Topic 10 National Income</h5>
                                    <p className="card-text">National Income</p>
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
                                    <h5 className="card-title">Topic 11 Macroeconomics Problems</h5>
                                    <p className="card-text">Macroeconomics Problems</p>
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
                                    <h5 className="card-title">
                                        Topic 12 The Budget And Fiscal Policy
                                    </h5>
                                    <p className="card-text">The Budget And Fiscal Policy</p>
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
                                    <h5 className="card-title">Topic 13 Money And Banking I</h5>
                                    <p className="card-text">Money And Banking I</p>
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
                                    <h5 className="card-title">Topic 14 Money And Banking II</h5>
                                    <p className="card-text">Money And Banking II</p>
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
                                    <h5 className="card-title">
                                        Topic 15 Aggregate Demand And Aggregate Supply
                                    </h5>
                                    <p className="card-text">Aggregate Demand And Aggregate Supply</p>
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
                                    <h5 className="card-title">Topic 16 International Trade</h5>
                                    <p className="card-text">International Trade</p>
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
                                    <h5 className="card-title">Topic 17 International Finance</h5>
                                    <p className="card-text">International Finance</p>
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
                                    <h5 className="card-title">
                                        Elective 2 Extension of Trade Theory and Economic Development
                                    </h5>
                                    <p className="card-text">
                                        Extension of Trade Theory and Economic Development
                                    </p>
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
                    </div>
                    <hr className="my-4" />
                    {/* DSE Papers by Year */}
                    {/* 2023 */}
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
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
                                    <h5 className="card-title">卷二</h5>
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
                        {/* English */}
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
                                    <h5 className="card-title">Paper 2</h5>
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
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* English only for 2022 */}
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                                    <h5 className="card-title">卷二</h5>
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
                                    <h5 className="card-title">Paper 2</h5>
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
                        {/* Chinese Practice Papers */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷一</h5>
                                    <p className="card-text">Practice Paper 1 (中文)</p>
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
                                    <h5 className="card-title">練習卷二</h5>
                                    <p className="card-text">Practice Paper 2 (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">練習卷答案</h5>
                                    <p className="card-text">Practice Paper Answer (中文)</p>
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
                        {/* English Practice Papers */}
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
                                    <h5 className="card-title">Practice Paper 2</h5>
                                    <p className="card-text">Practice Paper 2 (English)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_p2_eng"
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
                        {/* Chinese Sample Papers */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷一</h5>
                                    <p className="card-text">Sample Paper 1 (中文)</p>
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
                                    <h5 className="card-title">樣本試卷二</h5>
                                    <p className="card-text">Sample Paper 2 (中文)</p>
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
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">樣本試卷答案</h5>
                                    <p className="card-text">Sample Paper Answer (中文)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_ans_chi"
                                    >
                                        <BiDownload style={{ fontSize: 22 }} />下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* English Sample Papers */}
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
                                    <h5 className="card-title">Sample Paper 2</h5>
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
