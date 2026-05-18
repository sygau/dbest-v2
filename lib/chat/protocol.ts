/**
 * WebSocket message protocol — client mirror of the Worker's types.ts.
 * Keep this file in sync with chatRebuild/worker/src/types.ts.
 */

export interface GeoInfo {
  ip: string;
  country: string;
  asn: number | null;
  asOrg: string | null;
}

export interface ReplyRef {
  id: string;
  sender: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  clientId: string;
  sender: string;
  text: string;
  ts: number;
  isModerator: boolean;
  kind: 'text' | 'sticker' | 'link' | 'image';
  replyTo?: ReplyRef;
  geo?: GeoInfo; // present only for moderators
}

export interface SessionInfo {
  clientId: string;
  username: string;
  isMod: boolean;
  connectedAt: number;
  geo: GeoInfo;
}

export type ClientMessage =
  | { t: 'chat'; text: string; replyTo?: ReplyRef }
  | { t: 'rename'; username: string }
  | { t: 'typing' }
  | { t: 'delete'; messageId: string }
  | { t: 'stats' }
  | { t: 'ping' };

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
