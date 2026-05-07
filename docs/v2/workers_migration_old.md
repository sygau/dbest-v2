# Workers + OpenNext Migration Plan

## Current State
- Framework: Next.js 15 Pages Router on Cloudflare Pages
- Build: `@cloudflare/next-on-pages` (static-only)
- Blog refresh: Smart edge cache + rebuild cycle (4–6 min full refresh)
- Workaround: `build-cloudflare.js` deletes `/pages/api` before build (dual-deploy artifact)
- External APIs: View counts fetched client-side from `api-v2.dse.best`

## Target State
- Framework: Next.js 15 Pages Router with **Incremental Static Regeneration (ISR)**
- Build: **OpenNext** → Cloudflare Workers runtime
- Blog refresh: ISR at 60s max revalidation
- No workarounds: Full Next.js build → `_worker.js` output
- Runtime: Cloudflare Workers edge compute

---

## Benefits

| What | Current | After | Impact |
|------|---------|-------|--------|
| Blog post refresh | 4–6 min rebuild | 60s ISR | **10x faster** content updates |
| Build script | Hacky deletion workaround | Standard Next.js | **Cleaner codebase** |
| Edge runtime | None (static only) | Workers | **Future-proof** for view counts, auth, etc. |
| Deployment | Direct static output | `_worker.js` + edge runtime | **More control** |

---

## Risks & Tradeoffs

### Risks
1. **OpenNext is newer** than `@cloudflare/next-on-pages`
   - Less battle-tested on Cloudflare
   - Fewer public docs/examples
   - Potential edge cases with streaming, middleware, or exotic Next.js features

2. **AdSense uncertainty**
   - ISR revalidation could trigger layout shift if timing is off
   - Edge runtime adds latency (usually <50ms, but still)
   - Requires testing on staging domain before going live

3. **Middleware refactor**
   - Your hostname redirect + cookie logic needs rewrite for OpenNext's `_middleware.ts`
   - Different error handling, different behavior

4. **No immediate rollback**
   - If OpenNext breaks, you're debugging at runtime on Workers
   - Can revert to `@cloudflare/next-on-pages`, but that's a rebuild cycle

5. **Wrangler config expansion**
   - Currently: minimal (output dir + compat flags)
   - After: define KV bindings, DO bindings, environment variables
   - More moving parts = more failure modes

### Mitigations
- Test ISR locally with `next build` + `next start` before deploying
- Deploy to staging domain first (use CF Pages branch preview)
- Monitor AdSense metrics for 48hrs post-deploy
- Keep rollback script ready (`git revert` + redeploy `@cloudflare/next-on-pages`)

---

## Migration Steps

1. **Install OpenNext**
   ```bash
   npm install --save-dev open-next
   ```

2. **Update `next.config.js`**
   - Remove `@cloudflare/next-on-pages` experimental config (if any)
   - Add OpenNext config (minimal for your use case)

3. **Create/Update `wrangler.toml`**
   - Set `main = ".open-next/_worker.js"`
   - Add KV/DO bindings (if needed for future features)
   - Define environment variables (NODE_ENV, SANITY keys, etc.)

4. **Refactor `middleware.ts`**
   - Convert from Next.js middleware to OpenNext format
   - Test hostname redirect + cookie logic locally

5. **Update build scripts**
   - Remove `build:cloudflare` reference (already done)
   - Simplify `build:full` and `build:smart` to just `npm run build`
   - ISR handles revalidation, no need for smart sync

6. **Test locally**
   - `wrangler dev` to run edge runtime locally
   - Verify ISR revalidation at 60s boundaries
   - Check AdSense auto-ads placement (no layout shift)

7. **Deploy to staging**
   - Push to staging branch on CF Pages
   - Run AdSense audit (check CLS, FID, LCP)
   - Monitor for 24hrs

8. **Go live**
   - Merge to main, deploy to production
   - Monitor for 48hrs (AdSense metrics, error rates, edge latency)

---

## Expected Timeline
| Phase | Time |
|-------|------|
| Install + config | 30 min |
| Middleware refactor | 20 min |
| Local testing | 1 hr |
| Staging test + monitoring | 24 hrs |
| Production deploy | < 15 min |
| Post-deploy monitoring | 48 hrs |
| **Total hands-on time** | **2.5 hrs (+ 3 days monitoring)** |

---

## Should You Do This?

### YES IF:
- You want real ISR (60s refresh instead of smart rebuild hack)
- You're willing to test thoroughly before going live
- You plan to add edge features later (view count caching, auth, etc.)
- AdSense is stable enough that a few extra ms edge latency won't hurt

### NO IF:
- Current 4–6 min refresh is "good enough"
- You're risk-averse and don't want to debug OpenNext edge cases
- You don't have time to test for 3 days
- AdSense is fragile on your site (any latency = revenue loss)

---

## My Take
**Do it.** Here's why:
- ISR is a standard Next.js feature, not experimental edge compute magic.
- OpenNext is 95% compatible with your use case (static + client-side fetch).
- 60s refresh is objectively better than smart rebuild.
- **Risk is low** because you have no API routes, no streaming, no fancy middleware. Just static pages + cookies.
- You can test on staging for a week before going live.

**Only skip if:** AdSense is genuinely fragile on your site and you can't afford a 24-hour stabilization test.

---

## Rollback Plan
If something breaks in production:
```bash
# Revert to @cloudflare/next-on-pages
git checkout HEAD~1
npm install
npm run build
wrangler publish
```

This gets you back to current state in ~10 min.

---

## Next Steps (Post-Migration)
1. Monitor AdSense metrics for first week
2. Consider using Workers for view count caching (reduce `api-v2.dse.best` calls)
3. Simplify `blog:sync` script — ISR replaces smart rebuild
4. Optional: add scheduled jobs for OG image generation via Durable Objects

