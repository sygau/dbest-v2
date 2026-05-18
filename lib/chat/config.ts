/**
 * Client-side chat config.
 *
 * CHAT_WS_URL must point at the deployed chat Worker. Set it via the
 * NEXT_PUBLIC_CHAT_WS_URL env var; the fallback is the workers.dev default.
 */

export const CHAT_CONFIG = {
  /** WebSocket endpoint of the chat Worker. */
  WS_URL: process.env.NEXT_PUBLIC_CHAT_WS_URL || 'wss://chatgippity.dse.best',

  /** localStorage key holding the moderator secret. */
  MOD_KEY_STORAGE: 'dsechat_mod_key',

  // ---- limits (mirror the Worker; client-side pre-checks for snappy UX) ----
  MAX_MESSAGE_LENGTH: 150,
  MAX_USERNAME_LENGTH: 14,
  MIN_USERNAME_LENGTH: 3,
  REPLY_QUOTE_MAX: 80,

  // ---- client-side rate guard (server is authoritative) ----
  SEND_COOLDOWN_MS: 2_000,
  DUPLICATE_HISTORY: 8,        // block resending any of the last N messages

  // ---- reconnect ----
  RECONNECT_BASE_MS: 1_000,
  RECONNECT_MAX_MS: 15_000,
  KEEPALIVE_MS: 30_000,        // ping interval to keep the socket warm

  // ---- typing indicator ----
  TYPING_THROTTLE_MS: 2_000,   // how often a "typing" ping is sent while typing
  TYPING_CLEAR_MS: 4_000,      // hide a peer's indicator this long after last ping

  // ---- image embeds ----
  IMAGE_MAX_DISPLAY_PX: 320,
} as const;
