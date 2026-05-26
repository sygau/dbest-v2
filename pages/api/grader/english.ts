import type { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit } from '@/lib/jupas/scoring/antiAbuse';
import { clientIp, getCfEnv, isDev, readSecret } from '@/lib/grader/server/context';
import { verifyTurnstile } from '@/lib/grader/server/turnstile';
import { checkAndIncrement } from '@/lib/grader/server/quota';
import { sanitiseTask, validateEnglish } from '@/lib/grader/server/sanitize';
import { englishPrompt } from '@/lib/grader/server/prompts';
import { callGrader } from '@/lib/grader/server/chatanywhere';
import { validateEnResult } from '@/lib/grader/server/schema';
import { enLevelFromTotal } from '@/lib/grader/constants';
import { GRADER_CONFIG, limitsDisabled } from '@/lib/grader/config';
import type { GraderApiError } from '@/lib/grader/types';

interface Body {
  essay?: string;
  task?: string;
  part?: 'A' | 'B' | 'unspecified';
  essayType?: string;          // 'auto' or specific
  responseLang?: 'en' | 'zh';
}

function err(res: NextApiResponse, status: number, body: GraderApiError) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return err(res, 405, { error: 'POST only', code: 'method' });

  const env = await getCfEnv();
  const disabled = limitsDisabled();

  if (!disabled) {
    const rl = await rateLimit(req);
    if (!rl.ok) return err(res, 429, { error: rl.error || 'rate limited', code: 'rate' });

    const turnstileSecret = readSecret(env, 'TURNSTILE_SECRET');
    if (!isDev()) {
      const token = req.headers['cf-turnstile-token'] as string | undefined;
      const ok = await verifyTurnstile(token, turnstileSecret, clientIp(req));
      if (!ok) return err(res, 403, { error: 'Verification failed', code: 'turnstile' });
    }
  }

  const body = (req.body ?? {}) as Body;
  const part = (body.part === 'A' || body.part === 'B') ? body.part : 'unspecified';
  const essayType = typeof body.essayType === 'string' && body.essayType.trim() ? body.essayType.trim().slice(0, 40) : 'auto';
  const responseLang: 'en' | 'zh' = body.responseLang === 'zh' ? 'zh' : 'en';

  const v = validateEnglish(body.essay ?? '', part);
  if (!v.ok) return err(res, 400, { error: v.reason, code: 'validation' });
  const task = sanitiseTask(body.task);

  const ip = clientIp(req);
  const quota = await checkAndIncrement(env.GRADER_KV, 'english', ip);
  if (!quota.allowed) {
    return err(res, 429, { error: 'Daily limit reached. Try again tomorrow.', code: 'quota', quota_left: 0 });
  }

  const apiKey = readSecret(env, 'CHATANYWHERE_API_KEY');
  if (!apiKey) {
    console.error('[grader/english] CHATANYWHERE_API_KEY missing — checked env binding + process.env. Add to .env.local for npm run dev, .dev.vars for wrangler dev, or wrangler secret put for prod.');
    return err(res, 500, { error: 'AI service not configured (set CHATANYWHERE_API_KEY in .env.local then restart npm run dev)', code: 'upstream' });
  }

  const ai = await callGrader({
    apiKey,
    model: GRADER_CONFIG.MODEL.english,
    messages: [
      { role: 'system', content: englishPrompt({ part, essayType, responseLang, task }) },
      { role: 'user', content: `<essay>\n${v.clean}\n</essay>` },
    ],
    temperature: 0.25,
  });

  if (!ai.ok || !ai.json) {
    console.error('[grader/english] upstream', ai.error);
    return err(res, 502, { error: 'AI failed to grade. Please retry.', code: ai.error?.includes('parse') ? 'parse' : 'upstream' });
  }

  // Surface graceful refusal from the model itself.
  if (typeof (ai.json as Record<string, unknown>).error === 'string') {
    return err(res, 400, { error: String((ai.json as Record<string, unknown>).error), code: 'validation' });
  }

  const parsed = validateEnResult(ai.json);
  if (!parsed) {
    console.error('[grader/english] schema mismatch', ai.raw?.slice(0, 200));
    return err(res, 502, { error: 'AI returned malformed result. Please retry.', code: 'parse' });
  }

  // Enforce derived fields server-side (defence against hallucinated totals/levels).
  const total = parsed.scores.content.score + parsed.scores.language.score + parsed.scores.organisation.score;
  parsed.total_score = total;
  parsed.total_max = 21;
  parsed.dse_level = enLevelFromTotal(total);
  parsed.response_lang = responseLang;
  parsed.part = part;
  if (!parsed.word_count_estimate) parsed.word_count_estimate = v.meta.words ?? 0;

  // High-score transparency: 20–21 is rare but possible in English writing.
  // AI self-audited above 18 per prompt instructions. Mark for user awareness.
  if (total >= 20) {
    (parsed as any)._high_score_flagged = true;
    (parsed as any)._audit_note = 'This score is exceptionally high. AI has self-audited. Grade reflects potential 5** work, but verify against real DSE benchmarks.';
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ...parsed, _quota_remaining: quota.remaining });
}

export const config = { api: { bodyParser: { sizeLimit: '32kb' } } };
