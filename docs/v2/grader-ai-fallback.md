# Grader AI Fallback System

Smart fallback mechanism for the AI Writing Grader. Tries ChatAnywhere (GPT-4o) first, automatically falls back to Groq models on failure.

---

## Architecture

```
┌─────────────────────────────────────────┐
│  API Request (English or Chinese)       │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  callGraderWithFallback()               │
└────────┬────────────────────────────────┘
         │
         ├─▶ Try ChatAnywhere (gpt-4o)
         │   ├─ Success? ──▶ Return JSON result
         │   └─ Fail? ──────┐
         │                  ▼
         │          Is retryable? (429, 502, 503, timeout)
         │                  │
         │         Yes ─────┤
         │                  ▼
         │          Try Groq fallback (llama-3.1-8b-instant)
         │                  ├─ Success? ──▶ Return JSON result
         │                  └─ Fail? ──────▶ Return ChatAnywhere error
         │
         └─▶ If no ChatAnywhere key, try Groq directly
```

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/grader/server/groq.ts` | Groq API wrapper (OpenAI-compatible) |
| `lib/grader/server/graderWithFallback.ts` | Smart retry logic & provider selection |
| `lib/grader/config.ts` | MODEL (ChatAnywhere) + GROQ_MODEL config |
| `lib/grader/server/context.ts` | Reads `GROQ_API_KEY` from env |
| `pages/api/grader/english.ts` | Updated to use `callGraderWithFallback()` |
| `pages/api/grader/chinese.ts` | Updated to use `callGraderWithFallback()` |

---

## Configuration

### Environment Variables

Add to `.env.local` (dev) or wrangler secrets (prod):

```bash
# Primary provider (existing)
CHATANYWHERE_API_KEY=sk-xxx...

# Fallback provider (new)
GROQ_API_KEY=gsk_...
```

### Model Selection

Edit `lib/grader/config.ts`:

```typescript
MODEL: {
  english: 'gpt-4o',
  chinese: 'gpt-4o',
},

GROQ_MODEL: {
  english: 'llama-3.1-8b-instant',   // 30 req/min, 14.4k/day limit
  chinese: 'llama-3.1-8b-instant',
},
```

**Available Groq Models** (with limits):

| Model | Req/Min | Daily | Tokens/Min | Quality | Notes |
|-------|---------|-------|-----------|---------|-------|
| `llama-3.1-8b-instant` | 30 | 14.4K | 6K | Good | **Recommended** — high daily limit |
| `llama-3.3-70b-versatile` | 30 | 1K | 12K | Better | Lower daily limit, better quality |
| `qwen/qwen3-32b` | 60 | 1K | 6K | Good | 60 req/min (best throughput) |
| `meta-llama/llama-4-scout-17b-16e-instruct` | 30 | 1K | 30K | Fair | Newer model, lower token limit |

---

## Fallback Triggers

The system automatically falls back to Groq when ChatAnywhere encounters:

- **429** (Rate Limit) — quota exceeded
- **502** (Bad Gateway) — service temporarily unavailable
- **503** (Service Unavailable) — maintenance or overload
- **Timeout** — request takes >60s
- **Network Abort** — connection lost

Other errors (400, 403, 404) do **not** trigger fallback (user/config errors).

---

## Error Handling

### Scenario 1: Both Providers Available

```
ChatAnywhere fails with 502
  ↓
Try Groq fallback
  ├─ Succeeds → Return Groq result ✓
  └─ Fails → Return ChatAnywhere error (first attempt)
```

### Scenario 2: Only ChatAnywhere

```
ChatAnywhere fails
  ├─ Retryable error (429, 502, 503) → Try Groq (if available) or fail
  └─ Non-retryable error (400, 403) → Return error immediately
```

### Scenario 3: Only Groq

If `CHATANYWHERE_API_KEY` is not set, Groq is used directly.

---

## Logging

Added to server console for monitoring:

```typescript
[grader] ChatAnywhere failed (502): upstream 502: Service overloaded
[grader] Falling back to Groq (llama-3.1-8b-instant) after ChatAnywhere error
[grader] Groq fallback succeeded with llama-3.1-8b-instant
[grader] Both ChatAnywhere and Groq failed. ChatAnywhere: ..., Groq: ...
```

---

## Cost Implications

### Pricing (approx. as of 2026)

| Provider | Input | Output | Per Grade |
|----------|-------|--------|-----------|
| ChatAnywhere (GPT-4o) | $2.50/M | $10/M | ~$0.02 |
| Groq (Llama-3.1-8b) | Free | Free | $0.00 |

**Impact**: If Groq fallback is used 10–20% of the time, overall cost ↓ 10–20%.

### Rate Limits & Quota

- **ChatAnywhere**: Controlled by ChatAnywhere (typically generous)
- **Groq**: 14.4k requests/day (llama-3.1-8b), shared across all users
  - At 2 req/student × 500 students/day = 1000 req/day within Groq limit ✓
  - Heavy traffic may exhaust Groq quota faster; prioritize Groq for retries

---

## Testing Locally

### Test Fallback Behavior

```bash
# 1. Start dev server with both keys
npm run dev

# 2. (Optional) Simulate ChatAnywhere failure
#    Edit GRADER_CONFIG.MODEL.english = 'nonexistent-model'
#    Should fall back to Groq

# 3. Test without ChatAnywhere key
#    Remove CHATANYWHERE_API_KEY from .env.local
#    Should use Groq directly
```

### Test Groq Model Quality

Compare results between:
- `llama-3.1-8b-instant` (fast, cheaper, 8B params)
- `llama-3.3-70b-versatile` (slower, better quality, 70B params)

Switch in `config.ts`, test manually.

---

## Deployment

### Wrangler Secrets (Prod)

```bash
# Add both keys
wrangler secret put CHATANYWHERE_API_KEY
wrangler secret put GROQ_API_KEY

# Deploy
npm run build:worker
wrangler deploy
```

### Monitoring

Watch server logs for fallback usage:
- Healthy: Mostly ChatAnywhere, rare Groq fallbacks
- Issues: Frequent Groq fallbacks → ChatAnywhere overloaded or misconfigured

---

## Future Improvements

1. **Multi-model fallback chain**: Add a 3rd provider (e.g., Claude via Anthropic)
2. **Per-model cost tracking**: Log which provider was used for cost analysis
3. **Adaptive model selection**: Use faster model for high-load periods, better model during off-peak
4. **User feedback loop**: Track which provider produced better grades
5. **Quota prediction**: Alert when Groq quota is running low

---

## Troubleshooting

### Both providers fail

Check logs:
- ChatAnywhere API key valid? (`CHATANYWHERE_API_KEY`)
- Groq API key valid? (`GROQ_API_KEY`)
- Network/firewall allowing `https://api.chatanywhere.org` and `https://api.groq.com`?

### Groq results differ from ChatAnywhere

Expected. Different models produce different feedback. Validate quality manually before rolling out.

### High fallback rate

- ChatAnywhere service degraded?
- Rate limit being hit?
- Check response times and error codes in logs

---

## References

- [Groq API Docs](https://console.groq.com/docs)
- [ChatAnywhere Docs](https://docs.chatanywhere.org)
- Original grader doc: `docs/v2/ai-grader.md`
- Config: `lib/grader/config.ts`
