import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getMainPageMetadata } from '../utils/structuredData';
import {
    BiHomeAlt,
    BiBook,
    BiEditAlt,
    BiSend,
    BiCheck,
    BiUserCircle,
    BiShield,
    BiBlock,
    BiTime,
    BiText,
    BiIdCard,
    BiSmile,
    BiInfoCircle,
    BiX,
    BiMessageRounded,
    BiWifi,
    BiWifiOff,
    BiPencil
} from 'react-icons/bi'

export default function ChatPage() {
    const metadata = getMainPageMetadata('chat');
    const [showRules, setShowRules] = useState(false);
    const [isClosingRules, setIsClosingRules] = useState(false);
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [isClosingUsernameModal, setIsClosingUsernameModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [statusText, setStatusText] = useState('Connecting...');
    const [isModerator, setIsModerator] = useState(false);

    const handleCloseRules = () => {
        setIsClosingRules(true);
        setTimeout(() => {
            setShowRules(false);
            setIsClosingRules(false);
        }, 300);
    };

    const handleCloseUsernameModal = () => {
        setIsClosingUsernameModal(true);
        setTimeout(() => {
            setShowUsernameModal(false);
            setIsClosingUsernameModal(false);
        }, 300);
    };

    useEffect(() => {
        // Destroy existing chat instance if it exists
        if ((window as any).dseChat) {
            (window as any).dseChat.destroy();
            (window as any).dseChat = null;
        }

        // Add event listener for showing rules modal from JavaScript
        const handleShowRulesModal = (event: CustomEvent) => {
            setShowRules(true);
        };

        // Add event listener for moderator status updates
        const handleModeratorStatus = (event: CustomEvent) => {
            setIsModerator(event.detail.isModerator);
        };

        document.addEventListener('showRulesModal', handleShowRulesModal as EventListener);
        document.addEventListener('moderatorStatusUpdate', handleModeratorStatus as EventListener);

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
                setConnectionStatus('error');
                setStatusText('Connection failed');
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
                    setConnectionStatus('error');
                    setStatusText('Chat failed to load');
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
                    setConnectionStatus('error');
                    setStatusText('Chat failed to initialize');
                }
            }
        }

        // Cleanup function
        return () => {
            document.removeEventListener('showRulesModal', handleShowRulesModal as EventListener);
            document.removeEventListener('moderatorStatusUpdate', handleModeratorStatus as EventListener);
            if ((window as any).dseChat) {
                (window as any).dseChat.destroy();
                (window as any).dseChat = null;
            }
        };
    }, []);

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
                                聊天室 Chatroom
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}

            {/* Modern Chat Container */}
            <div className="chat-container">
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-content">
                        <div className="chat-status">
                            <div className={`status-indicator ${connectionStatus}`}>
                                {connectionStatus === 'connected' ? '🟢' :
                                    connectionStatus === 'connecting' ? '🟡' :
                                        '🔴'}
                            </div>
                            <span className="status-text">{statusText}</span>
                        </div>
                        <div className="header-buttons">
                            {isModerator && (
                                <div className="mod-indicator" title="Moderator">
                                    <BiShield style={{ color: '#ffffff', fontSize: '18px' }} />
                                </div>
                            )}
                            <button
                                className="rules-button"
                                onClick={() => setShowRules(true)}
                                title="Chat Rules"
                            >
                                <BiBook />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="messages-container">
                    <div
                        id="chatMessages"
                        className="messages-list"
                    />
                </div>

                {/* Input Area */}
                <div className="input-container">
                    <div className="input-wrapper">
                        {/* Username Input - Desktop */}
                        <div className="username-input-desktop">
                            <input
                                type="text"
                                id="userNameInput"
                                className="username-field"
                                maxLength={14}
                                placeholder="Your name"
                                disabled
                            />
                            <button
                                className="edit-name-btn"
                                id="editNameBtn"
                                type="button"
                                aria-label="Edit username"
                            >
                                <BiPencil style={{ fontSize: '16px', marginTop: '0.1rem' }} />
                            </button>
                        </div>

                        {/* Username Button - Mobile */}
                        <button
                            className="username-button-mobile"
                            onClick={() => setShowUsernameModal(true)}
                        >
                            <BiPencil style={{ fontSize: '16px', marginTop: '0.1rem' }} />
                        </button>

                        {/* Message Input */}
                        <div className="message-input-wrapper">
                            <input
                                type="text"
                                id="messageInput"
                                className="message-field"
                                placeholder="Type a message..."
                                autoComplete="off"
                                maxLength={150}
                            />
                            <button
                                className="send-button"
                                id="sendButton"
                                type="button"
                                aria-label="Send message"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5" />
                                    <path d="m5 12 7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Username Modal */}
            {(showUsernameModal || isClosingUsernameModal) && (
                <div className={`modal-overlay ${isClosingUsernameModal ? 'hide' : 'show'}`} onClick={handleCloseUsernameModal}>
                    <div className={`modal-content ${isClosingUsernameModal ? 'hide' : 'show'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Change Username</h3>
                            <button
                                className="modal-close"
                                onClick={handleCloseUsernameModal}
                            >
                                <BiX />
                            </button>
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
                                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                                >
                                    <BiCheck style={{ fontSize: '28px', marginBottom: '0.1rem', marginRight: '0.1rem' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rules Modal */}
            {(showRules || isClosingRules) && (
                <div className={`modal-overlay ${isClosingRules ? 'hide' : 'show'}`} onClick={handleCloseRules}>
                    <div className={`modal-content large ${isClosingRules ? 'hide' : 'show'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <BiBook className="me-2" />
                                DSEBest 聊天室規則 Chatroom Rules
                            </h3>
                            <button
                                className="modal-close"
                                onClick={handleCloseRules}
                            >
                                <BiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="rules-content">
                                <h6 className="rules-section info">
                                    <BiShield />
                                    基本規則 Basic Rules
                                </h6>
                                <ul className="rules-list">
                                    <li>
                                        <BiCheck className="rule-icon success" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>保持尊重</strong> - 請以禮待人，尊重所有用戶 Be
                                            respectful to all users
                                        </span>
                                    </li>
                                    <li>
                                        <BiCheck className="rule-icon success" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>學術討論</strong> - 歡迎分享學習心得和DSE相關話題
                                            Focus on academic discussions and DSE topics
                                        </span>
                                    </li>
                                    <li>
                                        <BiCheck className="rule-icon success" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>互相幫助</strong> - 鼓勵解答疑問和分享資源 Help each
                                            other with questions and share resources
                                        </span>
                                    </li>
                                    <li>
                                        <BiCheck className="rule-icon success" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>適當用戶名</strong> - 請使用合適的用戶名稱 Use
                                            appropriate usernames
                                        </span>
                                    </li>
                                </ul>

                                <h6 className="rules-section danger">
                                    <BiBlock />
                                    禁止行為 Prohibited Behavior
                                </h6>
                                <ul className="rules-list">
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>粗言穢語</strong> - 嚴禁使用不當言語或仇恨言論 No
                                            profanity, hate speech, or offensive language
                                        </span>
                                    </li>
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>垃圾訊息</strong> - 禁止發送重複或無意義的訊息 No
                                            spam, repetitive, or meaningless messages
                                        </span>
                                    </li>
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>分享連結</strong> - 禁止分享外部連結或個人聯絡方式
                                            No external links or personal contact information
                                        </span>
                                    </li>
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>騷擾行為</strong> - 禁止騷擾、欺凌或針對特定用戶 No
                                            harassment, bullying, or targeting specific users
                                        </span>
                                    </li>
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>不當內容</strong> - 禁止分享不當或成人內容 No
                                            inappropriate or adult content
                                        </span>
                                    </li>
                                    <li>
                                        <BiX className="rule-icon danger" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>廣告宣傳</strong> - 禁止商業廣告或推廣活動 No
                                            commercial advertising or promotional content
                                        </span>
                                    </li>
                                </ul>

                                <h6 className="rules-section warning">
                                    <BiTime />
                                    技術限制 Technical Limits
                                </h6>
                                <ul className="rules-list">
                                    <li>
                                        <BiTime className="rule-icon warning" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>發送頻率</strong> -
                                            每條訊息間隔3秒，每分鐘最多15條訊息 3-second cooldown
                                            between messages, max 15 per minute
                                        </span>
                                    </li>
                                    <li>
                                        <BiText className="rule-icon warning" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>訊息長度</strong> - 每條訊息最多150字符 Maximum 150
                                            characters per message
                                        </span>
                                    </li>
                                    <li>
                                        <BiIdCard className="rule-icon warning" style={{ width: '24px', height: '28px' }} />
                                        <span>
                                            <strong>用戶名長度</strong> - 用戶名需3-14字符 Username must
                                            be 3-14 characters
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* Override conflicting external CSS */
                :global(.chat-container) {
                    position: relative !important;
                    left: auto !important;
                    right: auto !important;
                    top: auto !important;
                    bottom: auto !important;
                }
                
                /* Chat-specific icon styling ONLY */
                .chat-container .edit-name-btn {
                    font-size: 16px;
                    line-height: 1;
                }

                .chat-container .send-button svg {
                    width: 16px !important;
                    height: 16px !important;
                    stroke: currentColor !important;
                    fill: none !important;
                }
                
                :global(.chat-header) {
                    position: relative !important;
                    left: auto !important;
                    right: auto !important;
                    top: auto !important;
                    bottom: auto !important;
                    height: auto !important;
                }
                
                :global(.chat-footer) {
                    position: relative !important;
                    left: auto !important;
                    right: auto !important;
                    top: auto !important;
                    bottom: auto !important;
                    height: auto !important;
                }
                
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: calc(100vh - 120px);
                    max-width: 1200px;
                    margin: 0 auto;
                    background: var(--bs-body-bg);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid var(--bs-border-color);
                    color: rgba(255, 255, 255, 0.9);
                }

                .chat-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .chat-header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-buttons {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .mod-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: #68c07c;
                    cursor: default;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(123, 242, 150, 0.3);
                }

                .chat-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: 600;
                }



                .chat-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    width: 20px;
                    height: 20px;
                }

                .status-indicator.connected {
                    color: #10b981;
                }

                .status-indicator.connecting {
                    color: #f59e0b;
                }

                .status-indicator.error {
                    color: #ef4444;
                }

                .status-indicator .pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .rules-button {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    padding: 0.4rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 36px;
                    min-height: 36px;
                }

                .rules-button svg {
                    width: 1.3em !important;
                    height: 1.3em !important;
                    font-size: 1.3em !important;
                    font-weight: bold !important;
                }

                .rules-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .messages-container {
                    flex: 1;
                    overflow: hidden;
                    background: var(--bs-body-bg);
                }

                .messages-list {
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 1rem;
                    scroll-behavior: smooth;
                    max-height: calc(100vh - 300px);
                }

                .input-container {
                    background: var(--bs-body-bg);
                    border-top: 1px solid var(--bs-border-color);
                    padding: 1rem 1.5rem;
                }

                .input-wrapper {
                    display: flex;
                    gap: 0.75rem;
                    align-items: flex-end;
                }

                .username-input-desktop {
                    display: flex;
                    align-items: center;
                    min-width: 200px;
                    position: relative;
                }

                .username-field {
                    flex: 1;
                    padding: 0.75rem;
                    padding-right: 2.5rem;
                    border: 1px solid var(--bs-border-color);
                    border-right: none;
                    border-radius: 8px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background: var(--bs-body-bg);
                    color: var(--bs-body-color);
                    font-size: 0.875rem;
                    height: 40px;
                    box-sizing: border-box;
                }

                .username-field:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .username-field:focus {
                    outline: none;
                }

                .username-field:enabled {
                    box-shadow: none;
                }

                .edit-name-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    padding: 0;
                    border-radius: 8px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    box-sizing: border-box;
                }



                .edit-name-btn:hover {
                    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                    transform: none;
                }

                .username-button-mobile {
                    display: none;
                    background: var(--bs-secondary);
                    border: none;
                    color: white;
                    padding: 0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    height: 40px;
                    width: 40px;
                }

                .message-input-wrapper {
                    flex: 1;
                    display: flex;
                    gap: 0.5rem;
                }

                .message-field {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--bs-border-color);
                    border-radius: 8px;
                    background: var(--bs-body-bg);
                    color: var(--bs-body-color);
                    font-size: 0.875rem;
                    resize: none;
                    height: 40px;
                    box-sizing: border-box;
                }

                .message-field:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .send-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 48px;
                    height: 40px;
                }



                .send-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }

                .send-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }



                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease-out;
                }

                .modal-overlay.hide {
                    animation: fadeOut 0.3s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }

                .modal-content {
                    background: var(--bs-body-bg);
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    animation: fadeIn 0.3s ease-out;
                }

                .modal-content.hide {
                    animation: slideOut 0.3s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                    }
                    to { 
                        opacity: 1; 
                    }
                }

                @keyframes slideOut {
                    from { 
                        opacity: 1; 
                        transform: translateY(0) scale(1);
                    }
                    to { 
                        opacity: 0; 
                        transform: translateY(-20px) scale(0.95);
                    }
                }

                .modal-content.large {
                    max-width: 700px;
                }

                .modal-content.modern {
                    max-width: 800px;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }

                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid var(--bs-border-color);
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    color: var(--bs-secondary);
                    transition: all 0.2s ease;
                }


                .modal-body {
                    padding: 1.5rem;
                    overflow-y: auto;
                    flex: 1;
                }

                .modal-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--bs-border-color);
                    display: flex;
                    justify-content: flex-end;
                }

                .rules-content {
                    color: white;
                }

                .rules-section {
                    color: #333;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0;
                    border-bottom: 2px solid var(--bs-border-color);
                }



                .rules-section.danger {
                    border-left-color: #dc3545;
                }

                .rules-section.warning {
                    border-left-color: #ffc107;
                }

                .rules-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .rules-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    margin-bottom: 0.75rem;
                    color: white;
                    background: none !important;
                    padding: 0.5rem 0;
                    border-radius: 0;
                    box-shadow: none !important;
                    border: none !important;
                }

                .rule-icon {
                    flex-shrink: 0;
                    margin-top: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .rule-icon svg {
                    width: 48px !important;
                    height: 48px !important;
                }

                /* Target specific React Icons */
                .rule-icon .bi-check,
                .rule-icon .bi-x,
                .rule-icon .bi-time,
                .rule-icon .bi-text {
                    width: 48px !important;
                    height: 48px !important;
                }

                .rule-icon.success {
                    color: #28a745;
                }

                .rule-icon.danger {
                    color: #dc3545;
                }

                .rule-icon.warning {
                    color: #ffc107;
                }



                /* Legacy styles for backward compatibility */
                .rules-section {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 1.5rem 0 0.2rem 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #212529;
                }

                .rules-section:first-child {
                    margin-top: 0;
                }

                .rules-section.danger {
                    color: #dc3545 !important;
                    border-bottom-color: #dc3545 !important;
                }

                .rules-section.warning {
                    color: #ffc107 !important;
                    border-bottom-color: #ffc107 !important;
                }

                .rules-section.info {
                    color: #0dcaf0 !important;
                    border-bottom-color: #0dcaf0 !important;
                }

                .rules-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .rules-list li {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: -0.50rem;
                    padding: 0.5rem 0;
                    background: transparent !important;
                    border-radius: 0;
                    border-left: none !important;
                    color: white;
                }



                .rules-list li span {
                    line-height: 1.5;
                    color: var(--bs-body-color);
                }

                @media (max-width: 768px) {
                    .chat-container {
                        height: calc(100vh - 80px);
                        border-radius: 0;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .messages-container {
                        flex: 1;
                        min-height: 0;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .messages-list {
                        flex: 1;
                        min-height: 0;
                        padding: 0.5rem;
                    }

                    .chat-header {
                        padding: 0.75rem 1rem;
                    }

                    .chat-title {
                        font-size: 1rem;
                    }

                    .username-input-desktop {
                        display: none;
                    }

                    .username-button-mobile {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .input-container {
                        padding: 0.75rem 1rem;
                    }

                    .input-wrapper {
                        gap: 0.5rem;
                    }

                    .modal-content {
                        margin: 0;
                        max-height: 100vh;
                        border-radius: 16px !important;
                    }

                    .modal-content.large {
                        border-radius: 16px !important;
                    }

                    .modal-header,
                    .modal-body,
                    .modal-footer {
                        padding: 1rem;
                    }

                    .btn-primary {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        border: none !important;
                    }

                    #saveUsernameBtn {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        border: none !important;
                    }

                    .username-button-mobile {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        border: none !important;
                        color: white !important;
                    }
                }

                /* Chat bubbles - Enhanced styling */
                :global(.chat-bubble) {
                    max-width: 80%;
                    padding: 1rem 1.25rem;
                    border-radius: 1.25rem;
                    color: #fff;
                    word-break: break-word;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    margin-bottom: 0.70rem;
                    position: relative;
                    transition: all 0.2s ease;
                    animation: message-slide-in 0.3s ease-out;
                }

                :global(.chat-bubble:hover) {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }

                :global(.chat-bubble.other) {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: rgba(102, 126, 234, 0.3);
                }

                :global(.chat-bubble.mine) {
                    background: linear-gradient(135deg, #1146df 0%, #434a60 100%);
                }

                /* Message time styling - Enhanced */
                :global(.chat-bubble .message-time) {
                    opacity: 0.85;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.75em;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                /* System message styling - Enhanced */
                :global(.chat-system-message) {
                    color: var(--bs-body-color);
                    font-style: normal;
                    padding: 0.2rem 0;
                    margin: 0.4rem 0;
                    text-align: center;
                    font-size: 0.85rem;
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                }

                /* Moderator styles - Enhanced */
                :global(.chat-bubble.moderator) {
                    background: linear-gradient(145deg,
                        #6d5000 0%,           /* Very dark gold - almost black */
                        #8b6900 25%,          /* Deep warm gold */
                        #b8860b 60%,          /* Goldenrod - warm but not yellow */
                        #7c5a00 100%          /* Dark gold shadow */
                    );
                    color: #f5f5f5;         /* Light gray text */
                    font-weight: 500;
                    border-radius: 1.3rem;
                    padding: 14px 18px;
                    position: relative;
                    max-width: 80%;
                    box-shadow:
                        0 6px 16px rgba(90, 60, 0, 0.3),
                        0 2px 6px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(80, 50, 0, 0.5);
                }

                /* Inner glow - subtle metallic shine */
                :global(.chat-bubble.moderator::before) {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 20%,
                        rgba(255, 255, 255, 0.1),
                        transparent 70%
                    );
                    z-index: -1;
                    border-radius: inherit;
                    opacity: 0.4;
                    pointer-events: none;
                }

                /* Outer glow - deep gold tone */
                :global(.chat-bubble.moderator::after) {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    right: -4px;
                    bottom: -4px;
                    background: linear-gradient(145deg,
                        rgba(120, 80, 0, 0.3),
                        rgba(100, 70, 0, 0.2),
                        rgba(120, 80, 0, 0.3)
                    );
                    z-index: -2;
                    border-radius: 1.5rem;
                    filter: blur(4px);
                    opacity: 0.8;
                }

                :global(.moderator-badge) {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 3px;
                    width: 18px;
                    height: 18px;
                    animation: badge-glow 2s ease-in-out infinite alternate;
                    margin-top: -4px;
                }

                :global(.moderator-badge svg) {
                    width: 18px;
                    height: 18px;
                    fill: #fff;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
                }

                @keyframes badge-glow {
                    from { 
                        filter: brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
                    }
                    to { 
                        filter: brightness(1.2) drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
                    }
                }

                :global(.chat-bubble.moderator .moderator-badge) {
                    /* Styles handled by general .moderator-badge */
                }

                /* Username styling in chat bubbles */
                :global(.chat-bubble strong) {
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.85);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                /* Client ID styling for moderators */
                :global(.chat-bubble .text-warning) {
                    color: #ffc107 !important;
                    font-family: 'Courier New', monospace;
                    font-size: 0.75em;
                    opacity: 0.8;
                }

                /* Smooth scrolling for messages */
                :global(.messages-list) {
                    scroll-behavior: smooth;
                }

                /* Loading animation for new messages */
                @keyframes message-slide-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}
