// Per-IP daily quota backed by Cloudflare KV (GRADER_KV binding).
// Skipped when limits disabled OR KV unbound (e.g. local dev without wrangler).

import { dailyQuotaFor, type Subject } from '../constants';
import { limitsDisabled } from '../config';

interface KVLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

function utcDate(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function quotaKey(subject: string, ip: string): string {
  return `grader:${subject}:${ip}:${utcDate()}`;
}

export interface QuotaResult {
  allowed: boolean;
  used: number;
  remaining: number;
}

export async function checkAndIncrement(kv: KVLike | null | undefined, subject: Subject, ip: string): Promise<QuotaResult> {
  const max = dailyQuotaFor(subject);
  if (limitsDisabled()) return { allowed: true, used: 0, remaining: max };
  if (!kv) return { allowed: true, used: 0, remaining: max };

  const key = quotaKey(subject, ip);
  const current = parseInt((await kv.get(key)) ?? '0', 10) || 0;
  if (current >= max) {
    return { allowed: false, used: current, remaining: 0 };
  }
  await kv.put(key, String(current + 1), { expirationTtl: 60 * 60 * 36 });
  return { allowed: true, used: current + 1, remaining: max - current - 1 };
}

export async function peekQuota(kv: KVLike | null | undefined, subject: string, ip: string): Promise<number> {
  if (!kv) return 0;
  const current = parseInt((await kv.get(quotaKey(subject, ip))) ?? '0', 10) || 0;
  return current;
}
