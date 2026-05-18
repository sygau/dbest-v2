/**
 * ChatRoom Worker — central tunable config.
 *
 * Everything an operator might reasonably want to change lives here.
 * No magic numbers scattered across the codebase.
 */

export const CONFIG = {
  // ---- Moderator auth ----
  // Hard-coded server-side. This file is bundled into the Worker only —
  // it is NEVER shipped to the browser, so the key stays private.
  // A client is a moderator when its localStorage `dsechat_mod_key`
  // exactly matches this value.
  MOD_SECRET_KEY: 'dsebest88388',

  // ---- Room ----
  ROOM_NAME: 'global',          // single shared Durable Object instance
  HISTORY_LIMIT: 100,           // messages kept in DO storage + sent on connect

  // ---- Message / username limits ----
  MAX_MESSAGE_LENGTH: 150,
  MAX_USERNAME_LENGTH: 14,
  MIN_USERNAME_LENGTH: 3,
  MAX_CLIENTID_LENGTH: 100,
  REPLY_QUOTE_MAX: 80,          // quoted text truncated to this in a reply block

  // ---- Rate limiting (server-authoritative, anti-flood) ----
  RATE_LIMIT_WINDOW_MS: 60_000, // rolling window
  MAX_MESSAGES_PER_WINDOW: 15,  // messages allowed per window
  SEND_COOLDOWN_MS: 2_000,      // hard minimum gap between two messages
  BURST_MAX: 4,                 // messages allowed in a burst window
  BURST_WINDOW_MS: 8_000,       // burst window length

  // ---- Auto-ban (flood escalation) ----
  VIOLATION_THRESHOLD: 4,       // rate-limit violations before an auto-ban
  VIOLATION_WINDOW_MS: 300_000, // violations counted within this window
  AUTOBAN_DURATION_MS: 3_600_000, // temp ban length (1h); manual /ban is permanent

  // ---- Typing indicator ----
  TYPING_TTL_MS: 5_000,         // a "typing" ping is considered stale after this
  TYPING_SERVER_THROTTLE_MS: 1_500, // server drops typing pings faster than this

  // ---- Abuse guards ----
  MAX_FRAME_BYTES: 4_000,       // reject any inbound WS frame larger than this
  MAX_SOCKETS_PER_IP: 6,        // cap concurrent connections from one IP

  // Browser WebSocket upgrades carry an Origin header that page JS cannot
  // forge — only these origins may open a socket. Empty Origin (non-browser
  // clients / wscat) is allowed through so tooling still works.
  ALLOWED_ORIGINS: [
    'https://dse.best',
    'https://www.dse.best',
    'http://localhost:3000',
  ],

  // ---- Image embeds (mod only, /img <url>) ----
  IMAGE_MAX_DISPLAY_PX: 320,    // CSS cap on rendered image edge
  IMAGE_ALLOWED_EXT: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'],

  // ---- NTFY push notifications ----
  NTFY_ENABLED: true,
  NTFY_TOPIC: 'DefinitelyWouldntbeDSEdotBESTwebsiteChatMessagingServiceEndpoint',
  NTFY_CLICK_URL: 'https://dse.best/chat',
  NTFY_ICON: 'https://dse.best/assets/images/logo-icon.png',
} as const;

/**
 * Basic profanity list. Intentionally minimal — only blatant words.
 * Advanced bypass detection (leetspeak, spacing) is a deliberate later task;
 * we do NOT want false positives interrupting real students mid-chat.
 */
export const PROFANITY = [
  'asshole', 'dick', 'pussy',
  'nigger', 'faggot', 'retard', 'whore', 'slut',
];

/** Env bindings available to the Worker / Durable Object. */
export interface Env {
  CHAT_ROOM: DurableObjectNamespace;
}
