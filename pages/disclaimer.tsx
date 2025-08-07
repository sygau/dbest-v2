import Head from 'next/head'

export default function DisclaimerPage() {
    return (
        <>
            <Head>
                <title>免責聲明 | dse.best</title>
                <meta name="description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta name="robots" content="index" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="免責聲明 | dse.best" />
                <meta property="og:description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/disclaimer" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">其他</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                免責聲明
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: 800 }}>
                <div className="card-body">
                    <h1>免責聲明 Disclaimer</h1>
                    <br />
                    <h3>中文</h3>
                    <p>
                        本網站所載之香港中學文憑考試（HKDSE）試題及相關資源均屬香港考試及評核局（HKEAA）之智慧財產。本網站僅供學術研究及個人學習用途，旨在協助學生自學及溫習，並無任何商業用途或牟利行為。
                        <br />
                        <br />
                        用戶不得將本站內容用於任何形式的商業用途，包括但不限於轉載、公開展示、發佈、售賣或作為教材於收費課程中使用。未經授權，嚴禁以任何方式複製、修改、分發或發佈本站內容。
                        <br />
                        <br />
                        本網站所提供之資源均來自公開渠道或用戶投稿，本站已盡力確保內容的準確性及合法性，但不保證所有內容均無誤或完全合法。若內容涉及第三方版權或其他權益，請相關權利人及時與我們聯絡，我們將於核實後盡快移除相關內容。
                        <br />
                        <br />
                        使用本站資源所產生之一切後果，本站概不負責。用戶應自行判斷及承擔風險。
                        <br />
                        如有任何疑問或發現侵權內容，請即
                        <a
                            href="/contact"
                            style={{ color: "inherit", textDecoration: "underline" }}
                        >
                            聯絡我們
                        </a>
                        。
                    </p>
                    <hr />
                    <h3>English</h3>
                    <p>
                        All HKDSE past papers and related materials on this website are the
                        intellectual property of the Hong Kong Examinations and Assessment
                        Authority (HKEAA). This website is intended solely for academic research
                        and personal study purposes, to assist students in self-study and
                        revision. No commercial use or profit-making activity is intended or
                        permitted.
                        <br />
                        <br />
                        Users must not use any content from this site for commercial purposes,
                        including but not limited to redistribution, public display,
                        publication, sale, or use as teaching material in paid courses.
                        Unauthorized copying, modification, distribution, or publication of any
                        content from this site is strictly prohibited.
                        <br />
                        <br />
                        The resources provided on this website are sourced from public channels
                        or user submissions. While we strive to ensure the accuracy and legality
                        of all content, we do not guarantee that all materials are error-free or
                        fully compliant with copyright laws. If any content involves third-party
                        copyright or other rights, please contact us promptly. Upon
                        verification, we will remove the relevant content as soon as possible.
                        <br />
                        <br />
                        The website assumes no responsibility for any consequences arising from
                        the use of its resources. Users should exercise their own judgment and
                        bear all risks.
                        <br />
                        <br />
                        If you have any questions or discover any infringing content, please{" "}
                        <a
                            href="/contact"
                            style={{ color: "inherit", textDecoration: "underline" }}
                        >
                            contact us
                        </a>{" "}
                        immediately.
                    </p>
                </div>
            </div>
        </>
    )
}
