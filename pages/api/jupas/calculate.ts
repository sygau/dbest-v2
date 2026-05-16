import type { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit, verifyTurnstile } from '@/lib/jupas/scoring/antiAbuse';
import { ANTI_ABUSE, CORS_ALLOWED_ORIGINS } from '@/lib/jupas/scoring/config';
import { scoreAll } from '@/lib/jupas/scoring/engine';
import { validateProfile } from '@/lib/jupas/scoring/validate';

function applyCors(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  if (origin && CORS_ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (process.env.IS_PROD !== 'true') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', `content-type, ${ANTI_ABUSE.turnstile.headerName}`);
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // Rate limit first — cheaper than Turnstile siteverify roundtrip.
  const rl = await rateLimit(req);
  if (!rl.ok) return res.status(rl.status ?? 429).json({ error: rl.error });

  const turnstile = await verifyTurnstile(req);
  if (!turnstile.ok) return res.status(turnstile.status ?? 403).json({ error: turnstile.error });

  const validation = validateProfile(req.body);
  if (!validation.ok) return res.status(400).json({ error: validation.error });

  try {
    const out = scoreAll(validation.profile);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(out);
  } catch (e) {
    console.error('[jupas/calculate]', e);
    return res.status(500).json({ error: 'engine failure' });
  }
}
