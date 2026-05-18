/**
 * ModStatsPanel — moderator-only live session inspector.
 * Shows every connected user with IP, geo (country + ASN), connect time.
 */
import { useEffect } from 'react';
import { LuX, LuRefreshCw, LuShield } from 'react-icons/lu';
import type { SessionInfo } from '../../lib/chat/protocol';

interface Props {
  open: boolean;
  sessions: SessionInfo[] | null;
  online: number;
  onRefresh: () => void;
  onClose: () => void;
}

function ago(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h`;
}

export function ModStatsPanel({ open, sessions, online, onRefresh, onClose }: Props) {
  // Refresh on open, then poll every 5s while open.
  useEffect(() => {
    if (!open) return;
    onRefresh();
    const id = setInterval(onRefresh, 5000);
    return () => clearInterval(id);
  }, [open, onRefresh]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col"
        style={{ background: 'var(--color-card-bg)', borderLeft: '1px solid var(--color-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--color-heading)' }}>
            <LuShield size={16} style={{ color: '#f0b400' }} />
            Live Sessions · {online} online
          </h3>
          <div className="flex items-center gap-1">
            <button type="button" onClick={onRefresh} aria-label="Refresh"
              className="rounded p-1.5 hover:bg-[var(--color-card-inner-bg)]">
              <LuRefreshCw size={15} />
            </button>
            <button type="button" onClick={onClose} aria-label="Close"
              className="rounded p-1.5 hover:bg-[var(--color-card-inner-bg)]">
              <LuX size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {!sessions && (
            <div className="py-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
              Loading sessions…
            </div>
          )}
          {sessions?.length === 0 && (
            <div className="py-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
              No active sessions.
            </div>
          )}
          {sessions?.map((s) => (
            <div
              key={s.clientId}
              className="mb-2 rounded-xl border p-3 text-[12px]"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-inner-bg)' }}
            >
              <div className="flex items-center gap-1.5">
                <strong className="text-[13px]" style={{ color: 'var(--color-heading)' }}>
                  {s.username}
                </strong>
                {s.isMod && <LuShield size={12} style={{ color: '#f0b400' }} />}
                <span className="ml-auto" style={{ color: 'var(--color-muted)' }}>
                  connected {ago(s.connectedAt)} ago
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5"
                style={{ color: 'var(--color-body)' }}>
                <span style={{ color: 'var(--color-muted)' }}>IP</span>
                <span className="font-mono">{s.geo.ip}</span>
                <span style={{ color: 'var(--color-muted)' }}>Country</span>
                <span>{s.geo.country}</span>
                <span style={{ color: 'var(--color-muted)' }}>ASN</span>
                <span>{s.geo.asn ?? '—'} {s.geo.asOrg ? `· ${s.geo.asOrg}` : ''}</span>
                <span style={{ color: 'var(--color-muted)' }}>Client</span>
                <span className="font-mono truncate">{s.clientId}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t px-4 py-2 text-[11px]" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
          Tip: <code>/ban &lt;ip&gt;</code> to ban · <code>/lockdown on</code> to restrict chat.
        </div>
      </div>
    </div>
  );
}
