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
                    <h3>中文</h3>
                    <div className="disclaimer-content">
                        <p><strong>網站目的與性質</strong></p>
                        <p>本網站旨在為學生提供學習資源和參考資料，包括但不限於考試資訊、學習材料、成績分析等。本網站純屬教育性質，旨在協助學生學習和準備考試。</p>
                        
                        <p><strong>資訊準確性</strong></p>
                        <p>本網站提供的所有資訊僅供參考，我們努力確保資訊的準確性和時效性，但不保證所有資訊的完全準確性、完整性或最新性。資訊可能隨時更新或變更，恕不另行通知。</p>
                        
                        <p><strong>免責聲明</strong></p>
                        <p>使用本網站及其內容的風險由用戶自行承擔。本網站不對以下情況承擔任何責任：</p>
                        <ul>
                            <li>因使用本網站資訊而導致的任何直接或間接損失</li>
                            <li>資訊的準確性、完整性或適用性</li>
                            <li>因網站技術問題導致的服務中斷或延誤</li>
                            <li>第三方網站連結的內容或服務</li>
                        </ul>
                        
                        <p><strong>教育建議</strong></p>
                        <p>本網站提供的學習建議和策略僅供參考，不應視為專業教育建議。學生應根據自身情況和需求，結合專業教師指導，制定適合的學習計劃。</p>
                        
                        <p><strong>版權聲明</strong></p>
                        <p>本網站內容受版權保護，未經許可不得複製、分發或商業使用。部分內容可能來自第三方，其版權歸原作者所有。</p>
                        
                        <p><strong>聯絡我們</strong></p>
                        <p>如對本免責聲明有任何疑問，請通過網站聯絡頁面與我們聯繫。</p>
                        
                        <p><em>最後更新：2024年12月30日</em></p>
                    </div>
                    
                    <hr />
                    <h3>English</h3>
                    <div className="disclaimer-content">
                        <p><strong>Website Purpose and Nature</strong></p>
                        <p>This website is designed to provide educational resources and reference materials for students, including but not limited to examination information, study materials, grade analysis, and academic guidance. This website is purely educational in nature and aims to assist students in their learning and exam preparation.</p>
                        
                        <p><strong>Information Accuracy</strong></p>
                        <p>All information provided on this website is for reference purposes only. While we strive to ensure the accuracy and timeliness of information, we do not guarantee the complete accuracy, completeness, or currency of all information. Information may be updated or changed at any time without prior notice.</p>
                        
                        <p><strong>Disclaimer of Liability</strong></p>
                        <p>The risk of using this website and its content is borne by the user. This website shall not be liable for the following circumstances:</p>
                        <ul>
                            <li>Any direct or indirect losses resulting from the use of information on this website</li>
                            <li>The accuracy, completeness, or applicability of information</li>
                            <li>Service interruptions or delays due to technical issues</li>
                            <li>Content or services of third-party website links</li>
                        </ul>
                        
                        <p><strong>Educational Advice</strong></p>
                        <p>Learning suggestions and strategies provided on this website are for reference only and should not be considered as professional educational advice. Students should develop appropriate study plans based on their individual circumstances and needs, in consultation with professional educators.</p>
                        
                        <p><strong>Copyright Notice</strong></p>
                        <p>The content of this website is protected by copyright and may not be reproduced, distributed, or used commercially without permission. Some content may be sourced from third parties, and the copyright belongs to the original authors.</p>
                        
                        <p><strong>Contact Us</strong></p>
                        <p>If you have any questions about this disclaimer, please contact us through the website's contact page.</p>
                        
                        <p><em>Last updated: December 30, 2024</em></p>
                    </div>
                </div>
            </div>
        </>
    )
}
