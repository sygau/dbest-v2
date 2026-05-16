// Persists the most recent JUPAS calculation to localStorage so other pages
// (the bookmarks tab) can overlay the user's score/tier onto programme cards.
// Distinct from the per-profile sessionStorage cache in calculator.tsx: this is
// a single cross-page snapshot of "the last thing the user calculated".

import type { CalculateResponse } from './apiTypes';

const KEY = 'jupas:lastresult:v1';
const TTL_MS = 24 * 60 * 60 * 1000;

export function writeLastResult(data: CalculateResponse) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* quota — ignore */
  }
}

export function readLastResult(): CalculateResponse | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.t !== 'number' || Date.now() - parsed.t > TTL_MS) return null;
    return parsed.data as CalculateResponse;
  } catch {
    return null;
  }
}
