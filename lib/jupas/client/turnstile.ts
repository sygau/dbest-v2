// Minimal Turnstile helper. Production: invisible widget executes per-submit.
// Dev: returns '' — the worker bypasses verification when IS_PROD !== 'true'.
//
// Note: window.turnstile is also referenced by pages/translator.tsx with a
// different shape, so we don't add a global declaration here — we cast at use.

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (widgetId?: string) => void;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

function getApi(): TurnstileApi | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((window as any).turnstile ?? null) as TurnstileApi | null;
}

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || '';

let widgetId: string | undefined = undefined;

export function isTurnstileEnabled(): boolean {
  return !!SITEKEY;
}

export function ensureTurnstileWidget(container: HTMLElement | null): void {
  const api = getApi();
  if (!isTurnstileEnabled() || !container || widgetId || !api) return;
  widgetId = api.render(container, {
    sitekey: SITEKEY,
    size: 'invisible',
    appearance: 'execute',
  });
}

export async function getTurnstileToken(): Promise<string> {
  const api = getApi();
  if (!isTurnstileEnabled() || !api || !widgetId) return '';
  return new Promise(resolve => {
    const tryGet = (attempts = 0) => {
      const t = api.getResponse(widgetId);
      if (t) { resolve(t); return; }
      if (attempts > 50) { resolve(''); return; }
      setTimeout(() => tryGet(attempts + 1), 100);
    };
    api.reset(widgetId);
    api.execute(widgetId);
    tryGet();
  });
}
