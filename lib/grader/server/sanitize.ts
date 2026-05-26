// Input sanitisation + validation for grader API.
//
// Two jobs:
//  1. Defang prompt-injection vectors before passing user text into the model.
//  2. Reject obvious abuse (keyboard-mash, wrong-language spam, too short/long).

import { CH_LIMITS, EN_LIMITS, MAX_BYTES, TASK_MAX_CHARS } from '../constants';
import { countCharsCh, countWordsEn } from '../wordCount';
export { countCharsCh, countWordsEn };

export function sanitiseTask(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  return sanitiseEssay(trimmed).slice(0, TASK_MAX_CHARS);
}

const INJECTION_PATTERNS: RegExp[] = [
  /<\/?(input|system|essay|instructions?|prompt)[^>]*>/gi,
  /<\|[\w-]+\|>/g,                                  // <|im_start|> etc
  /^\s*#{3,}\s*(system|instructions?|role)\b/gim,
  /\b(ignore|disregard|forget)\s+(all\s+)?(prior|previous|above)\s+(instructions?|prompts?|rules?)/gi,
  /\byou\s+are\s+now\s+(a|an)\s+/gi,
  /\bact\s+as\s+(a|an|if)\b/gi,
];

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export function sanitiseEssay(raw: string): string {
  let s = raw.replace(CONTROL_CHARS, '');
  for (const re of INJECTION_PATTERNS) s = s.replace(re, '');
  return s.trim();
}

export interface ValidationOk { ok: true; clean: string; meta: { words?: number; chars?: number } }
export interface ValidationErr { ok: false; reason: string }

export function validateEnglish(raw: string, part: 'A' | 'B' | 'unspecified'): ValidationOk | ValidationErr {
  if (typeof raw !== 'string') return { ok: false, reason: 'Essay must be text' };
  if (Buffer.byteLength(raw, 'utf8') > MAX_BYTES) return { ok: false, reason: 'Essay too large' };

  const clean = sanitiseEssay(raw);
  if (clean.length < 20) return { ok: false, reason: 'Essay too short' };

  const words = countWordsEn(clean);
  const limit = part === 'A' ? EN_LIMITS.partA : part === 'B' ? EN_LIMITS.partB : EN_LIMITS.any;
  if (words < limit.min) return { ok: false, reason: `Essay too short (need ≥${limit.min} words, got ${words})` };
  if (words > limit.max) return { ok: false, reason: `Essay too long (max ${limit.max} words, got ${words})` };

  // Charset sanity: at least 60% letters (catches keyboard-mash + non-English).
  const letters = (clean.match(/[a-zA-Z]/g) ?? []).length;
  if (letters / clean.length < 0.6) {
    return { ok: false, reason: 'Essay does not appear to be English' };
  }

  return { ok: true, clean, meta: { words } };
}

export function validateChinese(raw: string): ValidationOk | ValidationErr {
  if (typeof raw !== 'string') return { ok: false, reason: '輸入必須為文字' };
  if (Buffer.byteLength(raw, 'utf8') > MAX_BYTES) return { ok: false, reason: '文章過長' };

  const clean = sanitiseEssay(raw);
  if (clean.length < 20) return { ok: false, reason: '字數不足，無法評分' };

  const chars = countCharsCh(clean);
  if (chars < CH_LIMITS.min) return { ok: false, reason: `字數不足（需 ≥${CH_LIMITS.min} 字，現 ${chars} 字）` };
  if (chars > CH_LIMITS.max) return { ok: false, reason: `字數過多（上限 ${CH_LIMITS.max} 字，現 ${chars} 字）` };

  // At least 70% of length should be CJK.
  if (chars / clean.length < 0.7) {
    return { ok: false, reason: '文章須以中文書寫' };
  }

  return { ok: true, clean, meta: { chars } };
}
