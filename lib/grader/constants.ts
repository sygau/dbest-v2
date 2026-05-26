// Re-exports of values from config.ts kept for backward compat across the codebase.
// Edit limits in lib/grader/config.ts — not here.

import { GRADER_CONFIG } from './config';

export const COOLDOWN_MS = GRADER_CONFIG.COOLDOWN_MS;
export const MAX_BYTES = GRADER_CONFIG.MAX_BYTES;
export const EN_LIMITS = GRADER_CONFIG.EN_LIMITS;
export const CH_LIMITS = GRADER_CONFIG.CH_LIMITS;
export const TASK_MAX_CHARS = GRADER_CONFIG.TASK_MAX_CHARS;

// Legacy single-value DAILY_QUOTA (kept for old imports — uses english value as default).
export const DAILY_QUOTA = GRADER_CONFIG.DAILY_QUOTA.english;

export const SUBJECTS = ['english', 'chinese'] as const;
export type Subject = typeof SUBJECTS[number];

export function dailyQuotaFor(subject: Subject): number {
  return GRADER_CONFIG.DAILY_QUOTA[subject];
}

// Band labels (unchanged).
export const EN_BAND = ['Very Poor', 'Very Poor', 'Poor', 'Marginal', 'Adequate', 'Good', 'Very Good', 'Excellent'] as const;

// Approximate HKDSE cutoffs from past papers. Not given to the AI — server applies after AI returns raw marks.
// English /21 cutoffs: 17.2/16.7/15.1/12.8/9.6
export function enLevelFromTotal(total: number): string {
  if (total >= 17.2) return '5**';
  if (total >= 16.7) return '5*';
  if (total >= 15.1) return '5';
  if (total >= 12.8) return '4';
  if (total >= 9.6)  return '3';
  if (total >= 6)    return '2';
  return '1';
}

// Chinese /103 cutoffs: 5**=69, 5*=67, 5=63, 4=56, 3=52, 2=44
export function chLevelFromTotal(total: number, totalMax?: number): { level: string; band: string } {
  // Handle Part A (/50)
  if (totalMax === 50) {
    if (total >= 34) return { level: '5**', band: '上上品' };
    if (total >= 33) return { level: '5*',  band: '上品' };
    if (total >= 31) return { level: '5',   band: '上下品' };
    if (total >= 27) return { level: '4',   band: '中上品' };
    if (total >= 25) return { level: '3',   band: '中品' };
    if (total >= 21) return { level: '2',   band: '中下品' };
    if (total >= 15) return { level: '1',   band: '下上品' };
    return { level: '1', band: '下品' };
  }
  
  // Part B (/103) - default
  if (total >= 69) return { level: '5**', band: '上上品' };
  if (total >= 67) return { level: '5*',  band: '上品' };
  if (total >= 63) return { level: '5',   band: '上下品' };
  if (total >= 56) return { level: '4',   band: '中上品' };
  if (total >= 52) return { level: '3',   band: '中品' };
  if (total >= 44) return { level: '2',   band: '中下品' };
  if (total >= 30) return { level: '1',   band: '下上品' };
  return { level: '1', band: '下品' };
}
