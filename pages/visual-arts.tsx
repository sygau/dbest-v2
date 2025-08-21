import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../utils/structuredData';

export default function VisualArtsPage() {
    const subjectKey = 'visual-arts';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);

    return (
        <>
            <Head>
                <title>DSE Visual Arts 視覺藝術 Past Paper | 歷屆試題及答案 - dse.best</title>
                <meta name="description" content="下載DSE視覺藝術科歷屆試題、答案及考生表現，全面掌握考試趨勢，提升應考實力。免費提供2012-2024年完整試卷。" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="DSE Visual Arts 視覺藝術 歷屆試題 Past Papers | 視覺藝術試卷及答案 - dse.best" />
                <meta property="og:description" content="下載DSE視覺藝術科歷屆試題、答案及考生表現，全面掌握考試趨勢，提升應考實力。免費提供2012-2024年完整試卷。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/visual-arts" />
                <meta property="og:type" content="website" />

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
                <div className="breadcrumb-title pe-3">視覺藝術</div>
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
                        DSE 視覺藝術 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Visual Arts 視覺藝術歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
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
                    
                    {/* Coming Soon Section */}
                    <div className="text-center py-5">
                        <h2 className="mb-4">視覺藝術科歷屆試題即將推出</h2>
                        <p className="lead mb-4">
                            我們正在整理DSE視覺藝術科的歷屆試題，包括藝術創作和藝術評賞的相關內容。
                        </p>
                        <div className="alert alert-info">
                            <strong>注意：</strong> 視覺藝術科主要評核校本評核(SBA)，佔總分50%，包括藝術創作作品集和藝術評賞習作。
                        </div>
                    </div>

                    {/* Placeholder for future content */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">藝術創作</h5>
                                    <p className="card-text">個人作品集及創作過程記錄</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <button className="btn btn-secondary px-4 d-inline-flex gap-2" disabled>
                                        <BiDownload style={{ fontSize: 22 }} />
                                        即將推出
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">藝術評賞</h5>
                                    <p className="card-text">藝術作品分析及藝術史知識</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <button className="btn btn-secondary px-4 d-inline-flex gap-2" disabled>
                                        <BiDownload style={{ fontSize: 22 }} />
                                        即將推出
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考試技巧</h5>
                                    <p className="card-text">視覺藝術科應試策略</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <button className="btn btn-secondary px-4 d-inline-flex gap-2" disabled>
                                        <BiDownload style={{ fontSize: 22 }} />
                                        即將推出
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
