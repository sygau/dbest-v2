// Helpers for grabbing CF Worker bindings + client IP from a Next API request.

import type { NextApiRequest } from 'next';

export interface CfEnv {
  GRADER_KV?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
  RATE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
  CHATANYWHERE_API_KEY?: string;
  TURNSTILE_SECRET?: string;
  IS_PROD?: string;
}

export function clientIp(req: NextApiRequest): string {
  return (
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export function isDev(): boolean {
  return process.env.IS_PROD !== 'true';
}

export async function getCfEnv(): Promise<CfEnv> {
  try {
    const mod = (await import('@opennextjs/cloudflare')) as unknown as {
      getCloudflareContext: () => { env: CfEnv };
    };
    return mod.getCloudflareContext().env ?? {};
  } catch {
    return {};
  }
}

export function readSecret(env: CfEnv, name: 'CHATANYWHERE_API_KEY' | 'TURNSTILE_SECRET'): string | undefined {
  return env[name] || process.env[name];
}
