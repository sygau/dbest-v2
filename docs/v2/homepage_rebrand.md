# Homepage Rebrand

Date: 2026-05-18

## Why
The homepage framed dse.best as a past-paper archive. The site also has a
JUPAS calculator, 12-passage tool, cut-off data and blog, so the homepage now
leads with a resource-hub identity while keeping the past-paper section.

## What shipped
- New hero: small `dse.best` wordmark, `你的 DSE 備戰拍檔` headline below it,
  then a resource-hub description. Inline in `pages/index.tsx`.
- `DseCountdown` — flat solid-indigo banner counting down to HKDSE 2027
  (`2027-04-07T09:00:00+08:00`). One big day count, one-shot count-up on
  mount, flat ring decoration. No gradient, no glass.
- `ToolGrid` — 4 Duolingo-style buttons (JUPAS, 12P, Cut Off, Blog) with a
  colored bottom edge for depth, no hover motion.

## Files
- `components/home/toolsData.ts` — shared tool list.
- `components/home/DseCountdown.tsx`
- `components/home/ToolGrid.tsx`
- `pages/index.tsx` — hero + countdown + tool grid wired in. 歷屆試題 /
  Changelog / FAQ untouched.
- `lib/fonts.ts`, `pages/_app.tsx`, `pages/_document.tsx`, `tailwind.config.js`
  — Noto Serif HK wired (`--font-noto-serif-hk`, `font-serif`), currently
  unused, kept for future use.

## Notes
- First build attempt was scrapped: gradient fills, glassmorphism, broken
  clip-path tiles, side-stripe borders, identical card grids. Rebuilt flat.
- All new components use `--color-*` theme vars (light / dark / blue).
- Countdown date is duplicated from `pages/countdown/index.tsx`. A shared
  `data/dse-dates.json` would be cleaner later.
