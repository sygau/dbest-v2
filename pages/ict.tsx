import Head from 'next/head'

export default function ICTPage() {
    return (
        <>
            <Head>
                <title>DSE ICT Past Paper | 歷屆試題及答案 - dse.best</title>
                <meta name="description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="DSE ICT 歷屆試題 Past Papers | 資訊及通訊科技試卷及答案 - dse.best" />
                <meta property="og:description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/ict" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">ICT</div>
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
                        <h1 className="mb-4">DSE ICT 歷屆試題 Past Papers</h1>
                        <p className="mb-4">
                            歡迎瀏覽DSE資訊及通訊科技歷屆試題。
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
                        {/* Year-wise Past Paper Listing */}
                        {/* 模擬試卷 (Sample Papers) */}
                        <h2 style={{ textAlign: "center" }}>模擬試卷</h2>
                        <br />
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 1</h5>
                                        <p className="card-text">Sample Paper 1</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_sp_P1"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2A</h5>
                                        <p className="card-text">Sample Paper 2A</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_sp_P2A"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2B</h5>
                                        <p className="card-text">Sample Paper 2B</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_sp_P2B"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2C</h5>
                                        <p className="card-text">Sample Paper 2C</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_sp_P2C"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2D</h5>
                                        <p className="card-text">Sample Paper 2D</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_sp_P2D"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
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
                                            data-paper-id="ict_sp_ans"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        {/* 練習試卷 (Practice Papers) */}
                        <h2 style={{ textAlign: "center" }}>練習試卷</h2>
                        <br />
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 1</h5>
                                        <p className="card-text">Practice Paper 1</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_pp_P1"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2A</h5>
                                        <p className="card-text">Practice Paper 2A</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_pp_P2A"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2B</h5>
                                        <p className="card-text">Practice Paper 2B</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_pp_P2B"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2C</h5>
                                        <p className="card-text">Practice Paper 2C</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_pp_P2C"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2D</h5>
                                        <p className="card-text">Practice Paper 2D</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_pp_P2D"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
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
                                            data-paper-id="ict_pp_ans"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
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
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 1</h5>
                                        <p className="card-text">2023 Paper 1</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2023_P1"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2A</h5>
                                        <p className="card-text">2023 Paper 2A</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2023_P2A"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2B</h5>
                                        <p className="card-text">2023 Paper 2B</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2023_P2B"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2C</h5>
                                        <p className="card-text">2023 Paper 2C</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2023_P2C"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2D</h5>
                                        <p className="card-text">2023 Paper 2D</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2023_P2D"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
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
                                            data-paper-id="ict_2023_pe_r"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
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
                                        <h5 className="card-title">Paper 1</h5>
                                        <p className="card-text">2022 Paper 1</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2022_P1"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2A</h5>
                                        <p className="card-text">2022 Paper 2A</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2022_P2A"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2B</h5>
                                        <p className="card-text">2022 Paper 2B</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2022_P2B"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2C</h5>
                                        <p className="card-text">2022 Paper 2C</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2022_P2C"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">Paper 2D</h5>
                                        <p className="card-text">2022 Paper 2D</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <a
                                            href="#"
                                            className="btn btn-info px-4 d-inline-flex gap-2"
                                            data-paper-id="ict_2022_P2D"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
                                            Download
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
                                            data-paper-id="ict_2022_pe_r"
                                        >
                                            <i className="material-icons-outlined">cloud_download</i>下載
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
