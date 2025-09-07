import Head from 'next/head'
import { getMainPageMetadata } from '../utils/structuredData';

export default function DisclaimerPage() {
  const metadata = getMainPageMetadata('disclaimer');

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
                        or user submissions. (e.g. dse[.]rioho[.]dev dse247[.]com dselib[.]com etc.)
                        We do not obtain, scan, nor distribute any of the past papers.
                        While we strive to ensure the accuracy and legality
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
                        or email us at <a href="mailto:info@dse.best">info@dse.best</a> immediately.
                        We appreciate your understanding and cooperation.
                    </p>
                </div>
            </div>
        </>
    )
}
