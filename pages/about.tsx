import Head from 'next/head'
import { getMainPageMetadata } from '../utils/structuredData';

export default function AboutPage() {
  const metadata = getMainPageMetadata('about');

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
                                    關於我們
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/*end breadcrumb*/}
                <div className="card rounded-4" style={{ height: "auto" }}>
                    <div className="card-body">
                        <h1>關於我們 About Us</h1>
                        <br />
                        <p>
                            歡迎來到 <strong>dse.best</strong>
                            ，我們是香港DSE考生的學習夥伴，致力於提供最優質的學習資源和支援。
                        </p>
                        <hr />
                        <h5>1. 我們的使命</h5>
                        <ul>
                            <li>為香港 DSE 考生提供全面、易用的學習資源</li>
                            <li>幫助學生有效準備 DSE 考試，提升學習效率</li>
                            <li>建立一個互相支持的學習社群，分享考試技巧和經驗</li>
                            <li>提供最新的 DSE 考試資訊和趨勢分析</li>
                        </ul>
                        <hr />
                        <h5>2. 我們的價值觀</h5>
                        <ul>
                            <li>我們了解 DSE 考試的挑戰，致力於為學生提供實用幫助</li>
                            <li>定期更新內容，確保資訊的準確性和時效性</li>
                        </ul>
                        <hr />
                        <h5>3. 我們的服務</h5>
                        <ul>
                            <li>提供各科學習資源和考試技巧</li>
                            <li>定期更新 DSE 最新資訊和考試動態</li>
                            <li>分享實用的學習方法和時間管理技巧</li>
                            <li>提供 JUPAS 選科和升學資訊</li>
                        </ul>
                        <hr />
                        <h5>4. 聯繫我們</h5>
                        <ul>
                            <li>如有任何問題或建議，歡迎隨時與我們聯繫：</li>
                            <li>
                                電郵：<a href="mailto:info@dse.best">info@dse.best</a>
                            </li>
                            <li>我們會盡快回覆您的查詢</li>
                        </ul>
                        <hr />
                    </div>
                </div>
        </>
    )
}
