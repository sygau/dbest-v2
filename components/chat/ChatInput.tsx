/**
 * ChatInput — message field, send button, sticker picker,
 * and the WhatsApp-style reply-compose bar.
 */
import { useEffect, useRef, useState } from 'react';
import { LuSmile, LuX, LuArrowUp } from 'react-icons/lu';
import { StickerPicker } from './StickerPicker';
import { CHAT_CONFIG } from '../../lib/chat/config';
import type { Sticker } from '../../lib/chat/stickers';
import type { ChatMessage, ReplyRef } from '../../lib/chat/protocol';

interface Props {
  isModerator: boolean;
  lockdown: boolean;
  replyTarget: ChatMessage | null;
  onCancelReply: () => void;
  onSend: (text: string, replyTo?: ReplyRef) => boolean;
  onTyping: () => void;
}

export function ChatInput({ isModerator, lockdown, replyTarget, onCancelReply, onSend, onTyping }: Props) {
  const [text, setText] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop popover: close the sticker panel on any outside click.
  useEffect(() => {
    if (!showStickers || isMobile) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-sticker-zone]')) setShowStickers(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showStickers, isMobile]);

  const disabled = lockdown && !isModerator;

  const buildReplyRef = (): ReplyRef | undefined => {
    if (!replyTarget) return undefined;
    return {
      id: replyTarget.id,
      sender: replyTarget.sender,
      text: replyTarget.text.slice(0, CHAT_CONFIG.REPLY_QUOTE_MAX),
    };
  };

  const submit = () => {
    if (!text.trim() || disabled) return;
    if (onSend(text, buildReplyRef())) {
      setText('');
      onCancelReply();
    }
  };

  const pickSticker = (s: Sticker) => {
    // Carry the active reply target so a sticker can quote a message too.
    if (onSend(`[${s.name}]`, buildReplyRef())) onCancelReply();
    setShowStickers(false);
  };

  return (
    <div
      className="relative border-t px-2 py-3 sm:px-4"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
    >
      {/* reply compose bar */}
      {replyTarget && (
        <div
          className="mb-2 flex items-center gap-2 rounded-lg border-l-[3px] px-3 py-1.5 text-[12px]"
          style={{ borderColor: '#7c5cff', background: 'var(--color-card-inner-bg)' }}
        >
          <div className="min-w-0 flex-1">
            <span className="font-semibold" style={{ color: '#7c5cff' }}>
              Replying to {replyTarget.sender}
            </span>
            <div className="truncate" style={{ color: 'var(--color-muted)' }}>
              {replyTarget.kind === 'text' ? replyTarget.text : `[${replyTarget.kind}]`}
            </div>
          </div>
          <button type="button" onClick={onCancelReply} aria-label="Cancel reply">
            <LuX size={16} />
          </button>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[640px] items-center gap-2">
        {/* sticker button */}
        <button
          type="button"
          aria-label="Open stickers"
          data-sticker-zone
          onClick={() => setShowStickers((v) => !v)}
          className="r5-btn-press flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            color: showStickers ? '#7c5cff' : 'var(--color-muted)',
            background: showStickers ? 'rgba(124,92,255,0.12)' : 'transparent',
          }}
        >
          <LuSmile size={18} />
        </button>

        {/* message field */}
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            type="text"
            value={text}
            disabled={disabled}
            {...(!isModerator ? { maxLength: CHAT_CONFIG.MAX_MESSAGE_LENGTH } : {})}
            placeholder={disabled ? 'Chat is in lockdown' : 'Type a message…'}
            onChange={(e) => { setText(e.target.value); onTyping(); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            className="h-11 w-full rounded-lg border px-3 text-[16px] outline-none disabled:opacity-50"
            style={{
              background: 'var(--color-input-bg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-body)',
            }}
          />
        </div>

        {/* send */}
        <button
          type="button"
          aria-label="Send message"
          onClick={submit}
          disabled={disabled || !text.trim()}
          className="r5-btn-press flex h-11 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <LuArrowUp size={18} />
        </button>
      </div>

      {showStickers && (
        <StickerPicker
          isModerator={isModerator}
          variant={isMobile ? 'modal' : 'popover'}
          onPick={pickSticker}
          onClose={() => setShowStickers(false)}
        />
      )}
    </div>
  );
}
