# AI Writing Grader (English + Chinese)

Two free AI essay graders for HKDSE Paper 2:
- `/grader/english` — Content/Language/Organisation 0–7 each → 21 max
- `/grader/chinese` — 內容40 + 表達30 + 結構20 + 標點10 + 錯別字3

## Stack
- Model: ChatAnywhere `gpt-4o`, JSON response mode forced
- Hosting: this repo as Next.js API route on CF Workers (via OpenNext)
- Per-IP daily quota: Cloudflare KV (`GRADER_KV`), 2/day per subject, 36h TTL
- Burst protection: existing `RATE_LIMITER` binding (30/60s)
- Bot protection: Cloudflare Turnstile (invisible widget) via `cf-turnstile-token` header

## Key Files
- API: `pages/api/grader/english.ts`, `pages/api/grader/chinese.ts`
- Pages: `pages/grader/english.tsx`, `pages/grader/chinese.tsx`
- Server lib: `lib/grader/server/` (sanitize, prompts, chatanywhere, quota, turnstile, schema, context)
- Client lib: `lib/grader/client/` (quota, leaveGuard)
- Shared: `lib/grader/types.ts`, `lib/grader/constants.ts`, `lib/grader/wordCount.ts`
- Components: `components/grader/` (EssayInput, DomainScore, ResultCard, GraderLoading, GuideCard, QuotaBanner, styles)
- FAQ: `data/faqs/pages.ts` keys `grader-english`, `grader-chinese`
- JSON-LD: `data/jsonld/pages.ts` same keys

## Secrets / Env

### Local dev (`npm run dev`)
Next.js dev server reads `.env.local` / `.env`. Add:
```
CHATANYWHERE_API_KEY=sk-...
TURNSTILE_SECRET=0x...
NEXT_PUBLIC_TURNSTILE_SITEKEY=0x...
```
Without these, API returns `AI service not configured` (CF Worker bindings are unreachable from Next dev).

### Wrangler dev (`wrangler dev` against `.open-next/worker.js`)
Create `.dev.vars` (gitignored) with same KEY=VALUE lines.

### Production (CF Workers via OpenNext)
- `wrangler secret put CHATANYWHERE_API_KEY` (sk-... key)
- `wrangler secret put TURNSTILE_SECRET` (Turnstile server secret)
- `NEXT_PUBLIC_TURNSTILE_SITEKEY` set as plain var in `wrangler.jsonc` `vars`
- KV namespace `GRADER_KV` id `36267380ed8644198642326e9cd9345b` (already bound)

## Output Schema (richer than v1 spec)
Beyond the basic 3/5 domain scores, every response now includes:
- `paragraph_feedback[]` — per-paragraph role (Intro/Body/Conclusion or 起承轉合) + comment + rating
- `level_up_tips[]` — 2-3 concrete impact-ranked actions
- `error_examples[]` on Language/表達 — original + corrected + type + explanation
- `vocabulary_suggestions[]` — weak word → stronger alternatives + context
- Chinese-only: `修辭運用[]` (devices used + effectiveness), `錯別字.examples[]` with context

## Anti-Abuse Layers
1. Turnstile invisible widget
2. CF RATE_LIMITER 30/60s
3. CF KV daily 2/IP/subject
4. 24KB body cap + 32KB body parser cap
5. Word/char min+max + charset ratio sanity
6. Prompt-injection regex strip + `<essay>` wrapping + system prompt guardrail
7. localStorage UX hint (front-loaded quota display)
8. `beforeunload` guard during loading

## UX
- 16px input font (iOS no-zoom)
- Submit disabled below min / above max / when quota=0 / during cooldown
- 5s cooldown + 60s cooldown on rate-limit hit
- Toast-free: inline alert banner for errors
- iPad-first responsive grid for domain cards

## Known Limits / TODO
- No essay caching by hash (each submission burns quota even if identical)
- No bookmarked past results (no auth)
- No OCR for handwritten essays (skipped v1)
- English feedback language toggle only; Chinese tool feedback is always Chinese
- Server enforces totals/level server-side; ignores model-supplied conflicting fields

## Costs (estimate)
gpt-4o ≈ $2.50/M input + $10/M output. One grade ≈ 2k input + 1.5k output tokens ≈ $0.02. 2/day × 500 users = $20/day at peak.
