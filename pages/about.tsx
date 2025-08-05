import Head from 'next/head'

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>關於我們 - dse.best</title>
                <meta name="description" content="DSEBest 介紹 - 我們是一群熱衷於教育的專業人士，致力於為香港DSE考生提供最優質的學習資源，包括歷屆試題、考試技巧和學習指南。" />
                <meta name="robots" content="index" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="關於我們 - dse.best" />
                <meta property="og:description" content="認識 DSEBest 團隊 - 我們由教育專家和前DSE考生組成，致力於為香港學生提供最全面的DSE備考資源和支援。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/about" />
                <meta property="og:type" content="website" />
            </Head>

                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">其他</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;">
                                        <i className="bx bx-home-alt" />
                                    </a>
                                </li>
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
                            歡迎來到 <strong>DSEBest</strong>
                            ，我們是香港DSE考生的學習夥伴，致力於提供最優質的學習資源和支援。
                        </p>
                        <hr />
                        <h5>1. 我們的使命</h5>
                        <ul>
                            <li>為香港DSE考生提供全面、易用的學習資源</li>
                            <li>幫助學生有效準備DSE考試，提升學習效率</li>
                            <li>建立一個互相支持的學習社群，分享考試技巧和經驗</li>
                            <li>提供最新的DSE考試資訊和趨勢分析</li>
                        </ul>
                        <hr />
                        <h5>2. 我們的團隊</h5>
                        <ul>
                            <li>由經驗豐富的教育工作者和學科專家組成</li>
                            <li>團隊成員包括前DSE考生和現職教師</li>
                            <li>我們了解DSE考試的挑戰，致力於為學生提供實用幫助</li>
                            <li>定期更新內容，確保資訊的準確性和時效性</li>
                        </ul>
                        <hr />
                        <h5>3. 我們的服務</h5>
                        <ul>
                            <li>完整收錄歷屆DSE試題及答案</li>
                            <li>提供各科學習資源和考試技巧</li>
                            <li>定期更新DSE最新資訊和考試動態</li>
                            <li>分享實用的學習方法和時間管理技巧</li>
                            <li>提供JUPAS選科和升學資訊</li>
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
                        <h5>5. 加入我們</h5>
                        <ul>
                            <li>我們正在尋找對教育充滿熱情的人才</li>
                            <li>歡迎教育工作者、內容創作者和網頁開發者加入我們的團隊</li>
                            <li>
                                請將您的履歷和求職信發送至：
                                <a href="mailto:info@dse.best">info@dse.best</a>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
        </>
    )
}
