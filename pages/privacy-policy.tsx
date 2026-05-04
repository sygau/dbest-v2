import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageSEO
              title="私隱政策 Privacy Policy"
              description="dse.best 私隱政策。了解我們如何收集、使用及保護您的個人資料，確保您在使用本網站時的私隱安全。"
              ogTitle="私隱政策 Privacy Policy"
              ogDescription="dse.best 私隱政策。了解我們如何收集、使用及保護您的個人資料。"
              ogUrl="https://dse.best/privacy-policy"
              robots={['index', 'follow']}
            />

            <PageBreadcrumb section="其他" text="私隱政策" />
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1>私隱政策 Privacy Policy</h1>
                    <br />
                    <p>
                        歡迎瀏覽 <strong>dse.best</strong>
                        （下稱「本網站」）。本政策說明我們如何收集、使用、儲存及保護您的個人資料，以及與
                        Google Analytics 和 Cookies 相關的資訊。
                    </p>
                    <hr />
                    <h5>1. 資料收集方式</h5>
                    <ul>
                        <li>
                            當您瀏覽本網站時，我們會自動收集某些非個人識別資料（如瀏覽器類型、裝置型號、瀏覽頁面、IP
                            位址等）。
                        </li>
                        <li>
                            本網站使用 Google Analytics
                            服務，協助我們分析網站流量及用戶行為，從而改善內容和用戶體驗。
                        </li>
                        <li>
                            Google Analytics 會使用 cookies 及其他追蹤技術來收集資料。這些 cookies
                            可識別您的瀏覽器，但不會直接識別您的身份。
                        </li>
                        <li>
                            我們不會主動要求或收集您的個人身份資料（如姓名、電郵等），除非您主動透過聯絡表格或電郵提供。
                        </li>
                    </ul>
                    <hr />
                    <h5>2. Cookies 的使用</h5>
                    <ul>
                        <li>
                            Cookies 是儲存在您裝置上的小型文字檔案，用於記錄和追蹤您的網站活動。
                        </li>
                        <li>我們使用 cookies 來分析網站流量、記錄偏好設定及增強網站功能。</li>
                        <li>
                            Google Analytics cookies 會收集匿名流量資料，包括瀏覽行為、裝置資訊及
                            IP 位址。
                        </li>
                        <li>
                            您可於瀏覽器設定中停用 cookies，或安裝{" "}
                            <a
                                href="https://tools.google.com/dlpage/gaoptout"
                                target="_blank"
                                rel="noopener"
                            >
                                Google Analytics Opt-out Browser Add-on
                            </a>{" "}
                            以選擇退出追蹤。
                        </li>
                        <li>
                            更多有關 Google 如何使用 cookies，請參閱{" "}
                            <a
                                href="https://policies.google.com/technologies/cookies"
                                target="_blank"
                                rel="noopener"
                            >
                                Google Cookies 政策
                            </a>
                            。
                        </li>
                    </ul>
                    <hr />
                    <h5>3. 資料用途及處理</h5>
                    <ul>
                        <li>分析網站流量、用戶行為及網站效能，以提升內容質素及用戶體驗。</li>
                        <li>監察網站安全、防止濫用及偵測異常活動。</li>
                        <li>遵守法律法規及相關規定。</li>
                        <li>
                            我們不會將您的個人資料出售、交換或公開，除非獲得您的同意或法律要求。
                        </li>
                        <li>
                            Google Analytics 作為第三方服務供應商，會根據其私隱政策處理有關資料。
                        </li>
                    </ul>
                    <hr />
                    <h5>4. 資料儲存與保安</h5>
                    <ul>
                        <li>
                            本網站會採取合理措施保障資料安全，防止未經授權的存取、披露、修改或毀壞。
                        </li>
                        <li>
                            所有 Google Analytics 數據均儲存於 Google 伺服器，並受其安全政策保護。
                        </li>
                        <li>我們不會長期保存任何用戶個人資料，除非用戶主動聯絡我們。</li>
                    </ul>
                    <hr />
                    <h5>5. 用戶權利與選擇</h5>
                    <ul>
                        <li>您有權查閱、更正或要求刪除我們所持有的您的個人資料（如有）。</li>
                        <li>您可選擇停用 cookies 或退出 Google Analytics 追蹤。</li>
                        <li>
                            如您對本私隱政策有任何疑問，請透過{" "}
                            <a href="mailto:info@dse.best">info@dse.best</a> 聯絡我們。
                        </li>
                    </ul>
                    <hr />
                    <h5>6. 兒童私隱</h5>
                    <ul>
                        <li>
                            本網站內容主要面向一般公眾，並無特別針對兒童。如發現有兒童資料被收集，請即聯絡我們，我們會及時處理。
                        </li>
                    </ul>
                    <hr />
                    <h5>7. 連結至其他網站</h5>
                    <ul>
                        <li>
                            本網站可能包含前往第三方網站的連結。這些網站有其獨立的私隱政策，我們不對其內容或做法負責。
                        </li>
                    </ul>
                    <hr />
                    <h5>8. 私隱政策更新</h5>
                    <ul>
                        <li>
                            我們可能會不時更新本私隱政策。所有更改會於本頁公佈，敬請定期查閱。
                        </li>
                    </ul>
                    <hr />
                </div>
            </div>
        </>
    )
}
