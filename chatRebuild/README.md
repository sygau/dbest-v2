# Chat Rebuild — dse.best

Migration of the live chatroom off Ably + Redis + serverless onto a single
Cloudflare Durable Object.

## What is here

```
chatRebuild/
  README.md                 this file
  SETUP-GUIDE.md            deploy + configure the chat Worker
  ROADMAP.md                what shipped, what is deferred
  TECHNICAL-REPORT.md       architecture, protocol, design decisions
  chat-auth-refonly.js      OLD serverless handler — reference only, not used
  worker/                   the new Cloudflare Worker + Durable Object
    wrangler.toml
    package.json
    tsconfig.json
    src/
      config.ts             all tunable settings (rate limits, NTFY, etc.)
      types.ts              WebSocket message protocol
      index.ts              Worker entry — WS upgrade + geo headers
      ChatRoom.ts           the Durable Object (all chat logic)
      moderation.ts         basic profanity + length/XSS checks
      commands.ts           slash-command parsing
      stickers.ts           sticker name registry
      notify.ts             NTFY push notifications
```

The client side lives in the main Next.js app (not here):

```
lib/chat/                   shared config, protocol, stickers, emoji, validation
hooks/useChatRoom.ts        WebSocket transport + state
components/chat/            React UI components
pages/chat.tsx              the page (rewritten)
```

## Quick start

1. `cd chatRebuild/worker && npm install`
2. `wrangler secret put MOD_SECRET_KEY`
3. `npm run deploy`
4. Set `NEXT_PUBLIC_CHAT_WS_URL` in the main app to the deployed `wss://` URL.

Full detail in SETUP-GUIDE.md.
