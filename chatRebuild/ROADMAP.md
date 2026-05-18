# Roadmap — Chat Rebuild

## Shipped

Backend (Cloudflare Worker + Durable Object):
- Single `ChatRoom` Durable Object using the WebSocket Hibernation API.
- Thin Worker router — WS upgrade + Cloudflare geo headers, forwards to the DO.
- Message history (last 100) in DO storage; survives restart and hibernation.
- Presence / online count from `getWebSockets()`.
- Server-authoritative rate limiting: cooldown + burst + rolling window.
- Auto-ban on repeated rate-limit violations; manual `/ban` is permanent.
- IP banning with permanent + timed entries (auto-expire).
- Lockdown mode (persisted).
- Moderator commands: `/help /online /purge /link /img /ipinfo /lockdown /ban`.
- NTFY push notifications using `request.cf` geo (country + ASN), no ip-api call.
- Basic-only moderation — short profanity list, length + XSS checks.

Frontend (React, in the main app):
- `useChatRoom` hook — native WebSocket, auto-reconnect with backoff,
  client-side rate guard, duplicate suppression.
- Full React rewrite of the UI — `chat.js` deleted.
- WhatsApp-style reply with truncated quote block.
- Typing indicator (shows which username is typing).
- Three-dot / right-click message action menu (Reply, Info, Delete).
- Delete is moderator-only; non-mods cannot delete others' messages.
- Moderator live-sessions panel — online list with IP + geo, polls every 5 s.
- Geo info baked into every message; visible via the message Info menu item
  (no longer requires the mod to be present when the message was sent).
- Image embeds: mod-only `/img <url>`, https + image-extension validated,
  resolution capped on display.
- Stickers with moderator-only split preserved.
- Emoji shortcodes, char counter, username modal, rules modal.

## Removed (intentional)

- AI bot (ChatAnywhere / BestGPT) — all bot logic, `/aibot` command, and the
  `bot-response` event are gone.
- Ably SDK and Redis.
- The heavy regex moderation (entropy scoring, leetspeak/bypass detection).

## Deferred — next tasks

1. Advanced moderation — leetspeak / spacing bypass detection, configurable
   word lists, per-room policy. Deliberately left out to avoid false positives.
2. Moderator auth hardening — currently a shared secret in `localStorage`.
   Consider signed tokens or a short-lived challenge.
3. Message edit (explicitly out of scope for this round).
4. Image upload (currently embed-by-URL only; no R2 storage).
5. Persisted moderation audit log (bans / purges) — currently console only.
6. Multiple rooms / channels — the DO is hard-coded to one global room.
7. Reactions / read receipts.

## Known limitations

- `/ipinfo <ip>` only resolves IPs of currently-connected users (geo is taken
  from `request.cf` at connect time; arbitrary IP lookup needs a paid API).
- City / region / timezone are not shown — paid Cloudflare plan only.
- Rate-limit counters are in DO memory; they reset if the DO hibernates with
  zero connections. Acceptable: no connections means no flood in progress.
