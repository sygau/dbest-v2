/**
 * WebSocket message protocol — shared shape between Worker DO and client.
 * The client mirrors this in lib/chat/protocol.ts (keep the two in sync).
 */

/** Geo info derived from request.cf — no external IP lookup. */
export interface GeoInfo {
  ip: string;
  country: string;       // request.cf.country, e.g. "HK"
  asn: number | null;    // request.cf.asn
  asOrg: string | null;  // request.cf.asOrganization
}

/** A reply quote — truncated snippet of the parent message. */
export interface ReplyRef {
  id: string;
  sender: string;
  text: string;          // already truncated to CONFIG.REPLY_QUOTE_MAX
}

/** A chat message as broadcast and stored in history. */
export interface ChatMessage {
  id: string;
  clientId: string;
  sender: string;
  text: string;
  ts: number;
  isModerator: boolean;
  kind: 'text' | 'sticker' | 'link' | 'image';
  replyTo?: ReplyRef;
  /** Only attached when delivered to a moderator socket. */
  geo?: GeoInfo;
}

// ---- Client -> Server ----
export type ClientMessage =
  | { t: 'chat'; text: string; replyTo?: ReplyRef }
  | { t: 'rename'; username: string }
  | { t: 'typing' }
  | { t: 'delete'; messageId: string }   // mod only (verified server-side)
  | { t: 'stats' }                       // mod only — request live session dump
  | { t: 'ping' };                       // keepalive — server ignores

// ---- Server -> Client ----
export interface SessionInfo {
  clientId: string;
  username: string;
  isMod: boolean;
  connectedAt: number;
  geo: GeoInfo;          // included only in stats payload (mod-only channel)
}

export type ServerMessage =
  | { t: 'welcome'; isModerator: boolean; lockdown: boolean; online: number; history: ChatMessage[] }
  | { t: 'message'; msg: ChatMessage }
  | { t: 'system'; text: string }
  | { t: 'presence'; online: number }
  | { t: 'lockdown'; enabled: boolean }
  | { t: 'command'; action: 'purge' | 'delete'; messageId?: string; moderator?: string }
  | { t: 'typing'; username: string }
  | { t: 'stats'; sessions: SessionInfo[] }
  | { t: 'error'; text: string };

/** Per-socket data stored via ws.serializeAttachment() (survives hibernation). */
export interface SocketAttachment {
  clientId: string;
  username: string;
  isMod: boolean;
  geo: GeoInfo;
  connectedAt: number;
}
