// Lightweight runtime validators. We don't pull Zod just for two shapes.
// Validation goal: reject obviously malformed model output, not enforce every field.

import type { ChGraderResult, EnGraderResult } from '../types';

function isObj(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

function isDomain(x: unknown, max: number): boolean {
  if (!isObj(x)) return false;
  const score = x.score;
  return typeof score === 'number' && score >= 0 && score <= max
    && Array.isArray(x.strengths) && Array.isArray(x.improvements);
}

export function validateEnResult(x: unknown): EnGraderResult | null {
  if (!isObj(x)) return null;
  const s = x.scores as Record<string, unknown> | undefined;
  if (!isObj(s)) return null;
  if (!isDomain(s.content, 7) || !isDomain(s.language, 7) || !isDomain(s.organisation, 7)) return null;
  if (typeof x.total_score !== 'number') return null;
  if (!Array.isArray(x.paragraph_feedback)) (x as Record<string, unknown>).paragraph_feedback = [];
  if (!Array.isArray(x.level_up_tips)) (x as Record<string, unknown>).level_up_tips = [];
  if (typeof x.disclaimer !== 'string') {
    (x as Record<string, unknown>).disclaimer = 'This AI grade is for reference only.';
  }
  return x as unknown as EnGraderResult;
}

export function validateChResult(x: unknown): ChGraderResult | null {
  if (!isObj(x)) return null;
  const s = x.scores as Record<string, unknown> | undefined;
  if (!isObj(s)) return null;
  
  // Check if Part A (practical writing) or Part B (creative writing)
  const isPartA = s['組織'] && !s['表達'];
  
  if (isPartA) {
    // Part A: 內容 /30, 組織 /20
    if (!isDomain(s['內容'], 30) || !isDomain(s['組織'], 20)) return null;
  } else {
    // Part B: 內容 /40, 表達 /30, 結構 /20, 標點 /10, 錯別字 /3
    if (!isDomain(s['內容'], 40) || !isDomain(s['表達'], 30) || !isDomain(s['結構'], 20) || !isDomain(s['標點'], 10)) return null;
    const wc = s['錯別字'];
    if (!isObj(wc) || typeof wc.score !== 'number') return null;
  }
  
  if (typeof x.total_score !== 'number') return null;
  if (!Array.isArray(x.paragraph_feedback)) (x as Record<string, unknown>).paragraph_feedback = [];
  if (!Array.isArray(x.level_up_tips)) (x as Record<string, unknown>).level_up_tips = [];
  if (typeof x.disclaimer !== 'string') {
    (x as Record<string, unknown>).disclaimer = '本AI評分僅供參考。';
  }
  return x as unknown as ChGraderResult;
}
