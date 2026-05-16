// Bookmark store for JUPAS programmes. We persist a list of JS codes (not
// scored results) — a student's predicted grades change over time, so the
// watchlist must survive re-calculation. localStorage, client-only.

import { useEffect, useState } from 'react';

const STAR_KEY = 'jupas:starred:v1';
const EVENT = 'jupas:bookmarks';

export function getStarred(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STAR_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

function write(codes: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STAR_KEY, JSON.stringify(codes));
  } catch {
    /* quota — ignore */
  }
  // Notify same-tab listeners (the native `storage` event only fires cross-tab).
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function isStarred(code: string): boolean {
  return getStarred().includes(code);
}

export function toggleStar(code: string): boolean {
  const cur = getStarred();
  const next = cur.includes(code) ? cur.filter(c => c !== code) : [...cur, code];
  write(next);
  return next.includes(code);
}

// React hook — SSR-safe (empty until mounted, avoids hydration mismatch).
export function useBookmarks() {
  const [starred, setStarred] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => setStarred(new Set(getStarred()));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    starred,
    count: starred.size,
    toggle: (code: string) => toggleStar(code),
    isStarred: (code: string) => starred.has(code),
  };
}
