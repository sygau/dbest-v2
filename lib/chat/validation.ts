/** Client-side pre-validation — mirrors the Worker's moderation.ts (length/XSS). */
import { CHAT_CONFIG } from './config';

export interface CheckResult {
  ok: boolean;
  reason?: string;
  text?: string;
}

export function checkUsername(raw: string): CheckResult {
  const text = String(raw || '').trim().replace(/[<>]/g, '');
  if (text.length < CHAT_CONFIG.MIN_USERNAME_LENGTH) {
    return { ok: false, reason: `Username must be at least ${CHAT_CONFIG.MIN_USERNAME_LENGTH} characters` };
  }
  if (text.length > CHAT_CONFIG.MAX_USERNAME_LENGTH) {
    return { ok: false, reason: `Username cannot exceed ${CHAT_CONFIG.MAX_USERNAME_LENGTH} characters` };
  }
  return { ok: true, text };
}

export function checkMessage(raw: string, isModerator = false): CheckResult {
  const text = String(raw || '').trim().replace(/[<>]/g, '');
  if (!text) return { ok: false, reason: 'Message cannot be empty' };
  if (!isModerator && text.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
    return { ok: false, reason: `Message cannot exceed ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters` };
  }
  return { ok: true, text };
}

const ANIMALS = ['Tiger', 'Panda', 'Dolphin', 'Eagle', 'Fox', 'Koala', 'Lion', 'Otter', 'Penguin', 'Shark'];

export function randomUsername(): string {
  return ANIMALS[Math.floor(Math.random() * ANIMALS.length)] + Math.floor(100 + Math.random() * 900);
}
