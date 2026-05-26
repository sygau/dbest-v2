import { DAILY_QUOTA, type Subject } from '../constants';

function utcDate(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function key(subject: Subject) {
  return `grader:quota:${utcDate()}:${subject}`;
}

export function readLocalQuotaUsed(subject: Subject): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem(key(subject)) ?? '0', 10) || 0;
  } catch { return 0; }
}

export function bumpLocalQuota(subject: Subject): number {
  if (typeof window === 'undefined') return 0;
  try {
    const next = readLocalQuotaUsed(subject) + 1;
    localStorage.setItem(key(subject), String(next));
    return next;
  } catch { return 0; }
}

export function syncLocalQuotaFromServer(subject: Subject, remaining: number) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key(subject), String(DAILY_QUOTA - remaining));
  } catch { /* ignore */ }
}

export function quotaLeft(subject: Subject): number {
  return Math.max(0, DAILY_QUOTA - readLocalQuotaUsed(subject));
}
