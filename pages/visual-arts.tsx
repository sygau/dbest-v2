import Head from 'next/head'
import { BiDownload } from 'react-icons/bi';

export default function VisualArtsPage() {
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
                    <h1 className="mb-4">DSE 視覺藝術 Visual Arts 歷屆試題 Past Papers</h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 視覺藝術 Visual Arts 歷屆試題。資源即將上線，敬請期待！
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
                    <div
                        className="text-center"
                        style={{ fontSize: "1.5rem", color: "#888" }}
                    >
                        <b>Coming soon / Work in progress</b>
                    </div>
                </div>
            </div>
        </>
    )
}
