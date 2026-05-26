// Thin ChatAnywhere (OpenAI-compatible) wrapper. JSON-mode forced.

const ENDPOINT = 'https://api.chatanywhere.org/v1/chat/completions';

export interface ChatMessage { role: 'system' | 'user'; content: string }

export interface ChatResult {
  ok: boolean;
  json?: unknown;
  raw?: string;
  error?: string;
  status?: number;
}

export async function callGrader(opts: {
  apiKey: string;
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  timeoutMs?: number;
}): Promise<ChatResult> {
  const { apiKey, model, messages, temperature = 0.3, timeoutMs = 60_000 } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const r = await fetch(ENDPOINT, {
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
      return { ok: false, error: `upstream ${r.status}: ${text.slice(0, 200)}`, status: r.status };
    }

    const data = await r.json() as { choices?: { message?: { content?: string } }[] };
    const raw = data.choices?.[0]?.message?.content?.trim() ?? '';
    if (!raw) return { ok: false, error: 'empty response' };

    // Strip accidental markdown fences if model ignores response_format.
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    try {
      return { ok: true, json: JSON.parse(cleaned), raw: cleaned };
    } catch {
      return { ok: false, error: 'JSON parse fail', raw: cleaned };
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  } finally {
    clearTimeout(timer);
  }
}
