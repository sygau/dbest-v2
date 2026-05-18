/**
 * useChatRoom — native-WebSocket transport + state for the dse.best chatroom.
 *
 * Replaces the old Ably-based DSEChat class. Owns: connection lifecycle,
 * auto-reconnect, message/presence/typing state, client-side rate guard,
 * and duplicate-message suppression. All rendering lives in components.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAT_CONFIG } from '../lib/chat/config';
import { expandEmoji } from '../lib/chat/emoji';
import { checkMessage } from '../lib/chat/validation';
import type {
  ChatMessage, ClientMessage, ReplyRef, ServerMessage, SessionInfo,
} from '../lib/chat/protocol';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export interface SystemItem {
  kind: 'system';
  id: string;
  text: string;
  ts: number;
}
export type DisplayItem = ChatMessage | SystemItem;

export const isSystem = (i: DisplayItem): i is SystemItem =>
  (i as SystemItem).kind === 'system';

interface UseChatRoom {
  status: ConnectionStatus;
  items: DisplayItem[];
  online: number;
  isModerator: boolean;
  lockdown: boolean;
  typingUsers: string[];
  stats: SessionInfo[] | null;
  lastError: string | null;
  sendChat: (text: string, replyTo?: ReplyRef) => boolean;
  sendTyping: () => void;
  rename: (username: string) => void;
  deleteMessage: (id: string) => void;
  requestStats: () => void;
  clearError: () => void;
}

function getClientId(): string {
  let id = localStorage.getItem('chatClientId');
  if (!id) {
    id = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem('chatClientId', id);
  }
  return id;
}

export function useChatRoom(username: string): UseChatRoom {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [online, setOnline] = useState(0);
  const [isModerator, setIsModerator] = useState(false);
  const [lockdown, setLockdown] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [stats, setStats] = useState<SessionInfo[] | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const usernameRef = useRef(username);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backoffRef = useRef<number>(CHAT_CONFIG.RECONNECT_BASE_MS);
  const closedRef = useRef(false);

  // client-side anti-spam guard
  const lastSendRef = useRef(0);
  const recentRef = useRef<string[]>([]);
  const lastTypingRef = useRef(0);

  // peer typing timers
  const typingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => { usernameRef.current = username; }, [username]);

  const pushSystem = useCallback((text: string) => {
    setItems((prev) => [...prev, {
      kind: 'system', id: `sys_${Date.now()}_${Math.random()}`, text, ts: Date.now(),
    }]);
  }, []);

  const handleServer = useCallback((msg: ServerMessage) => {
    switch (msg.t) {
      case 'welcome':
        setIsModerator(msg.isModerator);
        setLockdown(msg.lockdown);
        setOnline(msg.online);
        setItems(msg.history);
        pushSystem('Connected to chatroom');
        if (msg.lockdown) pushSystem('🔒 Lockdown is active — only moderators can send messages.');
        if (msg.isModerator) pushSystem('Welcome, Moderator! Type /help to see available commands.');
        break;
      case 'message':
        setItems((prev) =>
          prev.some((i) => !isSystem(i) && i.id === msg.msg.id) ? prev : [...prev, msg.msg],
        );
        break;
      case 'system':
        pushSystem(msg.text);
        break;
      case 'presence':
        setOnline(msg.online);
        break;
      case 'lockdown':
        setLockdown(msg.enabled);
        break;
      case 'command':
        if (msg.action === 'purge') setItems([]);
        else if (msg.action === 'delete' && msg.messageId) {
          setItems((prev) => prev.filter((i) => isSystem(i) || i.id !== msg.messageId));
        }
        break;
      case 'typing': {
        const name = msg.username;
        const timers = typingTimersRef.current;
        const existing = timers.get(name);
        if (existing) clearTimeout(existing);
        setTypingUsers((prev) => (prev.includes(name) ? prev : [...prev, name]));
        timers.set(name, setTimeout(() => {
          timers.delete(name);
          setTypingUsers((prev) => prev.filter((n) => n !== name));
        }, CHAT_CONFIG.TYPING_CLEAR_MS));
        break;
      }
      case 'stats':
        setStats(msg.sessions);
        break;
      case 'error':
        setLastError(msg.text);
        break;
    }
  }, [pushSystem]);

  const connect = useCallback(() => {
    if (closedRef.current) return;
    // Guard against a duplicate connection (React StrictMode double-mount).
    if (wsRef.current) {
      try { wsRef.current.close(); } catch { /* noop */ }
      wsRef.current = null;
    }
    setStatus('connecting');

    const params = new URLSearchParams({
      clientId: getClientId(),
      username: usernameRef.current,
    });
    const modKey = localStorage.getItem(CHAT_CONFIG.MOD_KEY_STORAGE)
      || localStorage.getItem('dsechat_mod_secret');
    if (modKey) params.set('modKey', modKey);

    let ws: WebSocket;
    try {
      ws = new WebSocket(`${CHAT_CONFIG.WS_URL}?${params.toString()}`);
    } catch {
      scheduleReconnect();
      return;
    }
    wsRef.current = ws;

    // Ignore events from a socket that is no longer the active one
    // (prevents orphaned StrictMode/HMR sockets double-counting or duping).
    ws.onopen = () => {
      if (wsRef.current !== ws) return;
      setStatus('connected');
      backoffRef.current = CHAT_CONFIG.RECONNECT_BASE_MS;
    };
    ws.onmessage = (e) => {
      if (wsRef.current !== ws) return;
      try { handleServer(JSON.parse(e.data) as ServerMessage); } catch { /* ignore */ }
    };
    ws.onclose = () => {
      if (wsRef.current !== ws) return;
      setStatus('disconnected');
      wsRef.current = null;
      scheduleReconnect();
    };
    ws.onerror = () => { try { ws.close(); } catch { /* noop */ } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleServer]);

  const scheduleReconnect = useCallback(() => {
    if (closedRef.current || reconnectRef.current) return;
    const delay = backoffRef.current;
    backoffRef.current = Math.min(delay * 2, CHAT_CONFIG.RECONNECT_MAX_MS);
    reconnectRef.current = setTimeout(() => {
      reconnectRef.current = null;
      connect();
    }, delay);
  }, [connect]);

  useEffect(() => {
    closedRef.current = false;
    connect();
    // Keepalive — keeps the socket warm through idle proxies / colo recycles.
    const ping = setInterval(() => {
      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ t: 'ping' }));
    }, CHAT_CONFIG.KEEPALIVE_MS);
    return () => {
      closedRef.current = true;
      clearInterval(ping);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      typingTimersRef.current.forEach(clearTimeout);
      wsRef.current?.close();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendRaw = useCallback((m: ClientMessage): boolean => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify(m));
    return true;
  }, []);

  const sendChat = useCallback((textRaw: string, replyTo?: ReplyRef): boolean => {
    const text = expandEmoji(textRaw.trim());
    if (!text) return false;

    const isCommand = text.startsWith('/');
    const isSticker = /^\[[A-Za-z0-9_-]+\]$/.test(text);

    if (!isCommand) {
      const now = Date.now();
      if (now - lastSendRef.current < CHAT_CONFIG.SEND_COOLDOWN_MS) {
        setLastError('You are sending messages too fast.');
        return false;
      }
      if (!isSticker) {
        const check = checkMessage(text, isModerator);
        if (!check.ok) { setLastError(check.reason!); return false; }
        if (recentRef.current.includes(text)) {
          setLastError('You already sent that message.');
          return false;
        }
      }
      lastSendRef.current = now;
      recentRef.current.push(text);
      if (recentRef.current.length > CHAT_CONFIG.DUPLICATE_HISTORY) recentRef.current.shift();
    }

    return sendRaw({ t: 'chat', text, replyTo });
  }, [sendRaw, isModerator]);

  const sendTyping = useCallback(() => {
    const now = Date.now();
    if (now - lastTypingRef.current < CHAT_CONFIG.TYPING_THROTTLE_MS) return;
    lastTypingRef.current = now;
    sendRaw({ t: 'typing' });
  }, [sendRaw]);

  const rename = useCallback((name: string) => {
    sendRaw({ t: 'rename', username: name });
  }, [sendRaw]);

  const deleteMessage = useCallback((id: string) => {
    sendRaw({ t: 'delete', messageId: id });
  }, [sendRaw]);

  const requestStats = useCallback(() => {
    sendRaw({ t: 'stats' });
  }, [sendRaw]);

  const clearError = useCallback(() => setLastError(null), []);

  return {
    status, items, online, isModerator, lockdown, typingUsers, stats, lastError,
    sendChat, sendTyping, rename, deleteMessage, requestStats, clearError,
  };
}
