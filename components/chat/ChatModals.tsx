/**
 * RulesModal + UsernameModal for the chatroom.
 * Bootstrap modal markup ported to Tailwind, same structure and sizing.
 */
import { useState } from 'react';
import { LuX, LuShield, LuBan, LuClock, LuCheck } from 'react-icons/lu';
import { CHAT_CONFIG } from '../../lib/chat/config';
import { checkUsername } from '../../lib/chat/validation';

function Shell({ title, onClose, children, wide }: {
  title: string; onClose: () => void; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className={`flex max-h-[90vh] w-full flex-col rounded-2xl ${wide ? 'max-w-[700px]' : 'max-w-[500px]'}`}
        style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-2.5"
          style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-heading)' }}>
            {title}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close"><LuX size={18} /></button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export function UsernameModal({ current, onSave, onClose }: {
  current: string; onSave: (name: string) => void; onClose: () => void;
}) {
  const [value, setValue] = useState(current);
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const check = checkUsername(value);
    if (!check.ok) { setError(check.reason!); return; }
    onSave(check.text!);
    onClose();
  };

  return (
    <Shell title="Change Username" onClose={onClose}>
      <div className="flex gap-2">
        <input
          autoFocus
          type="text"
          value={value}
          maxLength={CHAT_CONFIG.MAX_USERNAME_LENGTH}
          placeholder="Your name"
          onChange={(e) => { setValue(e.target.value); setError(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
          className="h-11 min-w-0 flex-1 rounded-lg border px-3 text-[16px] outline-none"
          style={{ background: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-body)' }}
        />
        <button
          type="button"
          onClick={save}
          className="r5-btn-press flex h-11 w-12 items-center justify-center rounded-lg text-white"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <LuCheck size={20} />
        </button>
      </div>
      {error && <p className="mt-2 text-[12px]" style={{ color: '#dc3545' }}>{error}</p>}
    </Shell>
  );
}

const RULE_GROUPS = [
  {
    icon: <LuShield size={15} />, tone: '#0dcaf0', title: '基本規則 Basic Rules',
    items: [
      ['保持尊重', 'Be respectful to all users'],
      ['學術討論', 'Focus on academic discussions and DSE topics'],
      ['互相幫助', 'Help each other with questions and share resources'],
      ['適當用戶名', 'Use appropriate usernames'],
    ],
  },
  {
    icon: <LuBan size={15} />, tone: '#dc3545', title: '禁止行為 Prohibited',
    items: [
      ['粗言穢語', 'No profanity, hate speech, or offensive language'],
      ['垃圾訊息', 'No spam, repetitive, or meaningless messages'],
      ['分享連結', 'No external links or personal contact information'],
      ['騷擾行為', 'No harassment, bullying, or targeting users'],
      ['不當內容', 'No inappropriate or adult content'],
    ],
  },
  {
    icon: <LuClock size={15} />, tone: '#ffc107', title: '技術限制 Technical Limits',
    items: [
      ['發送頻率', '2s cooldown between messages, 15 per minute'],
      ['訊息長度', `Maximum ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters per message`],
      ['用戶名長度', `Username must be ${CHAT_CONFIG.MIN_USERNAME_LENGTH}-${CHAT_CONFIG.MAX_USERNAME_LENGTH} characters`],
    ],
  },
];

export function RulesModal({ onClose }: { onClose: () => void }) {
  return (
    <Shell title="聊天室規則 Chatroom Rules" onClose={onClose} wide>
      {RULE_GROUPS.map((g) => (
        <div key={g.title} className="mb-4">
          <h6 className="mb-2 flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: g.tone }}>
            {g.icon}{g.title}
          </h6>
          <ul className="space-y-1.5">
            {g.items.map(([zh, en]) => (
              <li key={en} className="flex gap-2 text-[13px]" style={{ color: 'var(--color-body)' }}>
                <span style={{ color: g.tone }}>•</span>
                <span><strong>{zh}</strong> — {en}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Shell>
  );
}
