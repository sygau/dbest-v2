/**
 * MessageList — scrollable message area with auto-scroll + typing indicator.
 */
import { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { isSystem, type DisplayItem } from '../../hooks/useChatRoom';
import type { ChatMessage } from '../../lib/chat/protocol';

interface Props {
  items: DisplayItem[];
  myClientId: string;
  viewerIsMod: boolean;
  typingUsers: string[];
  onReply: (msg: ChatMessage) => void;
  onDelete: (id: string) => void;
}

export function MessageList({ items, myClientId, viewerIsMod, typingUsers, onReply, onDelete }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll only when the user is already near the bottom.
  useEffect(() => {
    if (atBottomRef.current) endRef.current?.scrollIntoView({ block: 'end' });
  }, [items, typingUsers]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="h-full overflow-y-auto overflow-x-hidden px-2 py-3 sm:px-4"
      style={{ scrollBehavior: 'smooth' }}
    >
      {items.map((item) =>
        isSystem(item) ? (
          <div key={item.id} className="my-2 text-center text-[12px] italic"
            style={{ color: 'var(--color-muted)' }}>
            {item.text}
          </div>
        ) : (
          <MessageItem
            key={item.id}
            msg={item}
            isMine={item.clientId === myClientId}
            viewerIsMod={viewerIsMod}
            onReply={onReply}
            onDelete={onDelete}
          />
        ),
      )}

      {typingUsers.length > 0 && (
        <div className="my-1 px-1 text-[12px] italic" style={{ color: 'var(--color-muted)' }}>
          {typingUsers.length === 1
            ? `${typingUsers[0]} is typing…`
            : `${typingUsers.slice(0, 3).join(', ')} are typing…`}
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
