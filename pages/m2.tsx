import Head from 'next/head'

export default function M2Page() {
    return (
        <>
            <Head>
                <title>DSE M2 數學延伸部分 Past Paper | 歷屆試題及答案 - dse.best</title>
                <meta name="description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="DSE M2 數學延伸部分 歷屆試題 Past Papers | 代數與微積分 - dse.best" />
                <meta property="og:description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/m2" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">M2</div>
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
                        DSE M2 數學延伸單元二 歷屆試題 Past Papers (By year + By topic +
                        Practice Papers + AMaths + PMaths)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE M2
                        數學延伸單元二歷屆試題。在此，您可以找到按年份排列的M2試題、答案及評分準則，以及分類練習和歷史
                        Additional Mathematics及 Pure Mathematics試題，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE M2 Mathematics Extended Part Module 2 past papers.
                        Here you can find M2 papers, answers and marking schemes arranged by
                        year, as well as topic-based exercises and historical Additional
                        Mathematics and Pure Mathematics papers to help you prepare for exams.
                    </p>
                    <div className="alert alert-border-primary alert-dismissible fade show">
                        <div className="">
                            <b>最後更新 Last Updated: </b>1/7/2025
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
                    {/* Syllabus Section */}
                    <h2 style={{ textAlign: "center" }}>評核內容 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Syllabus</h5>
                                    <p className="card-text">Mathematics Module 2 Syllabus</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="syll"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* By Topic Section */}
                    <h2 style={{ textAlign: "center" }}>DSE By Topic</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 1-13</h5>
                                    <p className="card-text">By Topic Book 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_bk1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 1 Mathematical Induction</h5>
                                    <p className="card-text">By Topic 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 2 Binomial Theorem</h5>
                                    <p className="card-text">By Topic 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 3 More about Trigonometric Functions
                                    </h5>
                                    <p className="card-text">By Topic 3</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_3"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 4 Limits and Derivatives</h5>
                                    <p className="card-text">By Topic 4</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_4"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 5 Differentiation</h5>
                                    <p className="card-text">By Topic 5</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_5"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 6 Applications of Differentiation
                                    </h5>
                                    <p className="card-text">By Topic 6</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_6"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 7 Indefinite Integrals</h5>
                                    <p className="card-text">By Topic 7</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_7"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 8 Definite Integrals</h5>
                                    <p className="card-text">By Topic 8</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_8"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 9 Applications of Definite Integrals
                                    </h5>
                                    <p className="card-text">By Topic 9</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_9"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 10 Matrices and Determinants</h5>
                                    <p className="card-text">By Topic 10</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_10"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Topic 11 System of Linear Equations
                                    </h5>
                                    <p className="card-text">By Topic 11</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_11"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 12 Vectors</h5>
                                    <p className="card-text">By Topic 12</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_12"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 13 Product of Vectors</h5>
                                    <p className="card-text">By Topic 13</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="bytopic_13"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <br />
                    {/* DSE by Year Section */}
                    <h2 style={{ textAlign: "center" }}>DSE By Year</h2>
                    <br />
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2023 Paper</h5>
                                    <p className="card-text">2023 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2023_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2022 Paper</h5>
                                    <p className="card-text">2022 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2022 Marking Scheme</h5>
                                    <p className="card-text">2022 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2022_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2021 Paper</h5>
                                    <p className="card-text">2021 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2021 Marking Scheme</h5>
                                    <p className="card-text">2021 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2021_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2020 Paper</h5>
                                    <p className="card-text">2020 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2020 Marking Scheme</h5>
                                    <p className="card-text">2020 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2020 Performance</h5>
                                    <p className="card-text">2020 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2020_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2019 Paper</h5>
                                    <p className="card-text">2019 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2019 Marking Scheme</h5>
                                    <p className="card-text">2019 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2019 Performance</h5>
                                    <p className="card-text">2019 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2019_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2018 Paper</h5>
                                    <p className="card-text">2018 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2018 Marking Scheme</h5>
                                    <p className="card-text">2018 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2018 Performance</h5>
                                    <p className="card-text">2018 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2018_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2017 Paper</h5>
                                    <p className="card-text">2017 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2017 Marking Scheme</h5>
                                    <p className="card-text">2017 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2017 Performance</h5>
                                    <p className="card-text">2017 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2017_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2016</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2016 Paper</h5>
                                    <p className="card-text">2016 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2016 Marking Scheme</h5>
                                    <p className="card-text">2016 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2016 Performance</h5>
                                    <p className="card-text">2016 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2015</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2015 Paper</h5>
                                    <p className="card-text">2015 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2015 Marking Scheme</h5>
                                    <p className="card-text">2015 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2015 Performance</h5>
                                    <p className="card-text">2015 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2015_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2014</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2014 Paper</h5>
                                    <p className="card-text">2014 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2014 Marking Scheme</h5>
                                    <p className="card-text">2014 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2014 Performance</h5>
                                    <p className="card-text">2014 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2014_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2013</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2013 Paper</h5>
                                    <p className="card-text">2013 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2013 Marking Scheme</h5>
                                    <p className="card-text">2013 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2013 Performance</h5>
                                    <p className="card-text">2013 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2013_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>2012</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2012 Paper</h5>
                                    <p className="card-text">2012 DSE Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2012 Marking Scheme</h5>
                                    <p className="card-text">2012 Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2012 Performance</h5>
                                    <p className="card-text">2012 Performance Report</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2012_per"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers Section */}
                    <h2 style={{ textAlign: "center" }}>Sample Papers 樣本試卷</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Sample Paper</h5>
                                    <p className="card-text">Sample Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="sp_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers Section */}
                    <h2 style={{ textAlign: "center" }}>Practice Papers 練習試卷</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Practice Paper</h5>
                                    <p className="card-text">Practice Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Practice Marking Scheme</h5>
                                    <p className="card-text">Practice Marking Scheme</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="pp_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* AMaths Section */}
                    <h2 style={{ textAlign: "center" }}>Additional Mathematics</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2011 Paper</h5>
                                    <p className="card-text">2011 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2011_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2011 Marking Scheme</h5>
                                    <p className="card-text">
                                        2011 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2011_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2009 Paper</h5>
                                    <p className="card-text">2009 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2009_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2009 Marking Scheme</h5>
                                    <p className="card-text">
                                        2009 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2009_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2008 Paper</h5>
                                    <p className="card-text">2008 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2008_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2008 Marking Scheme</h5>
                                    <p className="card-text">
                                        2008 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2008_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2007 Paper</h5>
                                    <p className="card-text">2007 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2007_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2007 Marking Scheme</h5>
                                    <p className="card-text">
                                        2007 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2007_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2006 Paper</h5>
                                    <p className="card-text">2006 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2006_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2006 Marking Scheme</h5>
                                    <p className="card-text">
                                        2006 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2006_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2005 Paper</h5>
                                    <p className="card-text">2005 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2005_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2004 Paper</h5>
                                    <p className="card-text">2004 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2004_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2004 Marking Scheme</h5>
                                    <p className="card-text">
                                        2004 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2004_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2003 Paper</h5>
                                    <p className="card-text">2003 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2003_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2003 Marking Scheme</h5>
                                    <p className="card-text">
                                        2003 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2003_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2002 Paper</h5>
                                    <p className="card-text">2002 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2002_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2002 Marking Scheme</h5>
                                    <p className="card-text">
                                        2002 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2002_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2001 Paper</h5>
                                    <p className="card-text">2001 Additional Mathematics Paper</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2001_pp"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2001 Marking Scheme</h5>
                                    <p className="card-text">
                                        2001 Additional Mathematics Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2001_ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2000 Paper 1</h5>
                                    <p className="card-text">2000 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2000_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2000 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        2000 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2000_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2000 Paper 2</h5>
                                    <p className="card-text">2000 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2000_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">2000 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        2000 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_2000_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1999 Paper 1</h5>
                                    <p className="card-text">1999 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1999_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1999 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1999 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1999_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1999 Paper 2</h5>
                                    <p className="card-text">1999 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1999_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1999 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1999 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1999_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1998 Paper 1</h5>
                                    <p className="card-text">1998 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1998_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1998 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1998 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1998_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1998 Paper 2</h5>
                                    <p className="card-text">1998 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1998_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1998 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1998 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1998_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1997 Paper 1</h5>
                                    <p className="card-text">1997 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1997_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1997 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1997 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1997_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1997 Paper 2</h5>
                                    <p className="card-text">1997 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1997_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1997 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1997 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1997_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1996 Paper 1</h5>
                                    <p className="card-text">1996 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1996_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1996 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1996 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1996_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1996 Paper 2</h5>
                                    <p className="card-text">1996 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1996_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1996 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1996 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1996_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1995 Paper 1</h5>
                                    <p className="card-text">1995 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1995_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1995 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1995 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1995_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1995 Paper 2</h5>
                                    <p className="card-text">1995 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1995_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1995 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1995 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1995_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1994 Paper 1</h5>
                                    <p className="card-text">1994 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1994_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1994 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1994 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1994_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1994 Paper 2</h5>
                                    <p className="card-text">1994 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1994_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1994 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1994 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1994_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1993 Paper 1</h5>
                                    <p className="card-text">1993 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1993_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1993 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1993 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1993_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1993 Paper 2</h5>
                                    <p className="card-text">1993 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1993_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1993 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1993 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1993_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1992 Paper 1</h5>
                                    <p className="card-text">1992 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1992_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1992 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1992 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1992_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1992 Paper 2</h5>
                                    <p className="card-text">1992 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1992_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1992 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1992 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1992_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1991 Paper 1</h5>
                                    <p className="card-text">1991 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1991_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1991 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1991 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1991_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1991 Paper 2</h5>
                                    <p className="card-text">1991 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1991_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1991 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1991 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1991_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1990 Paper 1</h5>
                                    <p className="card-text">1990 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1990_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1990 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1990 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1990_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1990 Paper 2</h5>
                                    <p className="card-text">1990 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1990_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1990 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1990 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1990_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1989 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1989 Paper 1</h5>
                                    <p className="card-text">1989 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1989_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1989 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1989 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1989_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1989 Paper 2</h5>
                                    <p className="card-text">1989 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1989_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1989 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1989 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1989_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1988 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1988 Paper 1</h5>
                                    <p className="card-text">1988 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1988_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1988 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1988 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1988_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1988 Paper 2</h5>
                                    <p className="card-text">1988 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1988_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1988 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1988 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1988_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1987 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1987 Paper 1</h5>
                                    <p className="card-text">1987 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1987_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1987 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1987 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1987_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1987 Paper 2</h5>
                                    <p className="card-text">1987 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1987_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1987 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1987 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1987_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1986 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1986 Paper 1</h5>
                                    <p className="card-text">1986 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1986_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1986 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1986 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1986_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1986 Paper 2</h5>
                                    <p className="card-text">1986 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1986_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1986 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1986 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1986_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1985 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1985 Paper 1</h5>
                                    <p className="card-text">1985 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1985_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1985 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1985 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1985_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1985 Paper 2</h5>
                                    <p className="card-text">1985 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1985_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1985 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1985 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1985_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1984 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1984 Paper 1</h5>
                                    <p className="card-text">1984 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1984_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1984 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1984 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1984_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1984 Paper 2</h5>
                                    <p className="card-text">1984 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1984_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1984 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1984 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1984_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1983 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1983 Paper 1</h5>
                                    <p className="card-text">1983 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1983_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1983 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1983 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1983_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1983 Paper 2</h5>
                                    <p className="card-text">1983 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1983_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1983 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1983 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1983_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 1982 */}
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1982 Paper 1</h5>
                                    <p className="card-text">1982 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1982_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1982 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1982 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1982_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1982 Paper 2</h5>
                                    <p className="card-text">1982 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1982_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1982 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1982 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1982_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1981 Paper 1</h5>
                                    <p className="card-text">1981 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1981_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1981 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1981 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1981_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1981 Paper 2</h5>
                                    <p className="card-text">1981 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1981_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1981 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1981 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1981_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1980 Paper 1</h5>
                                    <p className="card-text">1980 Additional Mathematics Paper 1</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1980_p1"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1980 Paper 1 Marking Scheme</h5>
                                    <p className="card-text">
                                        1980 Additional Mathematics Paper 1 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1980_p1ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1980 Paper 2</h5>
                                    <p className="card-text">1980 Additional Mathematics Paper 2</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1980_p2"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">1980 Paper 2 Marking Scheme</h5>
                                    <p className="card-text">
                                        1980 Additional Mathematics Paper 2 Marking Scheme
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="amaths_1980_p2ans"
                                    >
                                        <i className="material-icons-outlined">cloud_download</i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* PMaths Section */}
                    <h2 style={{ textAlign: "center" }}>Pure Mathematics</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        {/* Cards for PMaths will be inserted here */}
                    </div>
                </div>
            </div>
        </>
    )
}
