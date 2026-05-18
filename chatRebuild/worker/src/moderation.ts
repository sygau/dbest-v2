/**
 * Lightweight moderation — basic only, by design.
 *
 * No giant regex, no entropy scoring, no leetspeak bypass detection.
 * Those caused false positives and burned CPU. Advanced filtering is a
 * later task. Keep everything here O(n) and cheap (Worker 10ms budget).
 */
import { CONFIG, PROFANITY } from './config';

export interface ModResult {
  ok: boolean;
  reason?: string;
  text?: string; // trimmed/clean text when ok
}

// Pre-built once at module load — single alternation, word-boundary matched.
const PROFANITY_RE = new RegExp(`\\b(${PROFANITY.join('|')})\\b`, 'i');

/** Strip the few characters that could break out of textContent / attributes. */
function stripUnsafe(s: string): string {
  return s.replace(/[<>]/g, '');
}

export function validateUsername(raw: string): ModResult {
  const text = stripUnsafe(String(raw || '').trim());
  if (text.length < CONFIG.MIN_USERNAME_LENGTH) {
    return { ok: false, reason: `Username must be at least ${CONFIG.MIN_USERNAME_LENGTH} characters` };
  }
  if (text.length > CONFIG.MAX_USERNAME_LENGTH) {
    return { ok: false, reason: `Username cannot exceed ${CONFIG.MAX_USERNAME_LENGTH} characters` };
  }
  if (PROFANITY_RE.test(text)) {
    return { ok: false, reason: 'Username contains inappropriate language' };
  }
  return { ok: true, text };
}

/** isMod bypasses profanity and length (but never XSS — that's safety, not taste). */
export function validateMessage(raw: string, isMod: boolean): ModResult {
  const text = stripUnsafe(String(raw || '').trim());
  if (!text) return { ok: false, reason: 'Message cannot be empty' };
  if (!isMod && text.length > CONFIG.MAX_MESSAGE_LENGTH) {
    return { ok: false, reason: `Message cannot exceed ${CONFIG.MAX_MESSAGE_LENGTH} characters` };
  }
  if (!isMod && PROFANITY_RE.test(text)) {
    return { ok: false, reason: 'Message contains inappropriate language' };
  }
  return { ok: true, text };
}

/** Validate a moderator image URL — https + known image extension only. */
export function validateImageUrl(raw: string): ModResult {
  const text = String(raw || '').trim();
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return { ok: false, reason: 'Invalid image URL' };
  }
  if (url.protocol !== 'https:') {
    return { ok: false, reason: 'Image URL must use https' };
  }
  /* const path = url.pathname.toLowerCase();
  if (!CONFIG.IMAGE_ALLOWED_EXT.some((ext) => path.endsWith(ext))) {
    return { ok: false, reason: 'URL must point directly to an image file' };
  } */
  return { ok: true, text: url.toString() };
}
