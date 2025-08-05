import Head from 'next/head'
import { useEffect } from 'react'

export default function ChatPage() {
    useEffect(() => {
        // Destroy existing chat instance if it exists
        if ((window as any).dseChat) {
            (window as any).dseChat.destroy();
            (window as any).dseChat = null;
        }

        // Load Ably script if not already loaded
        if (!(window as any).Ably && !(window as any).AblyLoading) {
            (window as any).AblyLoading = true;
            const ablyScript = document.createElement('script');
            ablyScript.src = 'https://cdn.ably.com/lib/ably.min-1.js';
            ablyScript.onload = () => {
                (window as any).AblyLoaded = true;
                (window as any).AblyLoading = false;
                loadChatScript();
            };
            ablyScript.onerror = () => {
                console.error('Failed to load Ably script');
                (window as any).AblyLoading = false;
            };
            document.head.appendChild(ablyScript);
        } else if ((window as any).Ably) {
            loadChatScript();
        }

        function loadChatScript() {
            // Load chat script if not already loaded
            if (!(window as any).DSEChatLoaded) {
                const chatScript = document.createElement('script');
                chatScript.src = '/assets/js/chat.js';
                chatScript.onload = () => {
                    (window as any).DSEChatLoaded = true;
                    initializeChat();
                };
                chatScript.onerror = () => {
                    console.error('Failed to load chat script');
                };
                document.head.appendChild(chatScript);
            } else {
                initializeChat();
            }
        }

        function initializeChat() {
            // Check if chat elements exist on the page
            if (document.getElementById('chatMessages')) {
                try {
                    (window as any).dseChat = new (window as any).DSEChat();
                    (window as any).dseChat.init();
                } catch (error) {
                    console.error('Failed to initialize chat:', error);
                }
            }
        }

        // Cleanup function
        return () => {
            if ((window as any).dseChat) {
                (window as any).dseChat.destroy();
                (window as any).dseChat = null;
            }
        };
    }, []);

    return (
        <>
            <Head>
                <title>Chatroom 聊天室 - dse.best</title>
                <meta name="description" content="DSE Best學習交流聊天室，與其他同學一起討論學習心得，分享DSE備考經驗。" />
                <meta name="robots" content="noindex, nofollow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Chatroom 聊天室 - dse.best" />
                <meta property="og:description" content="DSE Best學習交流聊天室，與其他同學一起討論學習心得，分享DSE備考經驗。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/chat" />
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
                                聊天室 Chatroom
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div
                    className="card-body d-flex flex-column gap-3"
                    style={{ height: "75vh" }}
                >
                    {/* Connection status & username with rules button */}
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2 small">
                            <span id="statusDot" className="badge rounded-pill bg-danger">
                                &nbsp;
                            </span>
                            <span id="statusText">Connecting…</span>
                        </div>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            id="rulesBtn"
                            type="button"
                            title="Chat Rules"
                            data-bs-toggle="modal"
                            data-bs-target="#rulesModal"
                        >
                            <i className="material-icons-outlined">menu_book</i>
                        </button>
                    </div>
                    {/* Chat messages */}
                    <div
                        id="chatMessages"
                        className="flex-grow-1 overflow-auto border rounded-3 p-3 bg-transparent"
                        style={{ height: "75vh" }}
                    />
                    {/* Chat input wrapper with responsive layout */}
                    <div className="d-flex gap-2">
                        {/* Username input - desktop inline, mobile in modal */}
                        <div className="input-group d-none d-md-flex" style={{ width: 200 }}>
                            <input
                                type="text"
                                id="userNameInput"
                                className="form-control"
                                maxLength={14}
                                placeholder="Your name"
                                disabled
                            />
                            <button
                                className="btn btn-outline-secondary"
                                id="editNameBtn"
                                type="button"
                                aria-label="Edit username"
                            >
                                <i className="material-icons-outlined">edit</i>
                            </button>
                        </div>
                        <div className="d-block d-md-none">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#usernameModal"
                            >
                                <i className="material-icons-outlined">account_circle</i>
                            </button>
                        </div>
                        {/* Message input */}
                        <div className="input-group flex-grow-1">
                            <input
                                type="text"
                                id="messageInput"
                                className="form-control"
                                placeholder="Type a message… (max 150 chars)"
                                autoComplete="off"
                                maxLength={150}
                            />
                            <button
                                className="btn btn-primary"
                                id="sendButton"
                                type="button"
                                aria-label="Send message"
                            >
                                <i className="material-icons-outlined">send</i>
                            </button>
                        </div>
                    </div>
                    {/* Character counter */}
                    <div className="text-end">
                        <small id="charCounter" className="text">
                            0/150
                        </small>
                    </div>
                    {/* Username Modal for mobile */}
                    <div
                        className="modal fade"
                        id="usernameModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Change Username</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            id="userNameInputMobile"
                                            className="form-control"
                                            maxLength={14}
                                            placeholder="Your name"
                                        />
                                        <button
                                            className="btn btn-primary"
                                            id="saveUsernameBtn"
                                            type="button"
                                        >
                                            <i className="material-icons-outlined">save</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Chat Rules Modal */}
                    <div
                        className="modal fade"
                        id="rulesModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="material-icons-outlined me-2">menu_book</i>
                                        DSEBest 聊天室規則 Chatroom Rules
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="rules-content">
                                        <h6 className="text-primary mb-3">
                                            <i
                                                className="material-icons-outlined me-1"
                                                style={{ fontSize: 18 }}
                                            >
                                                policy
                                            </i>
                                            基本規則 Basic Rules
                                        </h6>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-success me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    check_circle
                                                </i>
                                                <strong>保持尊重</strong> - 請以禮待人，尊重所有用戶 Be
                                                respectful to all users
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-success me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    check_circle
                                                </i>
                                                <strong>學術討論</strong> - 歡迎分享學習心得和DSE相關話題
                                                Focus on academic discussions and DSE topics
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-success me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    check_circle
                                                </i>
                                                <strong>互相幫助</strong> - 鼓勵解答疑問和分享資源 Help each
                                                other with questions and share resources
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-success me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    check_circle
                                                </i>
                                                <strong>適當用戶名</strong> - 請使用合適的用戶名稱 Use
                                                appropriate usernames
                                            </li>
                                        </ul>
                                        <h6 className="text-danger mb-3 mt-4">
                                            <i
                                                className="material-icons-outlined me-1"
                                                style={{ fontSize: 18 }}
                                            >
                                                block
                                            </i>
                                            禁止行為 Prohibited Behavior
                                        </h6>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>粗言穢語</strong> - 嚴禁使用不當言語或仇恨言論 No
                                                profanity, hate speech, or offensive language
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>垃圾訊息</strong> - 禁止發送重複或無意義的訊息 No
                                                spam, repetitive, or meaningless messages
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>分享連結</strong> - 禁止分享外部連結或個人聯絡方式
                                                No external links or personal contact information
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>騷擾行為</strong> - 禁止騷擾、欺凌或針對特定用戶 No
                                                harassment, bullying, or targeting specific users
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>不當內容</strong> - 禁止分享不當或成人內容 No
                                                inappropriate or adult content
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-danger me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    cancel
                                                </i>
                                                <strong>廣告宣傳</strong> - 禁止商業廣告或推廣活動 No
                                                commercial advertising or promotional content
                                            </li>
                                        </ul>
                                        <h6 className="text-warning mb-3 mt-4">
                                            <i
                                                className="material-icons-outlined me-1"
                                                style={{ fontSize: 18 }}
                                            >
                                                warning
                                            </i>
                                            技術限制 Technical Limits
                                        </h6>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-warning me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    schedule
                                                </i>
                                                <strong>發送頻率</strong> -
                                                每條訊息間隔15秒，每分鐘最多8條訊息 15-second cooldown
                                                between messages, max 8 per minute
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-warning me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    text_fields
                                                </i>
                                                <strong>訊息長度</strong> - 每條訊息最多150字符 Maximum 150
                                                characters per message
                                            </li>
                                            <li className="mb-2">
                                                <i
                                                    className="material-icons-outlined text-warning me-2"
                                                    style={{ fontSize: 16 }}
                                                >
                                                    badge
                                                </i>
                                                <strong>用戶名長度</strong> - 用戶名需3-14字符 Username must
                                                be 3-14 characters
                                            </li>
                                        </ul>
                                        <h6 className="text-info mb-3 mt-4">
                                            <i
                                                className="material-icons-outlined me-1"
                                                style={{ fontSize: 18 }}
                                            >
                                                emoji_emotions
                                            </i>
                                            表情符號 Emoji Shortcuts
                                        </h6>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled small">
                                                    <li>
                                                        <code>:heart:</code> ❤️ <code>:smile:</code> 😊{" "}
                                                        <code>:laugh:</code> 😂
                                                    </li>
                                                    <li>
                                                        <code>:thumbsup:</code> 👍 <code>:fire:</code> 🔥{" "}
                                                        <code>:star:</code> ⭐
                                                    </li>
                                                    <li>
                                                        <code>:coffee:</code> ☕ <code>:pizza:</code> 🍕{" "}
                                                        <code>:book:</code> 📚
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled small">
                                                    <li>
                                                        <code>:check:</code> ✅ <code>:cross:</code> ❌{" "}
                                                        <code>:thinking:</code> 🤔
                                                    </li>
                                                    <li>
                                                        <code>:party:</code> 🎉 <code>:muscle:</code> 💪{" "}
                                                        <code>:brain:</code> 🧠
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="alert alert-info mt-4" role="alert">
                                            <i className="material-icons-outlined me-2">info</i>
                                            <strong>記住:</strong>{" "}
                                            違反規則可能導致暫時或永久禁言。管理員會監察聊天室以確保良好環境。
                                            <br />
                                            <strong>Remember:</strong> Rule violations may result in
                                            temporary or permanent bans. Moderators monitor the chat to
                                            ensure a positive environment.
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className="material-icons-outlined me-1">close</i>
                                        關閉 Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
