// Anti-abuse for /api/jupas/calculate.
// Both checks bypassed when IS_PROD !== 'true' so local dev works without setup.
//
// Turnstile: verifies token submitted in `cf-turnstile-token` header.
// Rate limit: Cloudflare Workers Rate Limiting binding (defined in wrangler.jsonc).

import type { NextApiRequest } from 'next';
import { ANTI_ABUSE } from './config';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface AbuseCheckResult {
  ok: boolean;
  status?: number;          // suggested HTTP status to send back
  error?: string;
}

export function isDev(): boolean {
  return process.env.IS_PROD !== 'true';
}

function clientIp(req: NextApiRequest): string {
  return (
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function verifyTurnstile(req: NextApiRequest): Promise<AbuseCheckResult> {
  if (isDev() || !ANTI_ABUSE.turnstile.enabled) return { ok: true };
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.error('[antiAbuse] TURNSTILE_SECRET not configured');
    return { ok: false, status: 500, error: 'turnstile not configured' };
  }
  const token = req.headers[ANTI_ABUSE.turnstile.headerName] as string | undefined;
  if (!token) return { ok: false, status: 401, error: 'missing turnstile token' };

  const body = new URLSearchParams({ secret, response: token, remoteip: clientIp(req) });
  const r = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
  if (!r.ok) return { ok: false, status: 502, error: 'turnstile verify upstream failed' };
  const data = (await r.json()) as { success: boolean; 'error-codes'?: string[] };
  if (!data.success) return { ok: false, status: 403, error: 'turnstile rejected' };
  return { ok: true };
}

// Cloudflare Rate Limiting binding shape.
interface RateLimiter {
  limit(opts: { key: string }): Promise<{ success: boolean }>;
}

export async function rateLimit(req: NextApiRequest): Promise<AbuseCheckResult> {
  if (isDev() || !ANTI_ABUSE.rateLimit.enabled) return { ok: true };
  // OpenNext exposes Cloudflare bindings on globalThis under the worker env.
  // Access lazily so importing this module doesn't crash outside CF.
  let env: Record<string, unknown> | undefined;
  try {
    const mod = (await import('@opennextjs/cloudflare')) as unknown as {
      getCloudflareContext: (opts?: { async?: boolean }) => { env: Record<string, unknown> };
    };
    env = mod.getCloudflareContext().env;
  } catch {
    return { ok: true }; // not in worker runtime — skip
  }
  const limiter = env?.[ANTI_ABUSE.rateLimit.bindingName] as RateLimiter | undefined;
  if (!limiter) {
    console.warn('[antiAbuse] RATE_LIMITER binding missing — skipping');
    return { ok: true };
  }
  const key = clientIp(req);
  const r = await limiter.limit({ key });
  if (!r.success) return { ok: false, status: 429, error: 'rate limit exceeded' };
  return { ok: true };
}
