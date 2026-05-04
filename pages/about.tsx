import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'

export default function AboutPage() {
    return (
        <>
            <PageSEO
              title="關於 dse.best"
              description="關於 dse.best，我們致力於為香港DSE考生提供最優質的學習資源，包括歷屆試題、考試技巧和學習指南。"
              ogTitle="關於 dse.best"
              ogDescription="關於 dse.best，我們致力於為香港DSE考生提供最優質的學習資源，包括歷屆試題、考試技巧和學習指南。"
              ogUrl="https://dse.best/about"
              robots={['index', 'follow']}
            />

                <PageBreadcrumb section="其他" text="關於我們" />
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
