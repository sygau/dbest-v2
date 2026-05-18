/**
 * MessageItem — one chat message bubble (original .chat-bubble styling).
 * WhatsApp-style reply quote, sticker / link / image rendering, a three-dot
 * (or right-click) action menu, and an exterior reply shortcut on peer
 * messages. Delete is moderator-only.
 */
import { useState } from 'react';
import { LuEllipsisVertical, LuReply, LuTrash2, LuInfo, LuBadgeCheck } from 'react-icons/lu';
import { DropdownMenu, type DropdownItem } from '../ui/DropdownMenu';
import { CHAT_CONFIG } from '../../lib/chat/config';
import { getSticker } from '../../lib/chat/stickers';
import type { ChatMessage } from '../../lib/chat/protocol';

interface Props {
  msg: ChatMessage;
  isMine: boolean;
  viewerIsMod: boolean;
  onReply: (msg: ChatMessage) => void;
  onDelete: (id: string) => void;
}

function timeOf(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function MessageItem({ msg, isMine, viewerIsMod, onReply, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const variant = msg.isModerator ? 'moderator' : isMine ? 'mine' : 'other';

  const items: DropdownItem[] = [
    { label: 'Reply', icon: <LuReply size={14} />, onClick: () => { onReply(msg); setMenuOpen(false); } },
  ];
  if (viewerIsMod) {
    items.push({ label: showInfo ? 'Hide info' : 'Message info', icon: <LuInfo size={14} />, onClick: () => { setShowInfo((v) => !v); setMenuOpen(false); } });
    items.push({ separator: true });
    items.push({ label: 'Delete', icon: <LuTrash2 size={14} />, variant: 'destructive', onClick: () => { onDelete(msg.id); setMenuOpen(false); } });
  }

  return (
    <div
      className={`group flex flex-col ${isMine ? 'items-end' : 'items-start'} mb-[0.7rem]`}
      onContextMenu={(e) => { e.preventDefault(); setMenuOpen(true); }}
    >
      <div className={`chat-bubble ${variant} text-sm`}>
        {/* header: name + verified badge + time + menu */}
        <div className="mb-1 flex items-center gap-1.5">
          <strong className="text-[14px] font-bold">{msg.sender}</strong>
          {msg.isModerator && (
            <LuBadgeCheck size={18} title="moderator" style={{ color: '#ffffff', transform: 'translateY(0.2px)' }} />
          )}
          <span className="ml-1 text-[11px] font-medium opacity-80">{timeOf(msg.ts)}</span>

          <div className="relative ml-auto">
            <button
              type="button"
              aria-label="Message actions"
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-1 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-70 hover:!opacity-100"
              style={{ color: 'inherit' }}
            >
              <LuEllipsisVertical size={14} />
            </button>
            <DropdownMenu open={menuOpen} items={items} align={isMine ? 'right' : 'left'} className="!min-w-0 w-40" />
          </div>
        </div>

        {/* reply quote */}
        {msg.replyTo && (
          <div
            className="mb-1 border-l-3 px-2 py-1 text-[12px] -mx-1"
            style={{ borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.14)' }}
          >
            <span className="font-semibold opacity-90">{msg.replyTo.sender}</span>
            <div className="truncate opacity-85">{msg.replyTo.text}</div>
          </div>
        )}

        {/* body */}
        <MessageBody msg={msg} />

        {/* moderator-only message info */}
        {showInfo && viewerIsMod && msg.geo && (
          <div className="mt-2 rounded-md px-2 py-1 text-[10px] leading-relaxed"
            style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div>IP: {msg.geo.ip}</div>
            <div>Country: {msg.geo.country}</div>
            <div>ASN: {msg.geo.asn ?? '—'} {msg.geo.asOrg ? `(${msg.geo.asOrg})` : ''}</div>
          </div>
        )}

        {/* exterior reply shortcut — peer messages only, always visible */}
        {!isMine && (
          <button
            type="button"
            aria-label="Reply"
            onClick={() => onReply(msg)}
            className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full shadow-md"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-body)' }}
          >
            <LuReply size={12} />
          </button>
        )}
      </div>

      {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}

function MessageBody({ msg }: { msg: ChatMessage }) {
  if (msg.kind === 'sticker') {
    const name = msg.text.replace(/^\[|\]$/g, '');
    const sticker = getSticker(name);
    if (!sticker) return <span>{msg.text}</span>;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={sticker.url} alt={name} width={100} height={100}
        className="block rounded-lg object-contain" loading="lazy" />
    );
  }

  if (msg.kind === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={msg.text}
        alt="shared"
        loading="lazy"
        className="block rounded-lg object-contain"
        style={{ maxWidth: CHAT_CONFIG.IMAGE_MAX_DISPLAY_PX, maxHeight: CHAT_CONFIG.IMAGE_MAX_DISPLAY_PX }}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (msg.kind === 'link') {
    return (
      <a href={msg.text} target="_blank" rel="noopener noreferrer"
        className="break-all underline" style={{ color: 'inherit' }}>
        🔗 {msg.text.replace(/^https?:\/\//, '')}
      </a>
    );
  }

  return <span className="whitespace-pre-wrap break-words">{msg.text}</span>;
}
