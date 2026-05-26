import type { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit } from '@/lib/jupas/scoring/antiAbuse';
import { clientIp, getCfEnv, isDev, readSecret } from '@/lib/grader/server/context';
import { verifyTurnstile } from '@/lib/grader/server/turnstile';
import { checkAndIncrement } from '@/lib/grader/server/quota';
import { sanitiseTask, validateChinese } from '@/lib/grader/server/sanitize';
import { chinesePrompt } from '@/lib/grader/server/prompts';
import { callGrader } from '@/lib/grader/server/chatanywhere';
import { validateChResult } from '@/lib/grader/server/schema';
import { chLevelFromTotal } from '@/lib/grader/constants';
import { GRADER_CONFIG, limitsDisabled } from '@/lib/grader/config';
import type { GraderApiError } from '@/lib/grader/types';

interface Body {
  essay?: string;
  task?: string;
  essayType?: string;
  part?: 'A' | 'B';
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
      if (!ok) return err(res, 403, { error: '驗證失敗，請刷新頁面後再試', code: 'turnstile' });
    }
  }

  const body = (req.body ?? {}) as Body;
  const part = (body.part === 'A' || body.part === 'B') ? body.part : 'B';
  const essayType = typeof body.essayType === 'string' && body.essayType.trim() ? body.essayType.trim().slice(0, 20) : (part === 'A' ? '書信' : 'auto');

  const v = validateChinese(body.essay ?? '');
  if (!v.ok) return err(res, 400, { error: v.reason, code: 'validation' });
  const task = sanitiseTask(body.task);

  const ip = clientIp(req);
  const quota = await checkAndIncrement(env.GRADER_KV, 'chinese', ip);
  if (!quota.allowed) {
    return err(res, 429, { error: '今日批改次數已用完，請明天再試', code: 'quota', quota_left: 0 });
  }

  const apiKey = readSecret(env, 'CHATANYWHERE_API_KEY');
  if (!apiKey) {
    console.error('[grader/chinese] CHATANYWHERE_API_KEY missing — checked env binding + process.env. Add to .env.local for npm run dev, .dev.vars for wrangler dev, or wrangler secret put for prod.');
    return err(res, 500, { error: 'AI 服務未設定 — 請喺 .env.local 加入 CHATANYWHERE_API_KEY 並重啟 npm run dev', code: 'upstream' });
  }

  const ai = await callGrader({
    apiKey,
    model: GRADER_CONFIG.MODEL.chinese,
    messages: [
      { role: 'system', content: chinesePrompt({ part, essayType, task }) },
      { role: 'user', content: `<essay>\n${v.clean}\n</essay>` },
    ],
    temperature: 0.25,
  });

  if (!ai.ok || !ai.json) {
    console.error('[grader/chinese] upstream', ai.error);
    return err(res, 502, { error: 'AI 批改失敗，請重試', code: ai.error?.includes('parse') ? 'parse' : 'upstream' });
  }

  if (typeof (ai.json as Record<string, unknown>).error === 'string') {
    return err(res, 400, { error: String((ai.json as Record<string, unknown>).error), code: 'validation' });
  }

  const parsed = validateChResult(ai.json);
  if (!parsed) {
    console.error('[grader/chinese] schema mismatch', ai.raw?.slice(0, 200));
    return err(res, 502, { error: 'AI 回應格式錯誤，請重試', code: 'parse' });
  }

  const s = parsed.scores as Record<string, any>;
  const isPartA = part === 'A' || (s['組織'] && !s['表達']);
  
  let total = 0;
  if (isPartA) {
    total = ((s['內容'] as any)?.score ?? 0) + ((s['組織'] as any)?.score ?? 0);
    (parsed as any).total_max = 50;
  } else {
    total = ((s['內容'] as any)?.score ?? 0) + ((s['表達'] as any)?.score ?? 0) + ((s['結構'] as any)?.score ?? 0) + ((s['標點'] as any)?.score ?? 0) + ((s['錯別字'] as any)?.score ?? 0);
    (parsed as any).total_max = 103;
  }
  
  parsed.total_score = total;
  const lvl = chLevelFromTotal(total, parsed.total_max);
  parsed.dse_level = lvl.level;
  parsed.grade_band = parsed.grade_band || lvl.band;
  if (!parsed.word_count_estimate) parsed.word_count_estimate = v.meta.chars ?? 0;

  // Enforce historical ceiling: Chinese Part B rarely exceeds 85/103 in 14 years
  if (parsed.total_score >= 85) {
    (parsed as any).total_score = 83;
    const adjLvl = chLevelFromTotal(83, 103);
    parsed.dse_level = adjLvl.level;
    parsed.grade_band = adjLvl.band;
    parsed.overall_comment = `[已校準] ${parsed.overall_comment || ''}。根據 DSE 14 年歷史數據，創意寫作卷二極少達 85+ 分，分數已調整至 83 以符合實際分布。`;
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ...parsed, _quota_remaining: quota.remaining });
}

export const config = { api: { bodyParser: { sizeLimit: '32kb' } } };
