# UI/UX Technical Debt & Remaining Polish Items

## Completed in This Session (v1.x Polish)

- [x] Transparent navbar on blue theme (transparent at top, blur+border on scroll)
- [x] 12P index: section headings resized to 1.5rem
- [x] 12P study/quiz: start button full-width, same height as back button
- [x] 12P quiz: timer toggle restyled with custom toggle switch (replaces broken Bootstrap form-switch)
- [x] 12P quiz: submit button full-width stretched
- [x] Flashcard: vertical centering fix (card-body height inheritance)
- [x] Theme switching: `useThemeSwitcher` now updates both `data-bs-theme` and `data-theme` + body bg
- [x] Blog cards blue theme: slightly lighter background for distinction
- [x] Index hero text: restored to 3rem with old Bootstrap `fw-bold` styling
- [x] HR break: richer visibility via `--bs-body-color` at 25% opacity
- [x] Footer: reduced padding to eliminate extra space
- [x] Timer: fullscreen button hidden on mobile, dropdowns smaller on mobile, clock 4.5rem min
- [x] Blog mobile: native `<select>` for categories (desktop buttons already hidden via `d-none d-md-flex`)

## Known Remaining Items

### High Priority

1. **12P passage grid on mobile** — The passage selection grid uses `grid-template-columns: repeat(4, 1fr)` on desktop and `1fr` on mobile. On tablet (768-992px), 4 columns may be too cramped. Consider `repeat(3, 1fr)` for tablet breakpoint.

2. **Blog post page mobile TOC** — The mobile table-of-contents panel styling could be improved (currently a slide-down panel).

3. **SubjectCard dark/blue theme** — The gradient mesh background uses `rgba(accent, 0.08)` which is barely visible on dark backgrounds. May need theme-specific opacity adjustments.

### Medium Priority

4. **Pomodoro page** — Needs the same mobile dropdown and fullscreen treatment as the timer page.

5. **Contact page** — Form styling needs audit for dark/blue theme compatibility.

6. **Disclaimer/Privacy pages** — Text formatting was fixed but could benefit from a shared `LegalPage` component to reduce duplication.

7. **Blog search** — Search input on mobile could be slightly larger touch target.

### Low Priority

8. **Sidebar collapse animation** — The collapsed sidebar (70px) shows truncated text briefly during transition. Consider opacity fade.

9. **Back to Top button** — Works well but could use a subtle entrance animation.

10. **Print styles** — No print CSS exists. Blog posts especially would benefit from a print stylesheet.

## Dead Code Candidates

| File | Status | Notes |
|------|--------|-------|
| `components/SubjectCardVariants.tsx` | Dead | Not imported anywhere, superseded by `tw/SubjectCard.tsx` |
| `components/LayoutPreserver.tsx` | Potentially dead | Uses old `.sidebar-wrapper` selectors that may not exist in TW layout |
| `hooks/useNavigationMode.ts` | Check usage | May only be used by `LayoutPreserver` |

## CSS Cleanup Candidates

- `globals.css` has ~4400 lines — many rules may be for pages/components that no longer exist
- Bootstrap utility classes (`d-flex`, `mb-4`, etc.) are used alongside Tailwind equivalents — pick one convention per component
- Some `<style jsx>` blocks duplicate styles across study.tsx and quiz.tsx — extract shared 12P styles
