import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PageSEO from '../components/PageSEO';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { getChatConfig, getChatDisabledMessage } from '../utils/chatToggle';
import ChatDisabled from '../components/ChatDisabled';

// Chat is a pure client-side WebSocket app — no SSR, no hydration concern.
const ChatRoom = dynamic(
  () => import('../components/chat/ChatRoom').then((m) => m.ChatRoom),
  { ssr: false },
);

const BOT_PATTERNS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
  'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot', 'embedly',
  'quora link preview', 'showyoubot', 'outbrain', 'pinterest', 'slackbot',
  'vkshare', 'w3c_validator', 'redditbot', 'applebot', 'whatsapp', 'flipboard',
  'tumblr', 'bitlybot', 'skypeuripreview', 'nuzzel', 'discordbot', 'qwantbot',
];

export default function ChatPage() {
  const chatConfig = getChatConfig();
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsBot(BOT_PATTERNS.some((p) => ua.includes(p)));
  }, []);

  if (!chatConfig.enabled) {
    return (
      <>
        <PageSEO
          title="dse.best Chatroom"
          description="dse.best 聊天室暫時停用。"
          ogUrl="https://dse.best/chat"
          robots={['noindex', 'nofollow']}
        />
        <PageBreadcrumb section="其他" text="聊天室 Chatroom (Disabled)" />
        <ChatDisabled message={getChatDisabledMessage()} />
      </>
    );
  }

  return (
    <>
      <PageSEO
        title="dse.best Chatroom"
        description="加入dse.best學習社群聊天室，與其他同學即時討論DSE備考心得、學習技巧和考試經驗。支援實時對話、貼圖互動，打造友善的學習交流環境。"
        ogTitle="dse.best Chatroom"
        ogDescription="加入dse.best學習社群聊天室，與其他同學即時討論DSE備考心得、學習技巧和考試經驗。支援實時對話、貼圖互動，打造友善的學習交流環境。"
        ogUrl="https://dse.best/chat"
        robots={['noindex', 'nofollow']}
        pageKey="chat"
      />
      <PageBreadcrumb section="其他" text="聊天室 Chatroom" />

      {isBot ? (
        <article className="mx-auto max-w-[1200px] p-8 leading-relaxed"
          style={{ color: 'var(--color-body)' }}>
          <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>
            DSE Best Community Chat — 香港中學文憑試學習討論平台
          </h1>
          <p className="mb-6 text-lg">
            dse.best聊天室是香港最活躍的DSE學習交流社群，為DSE考生提供即時討論、學習支援和備考經驗分享的專業平台。
          </p>
          <h2 className="mb-2 mt-8 text-xl font-semibold">DSE學習聊天室功能特色</h2>
          <p className="mb-4">
            我們的DSE學習聊天室專為香港中學文憑試考生設計，提供全面的學習交流環境。考生可以在這裡討論各科DSE備考策略，
            交流考試技巧。聊天室支援即時對話功能，讓DSE同學能夠快速獲得學習問題的解答和備考建議。
          </p>
          <h2 className="mb-2 mt-8 text-xl font-semibold">DSE備考學習社群</h2>
          <p className="mb-4">
            加入dse.best學習社群，與來自全港不同學校的DSE考生建立學習網絡。我們的聊天室促進知識分享和互助學習，
            幫助同學在DSE備考路上互相支持。
          </p>
        </article>
      ) : (
        <div className="px-0 py-2 sm:px-4">
          <ChatRoom />
        </div>
      )}

      <style jsx global>{`
        /* Chat page only — hide site chrome that competes with the chat box. */
        .footer { display: none !important; }
        .back-to-top-btn-modern { display: none !important; }
        .main-content { padding-bottom: 0 !important; min-height: auto !important; }

        /* Original iconic chat bubbles — preserved. */
        @keyframes message-slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-bubble {
          max-width: 80%;
          width: fit-content;
          padding: 1rem 1.25rem;
          border-radius: 1.25rem;
          color: #fff;
          word-break: break-word;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          position: relative;
          transition: all 0.2s ease;
          animation: message-slide-in 0.3s ease-out;
        }
        .chat-bubble.mine {
          background: linear-gradient(135deg, #1146df 0%, #434a60 100%);
        }
        .chat-bubble.other {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .chat-bubble.moderator {
          background: linear-gradient(145deg, #6d5000 0%, #8b6900 25%, #b8860b 60%, #7c5a00 100%);
          color: #f5f5f5;
          font-weight: 500;
          border: 1px solid rgba(80, 50, 0, 0.5);
          box-shadow: 0 4px 12px rgba(90, 60, 0, 0.3);
        }
        .chat-bubble.moderator::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.12) 0%, transparent 70%);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }
        .chat-bubble.moderator::after {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(145deg, rgba(255, 215, 0, 0.2), transparent 40%, rgba(255, 215, 0, 0.1));
          border-radius: inherit;
          z-index: -1;
          filter: blur(4px);
          pointer-events: none;
        }
        /* Mobile — scale bubbles down, allow a touch more width. */
        @media (max-width: 768px) {
          .chat-bubble {
            max-width: 90%;
            padding: 0.6rem 0.85rem;
            border-radius: 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
