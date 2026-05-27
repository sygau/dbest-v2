// Groq API wrapper — JSON-mode for grading fallback.
// Used when ChatAnywhere fails (429, 502, timeout).

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export interface GroqChatMessage { role: 'system' | 'user'; content: string }

export interface GroqResult {
  ok: boolean;
  json?: unknown;
  raw?: string;
  error?: string;
  status?: number;
  provider?: 'groq';
}

export async function callGroq(opts: {
  apiKey: string;
  model: string;
  messages: GroqChatMessage[];
  temperature?: number;
  timeoutMs?: number;
}): Promise<GroqResult> {
  const { apiKey, model, messages, temperature = 0.3, timeoutMs = 60_000 } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const r = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    if (!r.ok) {
      const text = await r.text().catch(() => '');
      return { ok: false, error: `groq ${r.status}: ${text.slice(0, 200)}`, status: r.status, provider: 'groq' };
    }

    const data = await r.json() as { choices?: { message?: { content?: string } }[] };
    const raw = data.choices?.[0]?.message?.content?.trim() ?? '';
    if (!raw) return { ok: false, error: 'empty response', provider: 'groq' };

    // Strip accidental markdown fences
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    try {
      return { ok: true, json: JSON.parse(cleaned), raw: cleaned, provider: 'groq' };
    } catch {
      return { ok: false, error: 'JSON parse fail', raw: cleaned, provider: 'groq' };
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg, provider: 'groq' };
  } finally {
    clearTimeout(timer);
  }
}
