/**
 * ChatRoom — top-level chat UI. Wires useChatRoom to all presentational
 * components: header, message list, input, modals, moderator stats panel.
 */
import { useCallback, useEffect, useState } from 'react';
import { LuBook, LuPencil, LuShield, LuUsers } from 'react-icons/lu';
import { useChatRoom } from '../../hooks/useChatRoom';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ModStatsPanel } from './ModStatsPanel';
import { RulesModal, UsernameModal } from './ChatModals';
import { randomUsername } from '../../lib/chat/validation';
import type { ChatMessage } from '../../lib/chat/protocol';

export function ChatRoom() {
  const [username, setUsername] = useState('');
  const [clientId, setClientId] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);

  // Resolve persisted identity once on mount.
  useEffect(() => {
    let name = localStorage.getItem('chatUsername');
    if (!name) { name = randomUsername(); localStorage.setItem('chatUsername', name); }
    setUsername(name);
    setClientId(localStorage.getItem('chatClientId') || '');
  }, []);

  const chat = useChatRoom(username || 'Guest');

  // chatClientId is created lazily by the hook — pick it up after connect.
  useEffect(() => {
    if (!clientId) setClientId(localStorage.getItem('chatClientId') || '');
  }, [chat.status, clientId]);

  // Transient error toast.
  useEffect(() => {
    if (!chat.lastError) return;
    const t = setTimeout(chat.clearError, 4000);
    return () => clearTimeout(t);
  }, [chat.lastError, chat.clearError]);

  const saveUsername = useCallback((name: string) => {
    localStorage.setItem('chatUsername', name);
    setUsername(name);
    chat.rename(name);
  }, [chat]);

  const statusLabel = chat.status === 'connected' ? 'Connected'
    : chat.status === 'connecting' ? 'Connecting…' : 'Disconnected';
  const statusDot = chat.status === 'connected' ? '🟢'
    : chat.status === 'connecting' ? '🟡' : '🔴';

  return (
    <div
      className="mx-auto flex flex-col overflow-hidden rounded-2xl"
      style={{
        maxWidth: 1900,
        height: 'calc(100vh - 220px)',
        minHeight: 500,
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      {/* header */}
      <div
        className="flex items-center justify-between px-3 py-2 text-white sm:px-6"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="flex flex-wrap items-center gap-x-2 text-[13px]">
          <span className="flex items-center gap-2">
            <span>{statusDot}</span>
            <span>{statusLabel}</span>
          </span>
          <span className="flex w-full items-center gap-1.5 sm:w-auto">
            <span className="hidden opacity-50 sm:inline">|</span>
            <strong>{chat.online}</strong>
            <span>{chat.online === 1 ? 'User' : 'Users'} Online</span>
            {chat.lockdown && <span className="ml-1">🔒 Lockdown</span>}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {chat.isModerator && (
            <button
              type="button"
              title="Live sessions"
              onClick={() => setShowStats(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30"
            >
              <LuUsers size={16} />
            </button>
          )}
          {chat.isModerator && (
            <div title="Moderator" className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: '#68c07c' }}>
              <LuShield size={16} />
            </div>
          )}
          <button
            type="button"
            title="Edit username"
            onClick={() => setShowUsername(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30"
          >
            <LuPencil size={15} />
          </button>
          <button
            type="button"
            title="Chat rules"
            onClick={() => setShowRules(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30"
          >
            <LuBook size={16} />
          </button>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
        <MessageList
          items={chat.items}
          myClientId={clientId}
          viewerIsMod={chat.isModerator}
          typingUsers={chat.typingUsers}
          onReply={setReplyTarget}
          onDelete={chat.deleteMessage}
        />
      </div>

      {/* error toast */}
      {chat.lastError && (
        <div className="px-4">
          <div
            className="mx-auto mb-1 max-w-[640px] rounded-lg px-3 py-1.5 text-[12px]"
            style={{ background: 'rgba(220,53,69,0.12)', color: '#dc3545' }}
          >
            {chat.lastError}
          </div>
        </div>
      )}

      {/* input */}
      <ChatInput
        isModerator={chat.isModerator}
        lockdown={chat.lockdown}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        onSend={chat.sendChat}
        onTyping={chat.sendTyping}
      />

      {/* overlays */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      {showUsername && (
        <UsernameModal current={username} onSave={saveUsername} onClose={() => setShowUsername(false)} />
      )}
      <ModStatsPanel
        open={showStats}
        sessions={chat.stats}
        online={chat.online}
        onRefresh={chat.requestStats}
        onClose={() => setShowStats(false)}
      />
    </div>
  );
}
