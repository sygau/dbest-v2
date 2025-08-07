import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';

export default function CitizenPage() {
    return (
        <>
            <Head>
                <title>DSE Citizenship and Social Development 公民與社會發展 Past Paper - dse.best</title>
                <meta name="description" content="下載DSE公民與社會發展科歷屆試題、答案及考生表現，全面掌握考試趨勢，提升應考實力。免費提供完整試卷。" />
                <meta name="robots" content="noindex, nofollow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="DSE 公民與社會發展 歷屆試題 Past Papers | 公民科試卷及答案 - dse.best" />
                <meta property="og:description" content="下載DSE公民與社會發展科歷屆試題、答案及考生表現，全面掌握考試趨勢，提升應考實力。免費提供完整試卷。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/citizen" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">公民與社會發展科</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="/">
                                    <i className="bx bx-home-alt" />
                                </a>
                            </li>
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
                        DSE 公民與社會發展科 Citizenship and Social Development 歷屆試題 Past
                        Papers
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 公民與社會發展科 Citizenship and Social Development
                        歷屆試題。本科目於2024年首次開考，試卷資源將陸續添加。
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
                    {/* Coming Soon / Work in Progress Section */}
                    <div
                        className="alert alert-warning d-flex align-items-center mb-4"
                        role="alert"
                    >
                        <i
                            className="material-icons-outlined me-3"
                            style={{ fontSize: "2rem" }}
                        >
                            construction
                        </i>
                        <div>
                            <h5 className="alert-heading mb-2">頁面建設中 Work in Progress</h5>
                            <p className="mb-1">
                                公民與社會發展科試卷頁面正在準備中，敬請期待！我們正在整理相關試卷資源。
                            </p>
                            <p className="mb-0">
                                The Citizenship and Social Development page is under construction.
                                We are organizing relevant past papers and resources.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
