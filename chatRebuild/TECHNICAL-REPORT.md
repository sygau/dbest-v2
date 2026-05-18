# Technical Report — Chat Rebuild

## 1. Why

The old chat ran on three external services: Ably (WebSocket pub/sub),
Redis (lockdown / bans / rate counters), and a Node serverless function
(`chat-auth`) doing token auth, moderation, commands, and notifications.
Three points of failure, ongoing cost, and a per-action HTTP round-trip on
top of the WebSocket.

The rebuild collapses all of it into one Cloudflare Durable Object. The DO
holds every WebSocket connection, all state, and all logic. A ~30-line Worker
just upgrades the socket and forwards it.

## 2. Architecture

```
Browser ──wss──> Worker (index.ts) ──> ChatRoom Durable Object
                  upgrade + geo            sockets, state, logic
```

- One DO instance: `idFromName("global")` — all users share one room.
- The Worker reads `request.cf` (country, ASN, ASN org) and `CF-Connecting-IP`,
  attaches them as `X-Chat-*` headers, and forwards the upgrade to the DO.
- The DO accepts the socket with the Hibernation API and owns everything else.

### Request / billing model

One Worker request per connection (the upgrade). All subsequent messages are
handled inside the DO and billed as DO duration, not Worker requests. ~500
concurrent users ≈ 500 requests for the whole session — free-tier territory.

## 3. WebSocket Hibernation

Sockets are accepted with `ctx.acceptWebSocket(server)`, not `server.accept()`.
This lets the DO evict from memory while idle and wake on the next event.

Consequence: in-memory class fields do not survive hibernation. Per-connection
identity (`clientId`, `username`, `isMod`, `geo`, `connectedAt`) is therefore
stored on the socket itself via `serializeAttachment()` and read back with
`deserializeAttachment()`. Presence is derived live from `ctx.getWebSockets()`.

Message handlers are DO methods — `webSocketMessage`, `webSocketClose`,
`webSocketError` — not event listeners.

## 4. State model

| State | Where | Survives |
|---|---|---|
| Connection identity | `ws.serializeAttachment()` | hibernation |
| Online count / presence | derived from `getWebSockets()` | always live |
| Lockdown flag | `ctx.storage` (`lockdown`) | restart |
| IP bans | `ctx.storage` (`ban:<ip>` → expiry ts) | restart |
| Message history (100) | `ctx.storage` (`history`) | restart |
| Rate-limit counters | DO memory (`Map`) | not hibernation* |
| Typing state | transient broadcast | n/a |

\* Rate counters resetting on hibernation is harmless: hibernation only happens
with zero active connections, i.e. no flood is in progress.

History is one storage key holding an array — ~100 × ~200 B ≈ 20 KB, well
under the 128 KB per-value limit. It is also cached in DO memory and lazily
reloaded after a wake.

## 5. Message protocol

JSON frames over the WebSocket. Full types: `worker/src/types.ts` and the
client mirror `lib/chat/protocol.ts`.

Client → Server: `chat` (text / sticker / `/command`, optional `replyTo`),
`rename`, `typing`, `delete` (mod), `stats` (mod).

Server → Client: `welcome` (history + flags on connect), `message`, `system`,
`presence`, `lockdown`, `command` (purge / delete), `typing`, `stats`, `error`.

### Privacy: geo per recipient

Every `ChatMessage` carries `geo` (IP + country + ASN). When broadcasting,
the DO strips `geo` for non-moderator sockets and keeps it for moderator
sockets — `viewFor(msg, isMod)`. So geo is baked into the message at creation
time and visible to any moderator afterwards via the message Info menu, even
if that moderator was offline when the message was sent. This fixes the old
behaviour where IP only appeared if a mod was present at send time.

The legacy separate `user-ip` event and timestamp-correlation hack are gone.

## 6. Moderation

Deliberately basic (see `moderation.ts`):
- Length limits (message 150, username 3–14).
- `<` `>` stripped to prevent markup injection (client renders via React text
  nodes anyway — defence in depth).
- A short, explicit profanity word list with word-boundary matching.

No entropy scoring, no leetspeak/spacing bypass detection. The old regex stack
caused false positives and burned CPU against the Worker's 10 ms budget.
Advanced filtering is a tracked follow-up. Moderators bypass the profanity
check but never the length / safety checks.

## 7. Rate limiting & anti-flood

Server-authoritative, in `ChatRoom.rateCheck()`:
- Hard cooldown between messages (`SEND_COOLDOWN_MS`).
- Burst cap (`BURST_MAX` per `BURST_WINDOW_MS`).
- Rolling per-minute window (`MAX_MESSAGES_PER_WINDOW`).

Each rejection is a "violation". `VIOLATION_THRESHOLD` violations within
`VIOLATION_WINDOW_MS` trigger an automatic timed IP ban
(`AUTOBAN_DURATION_MS`). Manual `/ban` is permanent (`until = 0`). Banned IPs
are rejected at the upgrade and any live sockets from that IP are closed.

The client (`useChatRoom`) also enforces a cooldown and duplicate-message
suppression — purely for UX snappiness; the server is the source of truth.

## 8. Commands

Parsed by `commands.ts`, executed in `ChatRoom.onCommand()`:

| Command | Who | Effect |
|---|---|---|
| `/help` | all | usage text (private system message) |
| `/online` | all | online count |
| `/purge` | mod | clears history + broadcasts a purge command |
| `/link <url>` | mod | posts a clickable link message |
| `/img <url>` | mod | embeds an https image (extension-validated) |
| `/ipinfo <ip>` | mod | geo for an IP of a connected user |
| `/lockdown on\|off` | mod | toggles mod-only sending (persisted) |
| `/ban <ip>` | mod | permanent IP ban + disconnect |

`/purge` no longer floods 50 placeholder messages (old hack). It sends one
`command:{action:"purge"}` frame; clients clear their list.

## 9. Geo without ip-api

The old code called `ip-api.com` per message. Cloudflare already provides
`request.cf.country`, `request.cf.asn`, `request.cf.asOrganization` for free.
City / region / timezone are paid-plan fields and are intentionally omitted.
No external geo request remains; NTFY notifications use the `request.cf` data.

## 10. Client

`hooks/useChatRoom.ts` replaces the old `DSEChat` class:
- Native `WebSocket`, auto-reconnect with exponential backoff.
- Reconnect re-runs `welcome`, which replaces the message list with fresh
  history — incoming `message` frames are also deduped by `id`.
- Exposes state + actions; all rendering is in `components/chat/`.

`components/chat/`: `ChatRoom` (container), `MessageList`, `MessageItem`
(bubble + reply quote + action menu), `ChatInput` (input + reply bar + sticker
picker), `StickerPicker`, `ModStatsPanel`, `ChatModals`.

UI uses the redesign-4 / Duolingo design tokens (`--color-*`) and the shared
`DropdownMenu` component for the message action menu. `public/assets/js/chat.js`
and the old `<script>` injection are deleted.

## 11. Files

Worker: `chatRebuild/worker/src/{index,ChatRoom,config,types,moderation,commands,stickers,notify}.ts`.

Client: `lib/chat/{config,protocol,stickers,emoji,validation}.ts`,
`hooks/useChatRoom.ts`, `components/chat/*.tsx`, `pages/chat.tsx`.

## 12. CF gotchas captured

- `acceptWebSocket`, not `accept()`; handlers are DO methods.
- Memory wiped on hibernation → `serializeAttachment` for connection data.
- DO storage value cap 128 KB → history array fits.
- DO migration block required in `wrangler.toml` (`new_sqlite_classes`).
- `MOD_SECRET_KEY` is a `wrangler secret`, never `[vars]`.
- 10 ms CPU budget → moderation kept O(n), no heavy regex.
