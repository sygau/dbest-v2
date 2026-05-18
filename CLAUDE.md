# dse.best — Claude Working Guide

Hong Kong DSE educational platform. Next.js 15 Pages Router on Cloudflare Workers (via OpenNext). Solo 18yo dev. Primary revenue = AdSense.

---

## Hard Constraints

### AdSense-First Navigation
- No SPA behavior. Every route must be a full page load.
- Minimize hydration errors and layout shift — they break Auto Ads placement.

### Cloudflare Workers via OpenNext (NOT vercel!)
- Built with `@opennextjs/cloudflare`, not Vercel, not `next-on-pages`.
- Build/deploy: `npm run build:worker` (opennextjs-cloudflare build) then `wrangler deploy`.
- No Next.js Image Optimization API. Use `unoptimized` or plain `<img>` with explicit dimensions.
- Not all Next.js features work — check before using edge middleware, ISR, revalidate, etc.
- Public Domain (`dse.best`)

### Do NOT write (new styles/edit changes)on globals.css (unless appropriate)
Globals.css is for our legacy bootstrap theme system, the site has been heavily migrated to Tailwind (and eventually deleted) and we want to avoid adding more styles there.

### MD Files
I do NOT want to see a bunch of asterisks, dashes, or other formatting that makes the file hard to read. Keep it simple and clean. Like simple heading #s, list with -, or ``  is already enough for most. Do not make it bloated i do not have time to open a MD viewer
---

## Project Stack

- Framework: Next.js 15 Pages Router 
- CSS: Tailwind v4. Bootstrap 5 framework removed; a Bootstrap compatibility layer remains in `styles/tailwind.css` (replicates utilities still used by 50+ legacy pages). `styles/globals.css` is legacy — do not add to it.
- Font: Noto Sans HK via `next/font/google` (`--font-noto-sans-hk`)
- CMS: Sanity (blog migrated off Contentful). Sanity MCP available.
- Themes: light, dark (sometimes known as grey), blue — For any UI changes, make sure they do not break.


---

## Design Approach

- Style: Educational and function. Do not use SF-Startup like, react animations bloated styles
- I hate hover animations, things that MOVE on itself like transitions, fade in/outs, "ai-slop" gradients.
- Make it iPad, mobile friendly as many students are browsing with it
- You may use the frontend design plugin (just with DD and maybe tune stuff down)
- We currently are adapting a Duolingo-style component system.

---

## How We Work

1. Question unreasonable requests. If something would break AdSense, add massive complexity, or defeat the site's purpose — pause and confirm before doing it. Examples: "build auth from scratch", "make the homepage SSR".

2. You can off-load/out source stuff like research, creative writing, or design tasks to other AI tools or humans when it makes sense. (Main ones: Perplexity Pro for seach and Gemini Pro for creative)

3. Blend with existing design. 

4. Make sure the themes are consistent with the changes / apply appropriate colors.

---

## Docs Creation
On big feature implementations you are to create a markdown file in `docs/v2/` with the name of the feature and a brief description of what was implemented, for better understanding.



## After Every Feature

### Changelog
After any new feature or significant function, append to `docs/planning/changelog.md`:

```
## [YYYY-MM-DD] — Feature Name
What: one-sentence summary
Files: path/to/changed/files
Notes: gotchas, tradeoffs, follow-ups
```

Create the file with a `# Changelog` heading if it doesn't exist yet.

### Follow-Up Questions
End every significant feature implementation with exactly 3 concrete next-step suggestions:

```
What next?
1. [Specific thing related to what was just built]
2. [Next logical improvement or adjacent feature]
3. [Known issue or cleanup now unblocked by this work]
```

Keep them specific — no vague options like "improve performance".
