// ─────────────────────────────────────────────────────────────────────────
//  GRADER CONFIG — tweak limits per tool here. Single source of truth.
// ─────────────────────────────────────────────────────────────────────────
//
// To disable all anti-abuse (Turnstile + KV daily quota + cooldown)
// during dev/testing, set env: GRADER_DISABLE_LIMITS=1
// or flip DISABLE_LIMITS below to `true`.
//
// Server reads these. Client reads selected values via /lib/grader/constants.ts
// re-exports (kept stable for backward compat).

export const GRADER_CONFIG = {
  // Master kill switch. true = no quota, no cooldown, no turnstile verify.
  // Also auto-on if process.env.GRADER_DISABLE_LIMITS=1.
  DISABLE_LIMITS: false,

  // Per-tool daily quota (KV-backed, per IP, UTC day reset, 36h TTL).
  DAILY_QUOTA: {
    english: 3,
    chinese: 3,
  },

  // Client-side cooldown after submit (ms). Prevents rapid double-fire.
  COOLDOWN_MS: 10000,

  // Max body bytes accepted by server.
  MAX_BYTES: 24 * 1024,

  // Word / char limits per tool.
  EN_LIMITS: {
    partA: { min: 50, max: 800 },
    partB: { min: 150, max: 2000 },
    any:   { min: 50, max: 2000 },
  },
  CH_LIMITS: { min: 100, max: 4000 },

  // Task prompt max chars (DSE prompts can be ~1.5k with sources).
  TASK_MAX_CHARS: 1500,

  // gpt model used. Override per tool if needed.
  MODEL: {
    english: 'gpt-4o',
    chinese: 'gpt-4o',
  },

  // Cooldown when a real rate-limit (429) is hit (seconds shown to user).
  RATE_LIMITED_COOLDOWN_SEC: 60,
} as const;

export function limitsDisabled(): boolean {
  if (GRADER_CONFIG.DISABLE_LIMITS) return true;
  return process.env.GRADER_DISABLE_LIMITS === '1' || process.env.GRADER_DISABLE_LIMITS === 'true';
}
