/**
 * ChatRoom — Durable Object backing the dse.best live chatroom.
 *
 * Uses the WebSocket Hibernation API: sockets are accepted via
 * ctx.acceptWebSocket() and survive DO hibernation. Per-connection identity
 * is stored on the socket attachment (NOT in memory) so it survives wake-up.
 *
 * Persistent  (ctx.storage):  lockdown flag, IP bans, message history.
 * Memory only (rebuilt):      rate-limit counters, typing state, presence.
 */
import { CONFIG, type Env } from './config';
import type { ChatMessage, ClientMessage, ServerMessage, GeoInfo, ReplyRef, SessionInfo, SocketAttachment } from './types';
import { validateUsername, validateMessage, validateImageUrl } from './moderation';
import { checkSticker } from './stickers';
import { parseCommand, helpText, isValidIp } from './commands';
import { sendNtfy } from './notify';

interface RateState {
  windowStart: number;
  count: number;
  lastSend: number;
  burstStart: number;
  burstCount: number;
  violationStart: number;
  violations: number;
}

export class ChatRoom {
  private ctx: DurableObjectState;
  private env: Env;
  private lockdown = false;
  private history: ChatMessage[] | null = null;       // lazy-loaded
  private rate = new Map<string, RateState>();         // memory only
  private typingAt = new Map<string, number>();        // ip -> last typing ping

  constructor(ctx: DurableObjectState, env: Env) {
    this.ctx = ctx;
    this.env = env;
    ctx.blockConcurrencyWhile(async () => {
      this.lockdown = (await ctx.storage.get<boolean>('lockdown')) ?? false;
    });
  }

  // ---- connection upgrade ----------------------------------------------
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }

    const url = new URL(request.url);
    const clientId = (url.searchParams.get('clientId') || '').trim();
    const usernameRaw = url.searchParams.get('username') || '';
    const modKey = url.searchParams.get('modKey') || '';

    const ip = request.headers.get('X-Chat-IP') || 'unknown';
    const geo: GeoInfo = {
      ip,
      country: request.headers.get('X-Chat-Country') || 'XX',
      asn: Number(request.headers.get('X-Chat-ASN')) || null,
      asOrg: request.headers.get('X-Chat-ASOrg') || null,
    };

    if (!clientId || clientId.length > CONFIG.MAX_CLIENTID_LENGTH || /[<>"'&]/.test(clientId)) {
      return new Response('Invalid client ID', { status: 400 });
    }
    const uname = validateUsername(usernameRaw);
    if (!uname.ok) return new Response(uname.reason, { status: 400 });

    if (await this.isBanned(ip)) return new Response('Banned', { status: 403 });

    // Cap concurrent connections from a single IP.
    const fromIp = this.ctx.getWebSockets()
      .filter((s) => (s.deserializeAttachment() as SocketAttachment | null)?.geo.ip === ip).length;
    if (fromIp >= CONFIG.MAX_SOCKETS_PER_IP) {
      return new Response('Too many connections', { status: 429 });
    }

    const isMod = !!modKey && modKey === CONFIG.MOD_SECRET_KEY;

    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];

    const attachment: SocketAttachment = {
      clientId, username: uname.text!, isMod, geo, connectedAt: Date.now(),
    };
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment(attachment);

    const history = await this.getHistory();
    this.send(server, {
      t: 'welcome',
      isModerator: isMod,
      lockdown: this.lockdown,
      online: this.ctx.getWebSockets().length,
      history: history.map((m) => this.viewFor(m, isMod)),
    });

    // Tell everyone else this user joined (joiner sees their own "Connected").
    for (const ws of this.ctx.getWebSockets()) {
      if (ws !== server) this.send(ws, { t: 'system', text: `${uname.text} joined the chat` });
    }
    this.broadcastPresence();

    return new Response(null, { status: 101, webSocket: client });
  }

  // ---- hibernation handlers --------------------------------------------
  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    try {
      // Reject oversized / binary frames before doing any work.
      if (typeof raw !== 'string' || raw.length > CONFIG.MAX_FRAME_BYTES) return;

      const att = ws.deserializeAttachment() as SocketAttachment | null;
      if (!att) return;
      const data = JSON.parse(raw) as ClientMessage;
      switch (data.t) {
        case 'chat': return this.onChat(ws, att, data.text, data.replyTo);
        case 'rename': return this.onRename(ws, att, data.username);
        case 'typing': return this.onTyping(att, ws);
        case 'delete': return this.onDelete(ws, att, data.messageId);
        case 'stats': return this.onStats(ws, att);
        case 'ping': return; // keepalive — no-op
      }
    } catch {
      this.send(ws, { t: 'error', text: 'Malformed message' });
    }
  }

  /** Typing ping — server-throttled per IP so a client cannot flood it. */
  private onTyping(att: SocketAttachment, ws: WebSocket): void {
    const now = Date.now();
    const last = this.typingAt.get(att.geo.ip) ?? 0;
    if (now - last < CONFIG.TYPING_SERVER_THROTTLE_MS) return;
    this.typingAt.set(att.geo.ip, now);
    this.broadcastTyping(att.username, ws);
  }

  webSocketClose(ws: WebSocket): void {
    try { ws.close(); } catch { /* already closed */ }
    this.broadcastPresence();
  }

  webSocketError(ws: WebSocket): void {
    this.broadcastPresence();
  }

  // ---- chat ------------------------------------------------------------
  private async onChat(ws: WebSocket, att: SocketAttachment, textRaw: string, replyTo?: ReplyRef): Promise<void> {
    const text = String(textRaw || '').trim();
    if (!text) return;

    // Slash commands bypass moderation/rate-limit (handled separately).
    if (text.startsWith('/')) return this.onCommand(ws, att, text);

    // Lockdown — only mods may send.
    if (this.lockdown && !att.isMod) {
      this.send(ws, { t: 'error', text: '🔒 Lockdown is active — only moderators can send messages.' });
      return;
    }

    // Rate limit (mods exempt).
    if (!att.isMod) {
      const verdict = this.rateCheck(att);
      if (!verdict.ok) {
        if (verdict.ban) await this.banIp(att.geo.ip, Date.now() + CONFIG.AUTOBAN_DURATION_MS);
        this.send(ws, { t: 'error', text: verdict.reason! });
        return;
      }
    }

    // Sticker?  ([name] and nothing else)
    const stickerMatch = text.match(/^\[([A-Za-z0-9_-]+)\]$/);
    let kind: ChatMessage['kind'] = 'text';
    let finalText = text;

    if (stickerMatch) {
      const sticker = checkSticker(stickerMatch[1]);
      if (!sticker.known) { this.send(ws, { t: 'error', text: 'Unknown sticker.' }); return; }
      if (sticker.modOnly && !att.isMod) {
        this.send(ws, { t: 'error', text: 'That sticker is moderators-only.' });
        return;
      }
      kind = 'sticker';
    } else {
      const mod = validateMessage(text, att.isMod);
      if (!mod.ok) { this.send(ws, { t: 'error', text: mod.reason! }); return; }
      finalText = mod.text!;
    }

    const msg = this.makeMessage(att, finalText, kind, this.cleanReply(replyTo));
    await this.publish(msg);
    if (!att.isMod) void sendNtfy(msg, att.geo);
  }

  private async onCommand(ws: WebSocket, att: SocketAttachment, text: string): Promise<void> {
    const cmd = parseCommand(text);
    if (!cmd) return;

    // Commands available to everyone.
    if (cmd.name === 'help') { this.send(ws, { t: 'system', text: helpText(att.isMod) }); return; }
    if (cmd.name === 'online') {
      this.send(ws, { t: 'system', text: `👥 ${this.ctx.getWebSockets().length} user(s) online.` });
      return;
    }
    if (cmd.name === 'unknown') { this.send(ws, { t: 'system', text: `❌ ${cmd.hint}` }); return; }

    // Everything below is moderator-only.
    if (!att.isMod) { this.send(ws, { t: 'system', text: '❌ Unknown command. Type /help.' }); return; }

    switch (cmd.name) {
      case 'purge': {
        await this.ctx.storage.put('history', []);
        this.history = [];
        this.broadcast({ t: 'command', action: 'purge', moderator: att.username });
        break;
      }
      case 'link': {
        try { new URL(cmd.url.match(/^https?:\/\//) ? cmd.url : `https://${cmd.url}`); }
        catch { this.send(ws, { t: 'system', text: '❌ Invalid URL.' }); return; }
        const url = cmd.url.match(/^https?:\/\//) ? cmd.url : `https://${cmd.url}`;
        await this.publish(this.makeMessage(att, url, 'link'));
        break;
      }
      case 'img': {
        const v = validateImageUrl(cmd.url);
        if (!v.ok) { this.send(ws, { t: 'system', text: `❌ ${v.reason}` }); return; }
        await this.publish(this.makeMessage(att, v.text!, 'image'));
        break;
      }
      case 'ipinfo': {
        if (!isValidIp(cmd.ip)) { this.send(ws, { t: 'system', text: '❌ Invalid IP.' }); return; }
        this.send(ws, { t: 'system', text: this.lookupIp(cmd.ip) });
        break;
      }
      case 'lockdown': {
        this.lockdown = cmd.enable;
        await this.ctx.storage.put('lockdown', cmd.enable);
        this.broadcast({ t: 'lockdown', enabled: cmd.enable });
        this.broadcast({ t: 'system', text: cmd.enable
          ? '🔒 Lockdown ENABLED — only moderators can send messages.'
          : '🔓 Lockdown DISABLED — everyone can send messages.' });
        break;
      }
      case 'ban': {
        if (!isValidIp(cmd.ip)) { this.send(ws, { t: 'system', text: '❌ Invalid IP.' }); return; }
        await this.banIp(cmd.ip, 0); // 0 = permanent
        this.disconnectIp(cmd.ip);
        this.send(ws, { t: 'system', text: `🚫 ${cmd.ip} banned.` });
        break;
      }
    }
  }

  private async onRename(ws: WebSocket, att: SocketAttachment, raw: string): Promise<void> {
    const v = validateUsername(raw);
    if (!v.ok) { this.send(ws, { t: 'error', text: v.reason! }); return; }
    ws.serializeAttachment({ ...att, username: v.text! });
  }

  private async onDelete(ws: WebSocket, att: SocketAttachment, messageId: string): Promise<void> {
    if (!att.isMod) { this.send(ws, { t: 'error', text: 'Only moderators can delete messages.' }); return; }
    const history = await this.getHistory();
    this.history = history.filter((m) => m.id !== messageId);
    await this.ctx.storage.put('history', this.history);
    this.broadcast({ t: 'command', action: 'delete', messageId, moderator: att.username });
  }

  private onStats(ws: WebSocket, att: SocketAttachment): void {
    if (!att.isMod) { this.send(ws, { t: 'error', text: 'Moderators only.' }); return; }
    const sessions: SessionInfo[] = this.ctx.getWebSockets().map((s) => {
      const a = s.deserializeAttachment() as SocketAttachment;
      return {
        clientId: a.clientId, username: a.username, isMod: a.isMod,
        connectedAt: a.connectedAt, geo: a.geo,
      };
    });
    this.send(ws, { t: 'stats', sessions });
  }

  // ---- message helpers -------------------------------------------------
  private makeMessage(att: SocketAttachment, text: string, kind: ChatMessage['kind'], replyTo?: ReplyRef): ChatMessage {
    return {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      clientId: att.clientId,
      sender: att.username,
      text,
      ts: Date.now(),
      isModerator: att.isMod,
      kind,
      replyTo,
      geo: att.geo,
    };
  }

  private cleanReply(replyTo?: ReplyRef): ReplyRef | undefined {
    if (!replyTo || !replyTo.id) return undefined;
    return {
      id: String(replyTo.id).slice(0, 64),
      sender: String(replyTo.sender || '').slice(0, CONFIG.MAX_USERNAME_LENGTH),
      text: String(replyTo.text || '').replace(/[<>]/g, '').slice(0, CONFIG.REPLY_QUOTE_MAX),
    };
  }

  /** Append to history, persist, broadcast (geo stripped for non-mods). */
  private async publish(msg: ChatMessage): Promise<void> {
    const history = await this.getHistory();
    history.push(msg);
    if (history.length > CONFIG.HISTORY_LIMIT) history.splice(0, history.length - CONFIG.HISTORY_LIMIT);
    this.history = history;
    await this.ctx.storage.put('history', history);

    for (const ws of this.ctx.getWebSockets()) {
      const a = ws.deserializeAttachment() as SocketAttachment | null;
      this.send(ws, { t: 'message', msg: this.viewFor(msg, !!a?.isMod) });
    }
  }

  /** Strip geo for non-moderator recipients. */
  private viewFor(msg: ChatMessage, isMod: boolean): ChatMessage {
    if (isMod) return msg;
    const { geo, ...rest } = msg;
    return rest;
  }

  private async getHistory(): Promise<ChatMessage[]> {
    if (this.history === null) {
      this.history = (await this.ctx.storage.get<ChatMessage[]>('history')) ?? [];
    }
    return this.history;
  }

  private lookupIp(ip: string): string {
    for (const ws of this.ctx.getWebSockets()) {
      const a = ws.deserializeAttachment() as SocketAttachment;
      if (a.geo.ip === ip) {
        return `🌍 ${ip}\nCountry: ${a.geo.country}\nASN: ${a.geo.asn ?? 'Unknown'} (${a.geo.asOrg ?? 'Unknown'})`;
      }
    }
    return `No active session found for ${ip}. Geo is only known for connected users.`;
  }

  // ---- presence / typing ----------------------------------------------
  private broadcastPresence(): void {
    this.broadcast({ t: 'presence', online: this.ctx.getWebSockets().length });
  }

  private broadcastTyping(username: string, except: WebSocket): void {
    for (const ws of this.ctx.getWebSockets()) {
      if (ws !== except) this.send(ws, { t: 'typing', username });
    }
  }

  // ---- rate limiting ---------------------------------------------------
  private rateCheck(att: SocketAttachment): { ok: boolean; reason?: string; ban?: boolean } {
    const now = Date.now();
    // Keyed by IP, not clientId — clientId is client-generated and trivially
    // reset from localStorage, so it cannot anchor a rate limit.
    const key = att.geo.ip;
    let s = this.rate.get(key);
    if (!s) {
      s = { windowStart: now, count: 0, lastSend: 0, burstStart: now, burstCount: 0, violationStart: now, violations: 0 };
      this.rate.set(key, s);
    }

    // Hard cooldown.
    if (now - s.lastSend < CONFIG.SEND_COOLDOWN_MS) {
      return this.violation(s, now, 'You are sending messages too fast.');
    }
    // Burst.
    if (now - s.burstStart > CONFIG.BURST_WINDOW_MS) { s.burstStart = now; s.burstCount = 0; }
    if (s.burstCount >= CONFIG.BURST_MAX) {
      return this.violation(s, now, 'Slow down — too many messages in a row.');
    }
    // Rolling window.
    if (now - s.windowStart > CONFIG.RATE_LIMIT_WINDOW_MS) { s.windowStart = now; s.count = 0; }
    if (s.count >= CONFIG.MAX_MESSAGES_PER_WINDOW) {
      return this.violation(s, now, 'Rate limit reached. Wait a moment.');
    }

    s.lastSend = now; s.count++; s.burstCount++;
    return { ok: true };
  }

  private violation(s: RateState, now: number, reason: string): { ok: false; reason: string; ban?: boolean } {
    if (now - s.violationStart > CONFIG.VIOLATION_WINDOW_MS) { s.violationStart = now; s.violations = 0; }
    s.violations++;
    return { ok: false, reason, ban: s.violations >= CONFIG.VIOLATION_THRESHOLD };
  }

  // ---- bans ------------------------------------------------------------
  private async isBanned(ip: string): Promise<boolean> {
    const until = await this.ctx.storage.get<number>(`ban:${ip}`);
    if (until === undefined) return false;
    if (until !== 0 && Date.now() > until) {
      await this.ctx.storage.delete(`ban:${ip}`);
      return false;
    }
    return true;
  }

  private async banIp(ip: string, until: number): Promise<void> {
    await this.ctx.storage.put(`ban:${ip}`, until);
  }

  private disconnectIp(ip: string): void {
    for (const ws of this.ctx.getWebSockets()) {
      const a = ws.deserializeAttachment() as SocketAttachment;
      if (a.geo.ip === ip) {
        this.send(ws, { t: 'error', text: 'You have been banned.' });
        try { ws.close(1008, 'banned'); } catch { /* noop */ }
      }
    }
  }

  // ---- low-level send --------------------------------------------------
  private send(ws: WebSocket, msg: ServerMessage): void {
    try { ws.send(JSON.stringify(msg)); } catch { /* socket gone */ }
  }

  private broadcast(msg: ServerMessage): void {
    const payload = JSON.stringify(msg);
    for (const ws of this.ctx.getWebSockets()) {
      try { ws.send(payload); } catch { /* socket gone */ }
    }
  }
}
