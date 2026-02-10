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
            <div className="card rounded-4" style={{ minHeight: 'auto' }}>
                <div className="card-body">
                    <h1>免責聲明 Disclaimer</h1>
                    <br />

                    {/* 中文版 */}
                    <h3>中文</h3>
                    <div className="disclaimer-content">
                        <p><strong>1. 網站目的與工具性質</strong></p>
                        <p>本網站（下稱「本站」）旨在為學生提供學習輔助工具（如操卷計時器）及參考資料。本站並非香港考試及評核局（考評局）之官方網站，與考評局無任何隸屬或關聯關係。本站純屬教育輔助性質，旨在協助學生進行模擬練習。</p>

                        <p><strong>2. 資訊與時間準確性</strong></p>
                        <p>本站提供的所有資訊及計時設定僅供參考。我們努力確保資訊的準確性和時效性，但不保證所有資訊的完全準確性、完整性或最新性。</p>
                        <ul>
                            <li><strong>技術誤差聲明：</strong> 網頁計時工具之準確度可能受用戶硬件設備、瀏覽器效能、系統休眠或網絡狀況影響。用戶應理解本工具僅供模擬練習參考，不應視為唯一精確的計時標準。</li>
                            <li>如因計時誤差或技術故障導致之任何後果（如模擬考試時間不準），本站概不負責。</li>
                        </ul>

                        <p><strong>3. 免責聲明與風險承擔</strong></p>
                        <p>使用本網站及其內容的風險由用戶自行承擔。在法律允許的最大範圍內，本站不對以下情況承擔任何責任：</p>
                        <ul>
                            <li>因使用本網站資訊或工具而導致的任何直接或間接損失</li>
                            <li>因網站技術問題、伺服器維護或第三方服務故障導致的服務中斷或延誤</li>
                            <li>第三方網站連結的內容或服務</li>
                        </ul>

                        <p><strong>4. 版權與商標聲明</strong></p>
                        <p>本站原創之代碼、介面設計及內容受版權保護。本站所引述或提及之「HKDSE」、「DSE」及相關科目名稱，其商標及版權均屬其原權利人（包括香港考試及評核局）所有。本站使用該等名稱僅作識別及教育用途（Fair Use），並不代表本站擁有該等權利，亦不暗示任何官方認可。</p>

                        <p><strong>5. 教育建議</strong></p>
                        <p>本網站提供的學習建議和策略僅供參考，不應視為專業教育建議。學生應根據自身情況，結合學校老師及專業導師的指導，制定適合的學習計劃。</p>

                        <p><strong>6. 聯絡我們</strong></p>
                        <p>如對本免責聲明有任何疑問，請通過網站聯絡頁面與我們聯繫。</p>

                        <p><em>最後更新：2024年12月30日</em></p>
                    </div>

                    <hr className="my-4" />

                    {/* 英文版 */}
                    <h3>English</h3>
                    <div className="disclaimer-content">
                        <p><strong>1. Purpose and Nature of the Website</strong></p>
                        <p>This website (hereinafter referred to as "this Site") aims to provide educational auxiliary tools (such as exam timers) and reference materials for students. This Site is NOT an official website of the Hong Kong Examinations and Assessment Authority (HKEAA) and has no affiliation or association with the HKEAA. This Site is purely educational in nature, intended to assist students in mock practice.</p>

                        <p><strong>2. Accuracy of Information and Timing</strong></p>
                        <p>All information and timer settings provided on this Site are for reference only. While we strive to ensure accuracy, we do not guarantee the complete accuracy, completeness, or currency of all information.</p>
                        <ul>
                            <li><strong>Technical Discrepancy Disclaimer:</strong> The accuracy of web-based timing tools may be affected by user hardware, browser performance, system sleep modes, or network conditions. Users should understand that these tools are for simulation reference only and should not be regarded as the sole precise standard for timing.</li>
                            <li>This Site shall not be liable for any consequences (e.g., inaccurate mock exam timing) resulting from timing errors or technical malfunctions.</li>
                        </ul>

                        <p><strong>3. Disclaimer of Liability</strong></p>
                        <p>The risk of using this Site and its content is borne solely by the user. To the fullest extent permitted by law, this Site shall not be liable for:</p>
                        <ul>
                            <li>Any direct or indirect losses resulting from the use of information or tools on this Site</li>
                            <li>Service interruptions or delays due to technical issues, server maintenance, or third-party service failures</li>
                            <li>Content or services of third-party external links</li>
                        </ul>

                        <p><strong>4. Copyright and Trademark Notice</strong></p>
                        <p>Original code, interface design, and content of this Site are protected by copyright. Trademarks and copyrights for "HKDSE," "DSE," and related subject names mentioned on this Site belong to their respective owners (including the HKEAA). The use of such names on this Site is for identification and educational purposes only (Fair Use), does not imply ownership by this Site, and does not imply any official endorsement.</p>

                        <p><strong>5. Educational Advice</strong></p>
                        <p>Learning suggestions and strategies provided on this Site are for reference only and should not be considered professional educational advice. Students should develop study plans based on their own circumstances and guidance from professional educators.</p>

                        <p><strong>6. Contact Us</strong></p>
                        <p>If you have any questions about this disclaimer, please contact us through the website's contact page.</p>

                        <p><em>Last updated: December 30, 2024</em></p>
                    </div>
                </div>
            </div>
        </>
    )
}
