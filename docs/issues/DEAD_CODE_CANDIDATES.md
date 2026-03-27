# Issue: Dead Code Candidates

## Summary
Several files and CSS rules appear unused or superseded. Removing them would reduce bundle size and maintenance burden.

## Components

| File | Status | Evidence | Action |
|------|--------|----------|--------|
| `components/SubjectCardVariants.tsx` | **Dead** | 17KB, not imported anywhere | Delete |
| `components/LayoutPreserver.tsx` | Likely dead | Uses `.sidebar-wrapper` which may not exist in TW layout | Verify imports, delete if unused |
| `components/TraditionalLayoutManager.tsx` | Unclear | 12KB, may be legacy navigation | Audit usage |
| `components/TraditionalNavigationEnhancer.tsx` | Unclear | May be legacy | Audit usage |
| `components/TraditionalNavigationHandler.tsx` | Unclear | May be legacy | Audit usage |
| `components/PersistentLayoutWrapper.tsx` | Unclear | May conflict with TW Layout | Audit usage |
| `components/NavigationTestMode.tsx` | Dev only | 5.8KB test component | Keep in dev, exclude from prod |

## To Verify Dead Code

```bash
# Search for imports
grep -r "SubjectCardVariants" pages/ components/
grep -r "LayoutPreserver" pages/ components/
grep -r "TraditionalLayoutManager" pages/ components/
```

## CSS in globals.css

`styles/globals.css` is ~4500 lines. Many rules may be for deleted pages/components.

### Audit Strategy
1. Extract all class selectors from `globals.css`
2. Search codebase for each class
3. Remove unused selectors

### Likely Candidates
- `.simplebar-*` — custom scrollbar library (may be removed)
- `.apexcharts-*` — charting library (check if used)
- `.metismenu-*` — menu library from Bootstrap theme
- `.email-*`, `.chat-*` — dashboard template leftovers
- `.sidebar-wrapper.closed` — old sidebar state classes

### Safe to Remove
Rules for pages that no longer exist:
- Email templates
- Chat interfaces
- Dashboard widgets
- Calendar views

## Hooks

| File | Status | Notes |
|------|--------|-------|
| `hooks/useNavigationMode.ts` | Check | May only be used by LayoutPreserver |
| `hooks/useNavigationToggle.ts` | Check | Similar |

## Scripts

| File | Status | Notes |
|------|--------|-------|
| `scripts/check-view-counts.js` | Dev utility | Keep |
| `scripts/generate-blog-data.js` | Build script | Keep |

## Verification Commands

```bash
# Find all component imports
grep -rh "from '\.\./components" pages/ | sort | uniq -c | sort -rn

# Find unused exports
npx knip # or similar dead code detector

# Check bundle analyzer
npm run build && npx @next/bundle-analyzer
```

## Priority

**P3** — Low urgency but reduces maintenance burden and bundle size.

## Action Items

- [ ] Run `grep` commands to verify dead components
- [ ] Delete confirmed dead files
- [ ] Run build to ensure nothing breaks
- [ ] Audit `globals.css` for unused selectors (separate task)

## Related

- `docs/v2/UI_DEBT.md` — lists some candidates
- `docs/v2/roadmap.md` — P3 cleanup section
