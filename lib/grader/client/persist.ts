// SessionStorage persistence for grader inputs + last result.
// Survives reload, clears on tab close.

import type { ChGraderResult, EnGraderResult } from '../types';
import type { Subject } from '../constants';

const KEY = (s: Subject) => `grader:state:v1:${s}`;

export interface EnglishState {
  task: string;
  essay: string;
  part: 'A' | 'B' | 'unspecified';
  essayType: string;
  responseLang: 'en' | 'zh';
  result: EnGraderResult | null;
}

export interface ChineseState {
  task: string;
  essay: string;
  part: 'A' | 'B';
  essayType: string;
  result: ChGraderResult | null;
}

export function loadState<T>(subject: Subject): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY(subject));
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch { return null; }
}

export function saveState<T>(subject: Subject, state: T) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(KEY(subject), JSON.stringify(state));
  } catch { /* quota or serialize fail */ }
}

export function clearState(subject: Subject) {
  if (typeof window === 'undefined') return;
  try { sessionStorage.removeItem(KEY(subject)); } catch { /* ignore */ }
}
