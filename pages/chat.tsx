import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getMainPageMetadata, generateChatStructuredData, generatePageFAQStructuredData } from '../utils/structuredData';
import { getChatConfig, getChatDisabledMessage } from '../utils/chatToggle';
import ChatDisabled from '../components/ChatDisabled';
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
    BiPencil,
    BiImage
} from 'react-icons/bi'

export default function ChatPage() {
    const metadata = getMainPageMetadata('chat');
    const chatStructuredData = generateChatStructuredData();
    const chatFAQData = generatePageFAQStructuredData('chat');
    const chatConfig = getChatConfig();
    const [showRules, setShowRules] = useState(false);
    const [isClosingRules, setIsClosingRules] = useState(false);
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [isClosingUsernameModal, setIsClosingUsernameModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [statusText, setStatusText] = useState('Connecting...');
    const [isModerator, setIsModerator] = useState(false);
    const [showStickers, setShowStickers] = useState(false);
    const [isBot, setIsBot] = useState(false);

    // Public sticker data with relative paths
    const [stickers] = useState([
        { id: 1, url: '/assets/stickers/excited.webp', alt: 'excited' },
        { id: 2, url: '/assets/stickers/wave.webp', alt: 'wave' },
        { id: 3, url: '/assets/stickers/shocked.webp', alt: 'shocked' },
        { id: 4, url: '/assets/stickers/shh.webp', alt: 'shh' },
        { id: 5, url: '/assets/stickers/thumbsdown.webp', alt: 'thumbsdown' },
        { id: 6, url: '/assets/stickers/agree.webp', alt: 'agree' },
        { id: 7, url: '/assets/stickers/heart1.webp', alt: 'heart1' },
        { id: 8, url: '/assets/stickers/clap.webp', alt: 'clap' },
        { id: 9, url: '/assets/stickers/thumbsup_glasses.webp', alt: 'thumbsup_glasses' },
        { id: 10, url: '/assets/stickers/ace.webp', alt: 'ace' },
        { id: 11, url: '/assets/stickers/yay.webp', alt: 'yay' },
        { id: 12, url: '/assets/stickers/wot.webp', alt: 'wot' },
        { id: 13, url: '/assets/stickers/tophat.webp', alt: 'tophat' },
        { id: 14, url: '/assets/stickers/sorry.webp', alt: 'sorry' },
        { id: 15, url: '/assets/stickers/frown.webp', alt: 'frown' },
        { id: 16, url: '/assets/stickers/hmmm.webp', alt: 'hmmm' },
        { id: 17, url: '/assets/stickers/hungry.webp', alt: 'hungry' },
        { id: 18, url: '/assets/stickers/backstab.webp', alt: 'backstab' },
    ]);

    // Moderator-only stickers that show up in popup for moderators
    const moderatorStickers = [
        { id: 19, url: '/assets/stickers/mh.webp', alt: 'mh' },
        { id: 20, url: '/assets/stickers/ifc.webp', alt: 'ifc' },
        { id: 21, url: '/assets/stickers/middlefinger.webp', alt: 'middlefinger' },
        { id: 22, url: '/assets/stickers/police1.webp', alt: 'police1' },
        { id: 23, url: '/assets/stickers/mh2.webp', alt: 'mh2' },
        { id: 24, url: '/assets/stickers/police2.webp', alt: 'police2' },
        { id: 25, url: '/assets/stickers/jable.webp', alt: 'jable' },
        { id: 26, url: '/assets/stickers/saibou.webp', alt: 'saibou' },
        { id: 27, url: '/assets/stickers/mh3.webp', alt: 'mh3' },
        { id: 28, url: '/assets/stickers/mh4.webp', alt: 'mh4' },
        { id: 29, url: '/assets/stickers/hahah.webp', alt: 'hahah' },
        { id: 30, url: '/assets/stickers/goodmorning.webp', alt: 'goodmorning' },
        { id: 31, url: '/assets/stickers/job.webp', alt: 'job' },
        { id: 32, url: '/assets/stickers/red.webp', alt: 'red' },
        { id: 33, url: '/assets/stickers/beer.webp', alt: 'beer' },
        { id: 34, url: '/assets/stickers/smoke.webp', alt: 'smoke' },
        { id: 35, url: '/assets/stickers/keepscrolling.webp', alt: 'keepscrolling' },
        // All a_ stickers are moderator only
        { id: 36, url: '/assets/stickers/a_clap.webp', alt: 'a_clap' },
        { id: 37, url: '/assets/stickers/a_laugh.webp', alt: 'a_laugh' },
        { id: 38, url: '/assets/stickers/a_pc.webp', alt: 'a_pc' },
        { id: 39, url: '/assets/stickers/a_hammer.webp', alt: 'a_hammer' },
        { id: 40, url: '/assets/stickers/a_hellnah.webp', alt: 'a_hellnah' },
        { id: 41, url: '/assets/stickers/a_juggle.webp', alt: 'a_juggle' },
        { id: 42, url: '/assets/stickers/a_wave.webp', alt: 'a_wave' },
        { id: 43, url: '/assets/stickers/a_angrywalk.webp', alt: 'a_angrywalk' },
        { id: 44, url: '/assets/stickers/a_ball.webp', alt: 'a_ball' },
        { id: 45, url: '/assets/stickers/a_boo.webp', alt: 'a_boo' },
        { id: 46, url: '/assets/stickers/a_faint.webp', alt: 'a_faint' },
        { id: 47, url: '/assets/stickers/a_gun.webp', alt: 'a_gun' },
        { id: 48, url: '/assets/stickers/a_keyboard.webp', alt: 'a_keyboard' },
        { id: 49, url: '/assets/stickers/a_pray.webp', alt: 'a_pray' },
        { id: 50, url: '/assets/stickers/a_reading.webp', alt: 'a_reading' },
        { id: 51, url: '/assets/stickers/a_sadbye.webp', alt: 'a_sadbye' },
        { id: 52, url: '/assets/stickers/a_ski.webp', alt: 'a_ski' },
        { id: 53, url: '/assets/stickers/a_sprint.webp', alt: 'a_sprint' },
        { id: 54, url: '/assets/stickers/a_taphead.webp', alt: 'a_taphead' }
    ];

    // Combined stickers array - only show moderator stickers to moderators
    const allStickers = isModerator ? [...stickers, ...moderatorStickers] : stickers;

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

    const handleOpenUsernameModal = () => {
        setShowUsernameModal(true);
    };

    const toggleStickers = () => {
        setShowStickers(!showStickers);
    };

    const handleStickerClick = (sticker: any) => {
        console.log('Sticker clicked:', sticker); // Debug log
        
        // Prevent any default behavior
        event?.preventDefault();
        event?.stopPropagation();
        
        // Validate sticker data
        if (!sticker || !sticker.alt) {
            console.error('Invalid sticker data:', sticker);
            return;
        }
        
        // Check if this is a moderator-only sticker (IDs 19-54) and user is not a moderator
        if (sticker.id >= 19 && sticker.id <= 54 && !isModerator) {
            console.log('Non-moderator attempted to use moderator-only sticker:', sticker.alt);
            // You can add a visual feedback here if needed (like a toast message)
            return;
        }
        
        // Send sticker as a message
        const messageInput = document.getElementById('messageInput') as HTMLInputElement;
        if (messageInput) {
            const stickerMessage = `[${sticker.alt}]`;
            console.log('Setting message input to:', stickerMessage); // Debug log
            
            // Clear any existing content first
            messageInput.value = '';
            
            // Set the sticker message
            messageInput.value = stickerMessage;
            
            // Trigger send button click with a small delay to ensure input is set
            setTimeout(() => {
                const sendButton = document.getElementById('sendButton');
                if (sendButton) {
                    console.log('Triggering send button click'); // Debug log
                    sendButton.click();
                }
            }, 10);
        }
        
        // Close stickers panel
        setShowStickers(false);
    };

    useEffect(() => {
        // Bot detection function
        const detectBot = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const botPatterns = [
                'googlebot',
                'bingbot',
                'slurp', // Yahoo
                'duckduckbot',
                'baiduspider',
                'yandexbot',
                'facebookexternalhit',
                'twitterbot',
                'rogerbot',
                'linkedinbot',
                'embedly',
                'quora link preview',
                'showyoubot',
                'outbrain',
                'pinterest',
                'developers.google.com/+/web/snippet',
                'slackbot',
                'vkshare',
                'w3c_validator',
                'redditbot',
                'applebot',
                'whatsapp',
                'flipboard',
                'tumblr',
                'bitlybot',
                'skypeuripreview',
                'nuzzel',
                'discordbot',
                'google page speed',
                'qwantbot'
            ];
            
            return botPatterns.some(pattern => userAgent.includes(pattern));
        };

        // Set bot detection result
        setIsBot(detectBot());

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

        // Add event listener for closing username modal from JavaScript
        const handleCloseUsernameModalEvent = () => {
            handleCloseUsernameModal();
        };

        // Handle clicking outside stickers panel
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (showStickers && !target.closest('.stickers-panel') && !target.closest('.stickers-button')) {
                setShowStickers(false);
            }
        };

        // Handle keyboard shortcuts
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && showStickers) {
                setShowStickers(false);
            }
        };

        document.addEventListener('showRulesModal', handleShowRulesModal as EventListener);
        document.addEventListener('moderatorStatusUpdate', handleModeratorStatus as EventListener);
        document.addEventListener('closeUsernameModal', handleCloseUsernameModalEvent);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

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
        } else if ((window as any).AblyLoaded) {
            loadChatScript();
        }

        function loadChatScript() {
            // Load chat script if not already loaded
            if (!(window as any).DSEChatLoaded) {
                const chatScript = document.createElement('script');
                // Add cache-busting to prevent old sticker logic from interfering
                chatScript.src = '/assets/js/chat.js?v=' + Date.now() + '&stickers=' + Date.now();
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
            document.removeEventListener('closeUsernameModal', handleCloseUsernameModalEvent);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            if ((window as any).dseChat) {
                (window as any).dseChat.destroy();
                (window as any).dseChat = null;
            }
        };
    }, []); // Remove showStickers dependency to prevent chat reconnection

    // Effect to populate mobile username input when modal opens
    useEffect(() => {
        if (showUsernameModal) {
            // Small delay to ensure modal is rendered
            const timer = setTimeout(() => {
                const mobileInput = document.getElementById('userNameInputMobile') as HTMLInputElement;
                const currentInput = document.getElementById('userNameInput') as HTMLInputElement;
                if (mobileInput && currentInput) {
                    mobileInput.value = currentInput.value;
                    mobileInput.focus(); // Focus the input for better UX
                }
            }, 50);
            
            return () => clearTimeout(timer);
        }
    }, [showUsernameModal]);

    // If chat is disabled, show disabled component
    if (!chatConfig.enabled) {
        return (
            <>
                <Head>
                    <title>Chat Disabled</title>
                    <meta name="description" content="Chat is currently disabled" />
                    <meta name="robots" content="noindex, nofollow" />
                </Head>

                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">其他</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item active" aria-current="page">
                                    聊天室 Chatroom (Disabled)
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/*end breadcrumb*/}

                <ChatDisabled 
                    message={getChatDisabledMessage()}
                />
            </>
        );
    }

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

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(chatStructuredData)
                    }}
                />
                {chatFAQData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(chatFAQData)
                        }}
                    />
                )}
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
            {isBot ? (
                // SEO Content for Search Engine Bots
                <div className="seo-chat-content">
                    <article className="chat-seo-article">
                        <header>
                            <h1>DSE Best Community Chat - 香港中學文憑試學習討論平台</h1>
                            <p className="lead">dse.best聊天室是香港最活躍的DSE學習交流社群，為DSE考生提供即時討論、學習支援和備考經驗分享的專業平台。</p>
                        </header>

                        <section className="chat-features">
                            <h2>DSE學習聊天室功能特色</h2>
                            <p>
                                我們的DSE學習聊天室專為香港中學文憑試考生設計，提供全面的學習交流環境。考生可以在這裡討論各科DSE備考策略，
                                包括中文科閱讀理解技巧、英文科寫作方法、數學科解題步驟、物理化學實驗重點、生物科概念整理等。
                                聊天室支援即時對話功能，讓DSE同學能夠快速獲得學習問題的解答和備考建議。
                            </p>
                            <p>
                                平台採用先進的實時通訊技術，確保DSE學習討論的流暢性和穩定性。無論是討論歷屆試題解法、分享溫習心得，
                                還是交流考試技巧，dse.best聊天室都能提供最佳的學習交流體驗。我們的社群涵蓋所有DSE科目，
                                包括核心科目（中文、英文、數學、公民與社會發展）和選修科目（物理、化學、生物、ICT、地理、歷史、經濟、BAFS等）。
                            </p>
                        </section>

                        <section className="study-community">
                            <h2>DSE備考學習社群</h2>
                            <p>
                                加入dse.best學習社群，與來自全港不同學校的DSE考生建立學習網絡。我們的聊天室促進知識分享和互助學習，
                                幫助同學在DSE備考路上互相支持。社群成員經常分享最新的DSE考試資訊、cut-off分數預測、JUPAS選科建議，
                                以及各科目的學習資源和備考策略。這種集體智慧的分享模式大大提升了DSE備考的效率和成功率。
                            </p>
                            <p>
                                我們重視學習討論的質量，設有完善的社群規則和管理制度。聊天室禁止發布無關內容、垃圾訊息或不當言論，
                                確保討論環境專注於DSE學習和備考。管理團隊定期監察討論內容，維護健康正面的學習氛圍，
                                讓每位DSE考生都能在安全友善的環境中專心學習和交流。
                            </p>
                        </section>

                        <section className="exam-preparation">
                            <h2>DSE考試準備與學習資源</h2>
                            <p>
                                dse.best聊天室不僅是討論平台，更是豐富學習資源的集中地。考生可以在聊天過程中分享和獲取各類DSE學習材料，
                                包括歷屆試題分析、模擬考試題目、溫習筆記、記憶口訣等。這些由社群成員貢獻的學習資源經過實戰驗證，
                                對DSE備考具有很高的參考價值。聊天室也定期舉辦線上學習活動，如溫習小組、答題競賽、經驗分享會等。
                            </p>
                            <p>
                                我們特別重視DSE各科目的平衡發展。聊天室設有不同的討論主題頻道，讓考生可以針對特定科目進行深入討論。
                                無論是中文科的文言文理解、英文科的聆聽技巧提升、數學科的運算速度訓練，還是選修科目的專業知識鞏固，
                                都有專門的討論空間和經驗豐富的同學提供協助。這種分科討論的模式有助於考生更有效地利用時間，
                                針對性地提升各科成績。
                            </p>
                        </section>

                        <section className="technology-features">
                            <h2>先進技術與用戶體驗</h2>
                            <p>
                                dse.best聊天室採用最新的網頁技術開發，提供流暢的用戶體驗和穩定的服務性能。平台支援多裝置使用，
                                包括桌面電腦、平板電腦和智能手機，讓DSE考生隨時隨地都能參與學習討論。我們的技術團隊持續優化系統性能，
                                確保聊天室在高峰使用時段仍能保持快速響應和穩定運行。
                            </p>
                            <p>
                                聊天室具備多項實用功能，如貼圖表情支援、訊息搜尋、用戶標識、即時通知等，增強了學習交流的趣味性和便利性。
                                我們也重視用戶隱私保護，採用安全的資料傳輸協議，確保所有討論內容的安全性。平台的響應式設計確保在不同螢幕尺寸下
                                都能提供最佳的瀏覽體驗，滿足現代DSE學生多元化的使用需求。
                            </p>
                        </section>

                        <section className="success-stories">
                            <h2>DSE成功案例與學習成果</h2>
                            <p>
                                多年來，dse.best聊天室已經幫助無數DSE考生提升學習成績和備考效率。許多成功考獲理想成績的同學都表示，
                                通過聊天室的學習交流獲得了寶貴的考試心得和應試技巧。他們在聊天室中建立的學習夥伴關係不僅幫助彼此度過
                                備考的艱難時期，更在DSE考試中發揮了關鍵作用。這些成功經驗不斷激勵著新一代的DSE考生加入我們的學習社群。
                            </p>
                            <p>
                                我們的聊天室社群已成為DSE備考生態系統中不可或缺的一部分。從日常學習疑問解答到考前心理調適，
                                從科目選擇建議到大學選科指導，聊天室提供全方位的學習支援服務。這種綜合性的教育支援模式
                                有效提升了DSE考生的整體競爭力，幫助他們在升學路上取得更好的成果。
                            </p>
                        </section>

                        <footer className="chat-conclusion">
                            <h2>加入DSE Best學習社群</h2>
                            <p>
                                立即加入dse.best聊天室，開始您的DSE學習交流之旅。我們相信，通過集體的智慧和互助精神，
                                每位DSE考生都能找到最適合自己的學習方法，在香港中學文憑試中取得理想成績。
                                讓我們一起在學習的道路上攜手前進，共同迎接DSE的挑戰！
                            </p>
                        </footer>
                    </article>
                </div>
            ) : (
                // Regular Chat Container for Human Users
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
                                className="username-button-mobile"
                                onClick={handleOpenUsernameModal}
                                title="Edit Username"
                            >
                                <BiPencil style={{ fontSize: '16px' }} />
                            </button>
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
                <div className="input-container" style={{ position: 'relative' }}>
                    <div className="input-wrapper">




                        {/* Hidden Username Input for JavaScript */}
                        <input
                            type="text"
                            id="userNameInput"
                            style={{ display: 'none' }}
                        />
                        <button
                            id="editNameBtn"
                            style={{ display: 'none' }}
                        />

                        {/* Message Input */}
                        <div className="message-input-wrapper" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%'
                        }}>
                            <button
                                className="stickers-button"
                                type="button"
                                aria-label="Open stickers"
                                onClick={toggleStickers}
                                style={{
                                    background: showStickers ? 'var(--bs-primary-bg-subtle)' : 'transparent',
                                    border: showStickers ? '1px solid var(--bs-primary-border-subtle)' : '1px solid transparent',
                                    padding: '6px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    color: showStickers ? 'var(--bs-primary)' : 'var(--bs-body-color)',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    flexShrink: 0
                                }}
                            >
                                <BiSmile size={16} />
                            </button>
                            <input
                                type="text"
                                id="messageInput"
                                className="message-field"
                                placeholder="Type a message..."
                                autoComplete="off"
                                maxLength={150}
                                style={{ 
                                    fontSize: '16px',
                                    flex: 1,
                                    minWidth: 0
                                }}
                            />
                            <button
                                className="send-button"
                                id="sendButton"
                                type="button"
                                aria-label="Send message"
                                style={{
                                    flexShrink: 0
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5" />
                                    <path d="m5 12 7-7 7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Stickers Panel - Desktop (unchanged) */}
                        {showStickers && window.innerWidth > 768 && (
                            <div className="stickers-panel" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'var(--bs-body-bg)',
                                border: '1px solid var(--bs-border-color)',
                                borderRadius: '16px',
                                padding: '16px',
                                marginBottom: '12px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                                zIndex: 1000,
                                width: 'min(320px, 90vw)',
                                maxWidth: '320px',
                                maxHeight: 'min(400px, 80vh)',
                                overflowY: 'auto'
                            }}>
                                <div className="stickers-header" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                    paddingBottom: '8px',
                                    borderBottom: '1px solid var(--bs-border-color)'
                                }}>
                                    <h6 style={{ 
                                        margin: 0, 
                                        color: 'var(--bs-body-color)', 
                                        fontSize: '14px', 
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        Stickers
                                    </h6>
                                    <button
                                        onClick={toggleStickers}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: '6px',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            color: 'var(--bs-body-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--bs-secondary-bg)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                        aria-label="Close stickers"
                                    >
                                        <BiX size={18} />
                                    </button>
                                </div>
                                <div className="stickers-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '8px',
                                    padding: '12px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    {allStickers.map((sticker) => (
                                        <button
                                            key={sticker.id}
                                            onClick={() => handleStickerClick(sticker)}
                                            className={`sticker-item ${sticker.id >= 19 && sticker.id <= 54 ? 'moderator-sticker' : ''}`}
                                            style={{
                                                background: 'var(--bs-body-bg)',
                                                borderRadius: '12px',
                                                padding: '6px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 'min(72px, 15vw)',
                                                height: 'min(72px, 15vw)',
                                                maxWidth: '72px',
                                                maxHeight: '72px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                border: '2px solid var(--bs-border-color)',
                                                ...(sticker.id >= 19 && sticker.id <= 54 && {
                                                    borderColor: '#625c37 !important',
                                                })
                                            }}
                                            aria-label={`Send ${sticker.alt} sticker`}
                                            title={sticker.id >= 19 && sticker.id <= 54 && !isModerator ? `${sticker.alt} sticker (Moderator only)` : `Send ${sticker.alt} sticker`}
                                        >
                                            <img
                                                src={sticker.url}
                                                alt={sticker.alt}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    display: 'block'
                                                }}
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const fallback = document.createElement('div');
                                                    fallback.style.cssText = `
                                                        width: 100%;
                                                        height: 100%;
                                                        background: var(--bs-secondary-bg);
                                                        border: 1px solid var(--bs-border-color);
                                                        border-radius: 8px;
                                                        display: flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        font-size: 28px;
                                                        color: var(--bs-secondary-color);
                                                    `;
                                                    fallback.textContent = '😊';
                                                    target.parentNode?.appendChild(fallback);
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}

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
                                    style={{ fontSize: '16px' }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            const saveBtn = document.getElementById('saveUsernameBtn');
                                            if (saveBtn) {
                                                saveBtn.click();
                                            }
                                        }
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    id="saveUsernameBtn"
                                    type="button"
                                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                                    onClick={() => {
                                        const mobileInput = document.getElementById('userNameInputMobile') as HTMLInputElement;
                                        if (mobileInput) {
                                            const newUsername = mobileInput.value.trim();
                                            if (newUsername) {
                                                localStorage.setItem('chatUsername', newUsername);
                                                // Add system message if chat is available
                                                if ((window as any).dseChat && (window as any).dseChat.addSystemMessage) {
                                                    (window as any).dseChat.addSystemMessage(`Username changed to ${newUsername}`);
                                                }
                                                handleCloseUsernameModal();
                                            }
                                        }
                                    }}
                                >
                                    <BiCheck style={{ fontSize: '28px', marginBottom: '0.1rem', marginRight: '0.1rem' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Stickers Modal Overlay */}
            {showStickers && window.innerWidth <= 768 && (
                <div className="modal-overlay" onClick={toggleStickers}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <BiSmile className="me-2" />
                                Stickers
                            </h3>
                            <button
                                className="modal-close"
                                onClick={toggleStickers}
                            >
                                <BiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="stickers-grid-mobile" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '8px',
                                padding: '16px',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {allStickers.map((sticker) => (
                                    <button
                                        key={sticker.id}
                                        onClick={() => handleStickerClick(sticker)}
                                        className={`sticker-item-mobile ${sticker.id >= 19 && sticker.id <= 54 ? 'moderator-sticker' : ''}`}
                                        style={{
                                            background: 'var(--bs-body-bg)',
                                            borderRadius: '12px',
                                            padding: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '80px',
                                            height: '80px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '2px solid var(--bs-border-color)',
                                            ...(sticker.id >= 19 && sticker.id <= 54 && {
                                                borderColor: '#625c37 !important',
                                                boxShadow: '0 0 8px #625c3733'
                                            })
                                        }}
                                        aria-label={`Send ${sticker.alt} sticker`}
                                        title={sticker.id >= 19 && sticker.id <= 54 && !isModerator ? `${sticker.alt} sticker (Moderator only)` : `Send ${sticker.alt} sticker`}
                                    >
                                        <img
                                            src={sticker.url}
                                            alt={sticker.alt}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                display: 'block'
                                            }}
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const fallback = document.createElement('div');
                                                fallback.style.cssText = `
                                                    width: 100%;
                                                    height: 100%;
                                                    background: var(--bs-secondary-bg);
                                                    border: 1px solid var(--bs-border-color);
                                                    border-radius: 8px;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    font-size: 28px;
                                                    color: var(--bs-secondary-color);
                                                `;
                                                fallback.textContent = '😊';
                                                target.parentNode?.appendChild(fallback);
                                            }}
                                        />
                                    </button>
                                ))}
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
                /* SEO Content Styles for Search Engine Bots */
                .seo-chat-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                    background: var(--bs-body-bg);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .chat-seo-article {
                    line-height: 1.7;
                    color: var(--bs-body-color);
                }

                .chat-seo-article h1 {
                    font-size: 2.5rem;
                    color: var(--bs-primary);
                    margin-bottom: 1rem;
                    font-weight: 700;
                }

                .chat-seo-article h2 {
                    font-size: 1.8rem;
                    color: var(--bs-primary);
                    margin: 2rem 0 1rem 0;
                    font-weight: 600;
                }

                .chat-seo-article .lead {
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: var(--bs-secondary);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .chat-seo-article p {
                    margin-bottom: 1.5rem;
                    text-align: justify;
                }

                .chat-seo-article section {
                    margin-bottom: 3rem;
                }

                .chat-conclusion {
                    background: var(--bs-primary-bg-subtle);
                    padding: 2rem;
                    border-radius: 8px;
                    border-left: 4px solid var(--bs-primary);
                }

                @media (max-width: 768px) {
                    .seo-chat-content {
                        padding: 1rem;
                        margin: 0.5rem;
                    }
                    
                    .chat-seo-article h1 {
                        font-size: 2rem;
                    }
                    
                    .chat-seo-article h2 {
                        font-size: 1.5rem;
                    }
                }

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
                    max-width: 1200px;
                    margin: 0 auto;
                    background: var(--bs-body-bg);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid var(--bs-border-color);
                    color: rgba(255, 255, 255, 0.9);
                    height: calc(100vh - 120px);
                    min-height: 500px;
                }

                /* Remove extra space below chat widget */
                .main-content {
                    padding-bottom: 0 !important;
                    min-height: auto !important;
                }

                /* Ensure page doesn't have extra margins */
                body {
                    margin-bottom: 0 !important;
                }

                /* Mobile viewport height fix */
                @media (max-width: 768px) {
                    .main-content {
                        min-height: auto !important;
                        height: auto !important;
                    }
                }

                /* Hide footer on chat page */
                .footer {
                    display: none !important;
                }

                /* Hide back to top button on chat page */
                .back-to-top-btn-modern {
                    display: none !important;
                }

                /* Ensure main wrapper doesn't add extra space */
                .main-wrapper {
                    min-height: auto !important;
                    height: auto !important;
                    display: block !important;
                }

                /* Force page to only show chat widget */
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    height: auto !important;
                    min-height: auto !important;
                }

                html {
                    height: auto !important;
                    min-height: auto !important;
                }

                #__next {
                    height: auto !important;
                    min-height: auto !important;
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
                }

                .input-container {
                    background: var(--bs-body-bg);
                    border-top: 1px solid var(--bs-border-color);
                    padding: 1rem 1.5rem;
                }

                .input-wrapper {
                    display: flex;
                    gap: 0.5rem;
                    align-items: flex-end;
                    min-height: 44px;
                    justify-content: center;
                }

                .message-input-wrapper {
                    flex: 0 1 auto;
                    max-width: 600px;
                    width: 100%;
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
                    height: 44px;
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
                    width: 44px;
                    height: 44px;
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
                    touch-action: manipulation;
                }

                .username-button-mobile:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .message-input-wrapper {
                    flex: 0 1 auto;
                    display: flex;
                    gap: 0.5rem;
                    max-width: 600px;
                    width: 100%;
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
                    height: 44px;
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
                    height: 44px;
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
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        height: calc(100vh - 100px);
                        min-height: 200px;
                        border-radius: 0;
                        position: fixed;
                        top: 50px;
                        left: 0;
                        right: 0;
                        bottom: 50px;
                        z-index: 1;
                    }

                    /* Hide desktop username section on mobile */
                    .username-input-desktop {
                        display: none !important;
                    }

                    /* Hide desktop username section on all devices */
                    .username-input-desktop {
                        display: none !important;
                    }

                    /* Hide breadcrumb on mobile to save space */
                    .page-breadcrumb {
                        display: none !important;
                    }

                    /* Hide footer on mobile to save space */
                    .page-footer {
                        display: none !important;
                    }

                    /* Ensure main content doesn't add extra space */
                    .main-content {
                        padding: 0 !important;
                        margin: 0 !important;
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
                        padding: 0 0.25rem;
                    }

                    .message-input-wrapper {
                        gap: 0.5rem;
                        min-width: 0;
                    }

                    .message-field {
                        min-width: 0;
                        flex: 1;
                    }

                    .send-button {
                        min-width: 44px;
                        width: 44px;
                        height: 44px;
                        padding: 0;
                        flex-shrink: 0;
                    }

                    .modal-content {
                        margin: 0;
                        max-height: 90vh;
                        border-radius: 16px !important;
                        display: flex;
                        flex-direction: column;
                    }

                    .modal-content.large {
                        border-radius: 16px !important;
                        max-height: 90vh;
                    }

                    .modal-header {
                        flex-shrink: 0;
                        border-radius: 16px 16px 0 0 !important;
                    }

                    .modal-body {
                        flex: 1;
                        overflow-y: auto;
                        max-height: calc(90vh - 140px);
                    }

                    .modal-footer {
                        flex-shrink: 0;
                        border-radius: 0 0 16px 16px !important;
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
                        background: rgba(255, 255, 255, 0.2) !important;
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
                    vertical-align: middle;
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
