# Setup Guide — Chat Worker

How to deploy and configure the dse.best chat Worker + Durable Object.

## 1. Prerequisites

- Cloudflare account (free plan is enough).
- `wrangler` CLI — already a dev dependency of the main repo.
- Node 18+.

## 2. Install worker dependencies

```
cd chatRebuild/worker
npm install
```

## 3. Set the moderator secret

The moderator key is a secret, never a plain var.

```
wrangler secret put MOD_SECRET_KEY
```

Enter the same value the old system used (`dsebest88388` unless changed).
A user becomes a moderator when their browser `localStorage.dsechat_mod_secret`
equals this value.

## 4. Deploy the worker

```
npm run deploy
```

Wrangler prints the URL, e.g. `https://dsebest-chat.<subdomain>.workers.dev`.
The WebSocket URL is the same host with `wss://`.

A custom domain (e.g. `chat.dse.best`) can be attached in the Cloudflare
dashboard under Workers → Triggers → Custom Domains. Recommended for prod.

## 5. Point the client at the worker

In the main Next.js app set an env var:

```
NEXT_PUBLIC_CHAT_WS_URL=wss://dsebest-chat.<subdomain>.workers.dev
```

Add it to `.env.local` for local dev and to the Cloudflare Pages/Workers
project settings for production. If unset, the client falls back to the
placeholder in `lib/chat/config.ts` (which will NOT connect).

## 6. Local development

Worker:

```
cd chatRebuild/worker
npm run dev          # wrangler dev — local DO at ws://localhost:8787
```

Set `NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8787` in the app's `.env.local`,
then run the Next.js app as usual.

## 7. Smoke test

With `wrangler dev` running:

```
npx wscat -c "ws://localhost:8787/?clientId=t1&username=Tester1"
```

Expect a `welcome` frame. Then send:

```
{"t":"chat","text":"hello"}
{"t":"chat","text":"[wave]"}
{"t":"chat","text":"/help"}
```

For moderator tests add `&modKey=<MOD_SECRET_KEY>` to the connect URL and try
`/online`, `/purge`, `/lockdown on`, `/ban 1.2.3.4`, `/img https://x/y.png`.

## 8. Tuning

All operational knobs are in `worker/src/config.ts` — rate limits, burst
window, auto-ban threshold, history size, NTFY topic, image cap. Edit and
redeploy. The client mirror is `lib/chat/config.ts` (keep limits in sync).

## Configuration reference

| Setting | File | Default |
|---|---|---|
| Messages per minute | `worker/src/config.ts` `MAX_MESSAGES_PER_WINDOW` | 15 |
| Send cooldown | `SEND_COOLDOWN_MS` | 2000 ms |
| Burst limit | `BURST_MAX` / `BURST_WINDOW_MS` | 4 per 8 s |
| Auto-ban threshold | `VIOLATION_THRESHOLD` | 4 violations |
| Auto-ban duration | `AUTOBAN_DURATION_MS` | 1 h |
| History kept | `HISTORY_LIMIT` | 100 |
| Image display cap | `IMAGE_MAX_DISPLAY_PX` | 320 px |
| Profanity list | `worker/src/config.ts` `PROFANITY` | basic words |
| NTFY topic | `NTFY_TOPIC` | (see file) |

## Decommissioning the old stack

Once the new worker is live and verified:

1. Remove the Ably app / API key.
2. Shut down the Redis instance.
3. Retire the old `chat-auth` serverless function.

`chatRebuild/chat-auth-refonly.js` stays as a reference snapshot only.
