# Issue: Component Inline Styles

## Summary
Core components like `SubjectCard` use 100% inline styles, making them hard to theme, customize, and maintain.

## Example: SubjectCard.tsx

```tsx
export default function SubjectCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <NavigationLink href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: '100%' }}>
        {/* Mesh background overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: `radial-gradient(600px circle at 0% 0%, ${accent}22, transparent 40%), 
                       radial-gradient(600px circle at 100% 100%, #00d4ff22, transparent 40%)` 
        }} />
        {/* Card body */}
        <div style={{ 
          position: 'relative', 
          padding: 18, 
          border: `1px solid ${accent}44`, 
          boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 30px rgba(0,0,0,0.20)', 
          borderRadius: 16, 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          {/* ... more inline styles ... */}
        </div>
      </div>
    </NavigationLink>
  )
}
```

## Problems

1. **No hover states** — `style={{}}` doesn't support `:hover`
2. **No media queries** — can't make responsive via inline
3. **No theming** — hardcoded `rgba(255,255,255,...)` values
4. **No customization** — can't override via `className`
5. **No caching** — styles in JS, not CSS
6. **Verbose** — 30+ lines of style objects for one card

## Other Affected Components

| Component | Inline Style Lines | Notes |
|-----------|-------------------|-------|
| `tw/SubjectCard.tsx` | ~30 | Main card component |
| `FAQSection.tsx` | ~20 | Accordion styles |
| `Flashcard.tsx` | ~40 | Card flip animation |
| `ChangelogSection.tsx` | ~10 | List styles |

## Suggested Fix

### Option A: Tailwind Classes
```tsx
export default function SubjectCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <NavigationLink href={href} className="no-underline text-inherit">
      <div className="relative rounded-2xl overflow-hidden h-full group">
        {/* Mesh background — use CSS variable for accent */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ '--accent': accent } as React.CSSProperties}
        />
        <div className="relative p-4 border border-white/10 rounded-2xl 
                        bg-gradient-to-b from-white/8 to-white/4 
                        h-full flex flex-col
                        group-hover:border-white/20 transition-colors">
          {/* ... */}
        </div>
      </div>
    </NavigationLink>
  )
}
```

### Option B: CSS Module
```css
/* components/tw/SubjectCard.module.css */
.card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
}

.card:hover .body {
  border-color: rgba(255, 255, 255, 0.2);
}

.mesh {
  position: absolute;
  inset: 0;
  background: radial-gradient(600px circle at 0% 0%, var(--accent-color, #4361ee) 0.13, transparent 40%);
}
```

### Option C: CVA (Class Variance Authority)
For components with variants:
```tsx
import { cva } from 'class-variance-authority';

const card = cva('relative rounded-2xl overflow-hidden h-full', {
  variants: {
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }
  },
  defaultVariants: { size: 'md' }
});
```

## Recommended Approach

1. **SubjectCard** — Tailwind classes with CSS variable for `accent`
2. **Flashcard** — CSS module for flip animation (too complex for utility classes)
3. **FAQSection** — Tailwind with Radix Accordion primitives (future)
4. **ChangelogSection** — Simple Tailwind conversion

## Priority

**P1** — Blocks design system and UI refinement work.

## Related

- `docs/v2/UI_refine.md` — design system approach
- `docs/issues/INLINE_STYLES_BLOAT.md` — page-level inline styles
