# UI Refinement & Design System Guide

## Vision

A **Bootstrap-modernized** design language that feels like a polished version of Bootstrap — familiar, functional, minimal — but with contemporary touches. Think **Duolingo's clarity** meets **Bootstrap's utility**.

**Not Shadcn/Radix defaults** — those are too generic/startup-y and don't match the educational, information-dense nature of dse.best.

---

## Design Principles

### 1. Functional First
- UI should **get out of the way** of content
- No decorative gradients or excessive animations
- Every element has a purpose

### 2. Bootstrap-Familiar
- Students recognize Bootstrap patterns
- Grid, cards, buttons, forms feel native
- No learning curve for users

### 3. Subtle Modernity
- Softer border-radius (16px cards, 8px buttons)
- Better spacing (consistent 4/8/16/24/32 scale)
- Refined typography (Noto Sans HK, proper line-height)
- Theme-aware colors (not hardcoded)

### 4. Duolingo Inspiration
- **Clear hierarchy** — one primary action per view
- **Generous whitespace** — content breathes
- **Friendly but not childish** — educational but serious
- **Progress indicators** — clear feedback on state

---

## Anti-Patterns to Avoid

### AI Slop (Common LLM Mistakes)

| Pattern | Problem | Better Approach |
|---------|---------|-----------------|
| Rainbow gradients | Looks cheap, clashes with themes | Single accent color or subtle gradient |
| `transition: all 0.3s` everywhere | Janky, causes layout thrashing | Specific properties: `transition: opacity 0.15s` |
| Excessive `box-shadow` stacking | Heavy, slow to render | One subtle shadow or border |
| `transform: scale(1.05)` on hover | Causes layout shifts, looks amateur | Color/opacity change only |
| Emoji in buttons | Unprofessional, accessibility issues | Lucide/custom icons or text only |
| Glassmorphism | Performance issues, illegible on some backgrounds | Solid backgrounds with opacity |
| `filter: blur()` backgrounds | GPU-heavy, mobile lag | Solid color overlays |

### Over-Engineering

| Pattern | Problem | Better Approach |
|---------|---------|-----------------|
| CVA for simple components | Overkill for 2-3 variants | Plain Tailwind with conditional classes |
| Framer Motion for simple fades | 20KB for opacity change | CSS transitions |
| Radix primitives for non-interactive | Unnecessary complexity | Plain HTML |
| Design tokens for one-off colors | Premature abstraction | Inline or CSS variable |

### Poor Judgement

| Pattern | Problem | Better Approach |
|---------|---------|-----------------|
| Dark text on dark backgrounds | Theme variables not used | Always use `var(--color-body)` |
| Fixed heights breaking overflow | Content truncated | `min-height` + `overflow: auto` |
| Hardcoded colors in components | Doesn't respect theme | CSS variables only |
| Missing focus states | Accessibility violation | `:focus-visible` ring |
| Touch targets < 44px | Mobile usability | Min 44x44px clickable area |

---

## Component Primitives

### Approved Components to Build

```
components/ui/
  Button.tsx        — Primary, secondary, ghost, danger variants
  Card.tsx          — Base card with theme-aware bg/border
  Input.tsx         — Text, password, search inputs
  Select.tsx        — Native select with custom arrow
  Badge.tsx         — Status badges (Easy/Medium/Hard, etc.)
  Progress.tsx      — Linear progress bar
  Accordion.tsx     — FAQ/collapsible sections
  Alert.tsx         — Info, warning, error, success
```

### Button Guidelines

```tsx
// DO: Simple, theme-aware
<button className="
  px-4 py-2 
  rounded-lg 
  bg-[var(--color-accent)] 
  text-white 
  font-medium
  hover:opacity-90
  focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Submit
</button>

// DON'T: Over-styled, AI slop
<button className="
  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
  shadow-lg shadow-purple-500/50
  transform hover:scale-105
  transition-all duration-300
  animate-pulse
">
  ✨ Submit ✨
</button>
```

### Card Guidelines

```tsx
// DO: Theme-aware, minimal
<div className="
  bg-[var(--color-card-bg)]
  border border-[var(--color-border)]
  rounded-2xl
  p-4 sm:p-6
">
  {children}
</div>

// DON'T: Hardcoded, over-designed
<div style={{
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
}}>
```

---

## Color System

### Use CSS Variables, Not Hex Codes

```tsx
// DO
className="text-[var(--color-body)]"
className="bg-[var(--color-card-bg)]"
className="border-[var(--color-border)]"

// DON'T
className="text-gray-600"  // Doesn't respect dark theme
style={{ color: '#5b6166' }}  // Hardcoded
```

### Available Variables

```css
--color-body-bg      /* Page background */
--color-body         /* Body text */
--color-heading      /* Headings */
--color-card-bg      /* Card/container backgrounds */
--color-border       /* Borders */
--color-muted        /* Secondary text */
--color-emphasis     /* High-contrast text */
--color-secondary    /* Subtle text */
--color-accent       /* Brand accent (purple) */
```

### Accent Color

Primary accent: `#8b5cf6` (violet-500)

Use sparingly:
- Primary buttons
- Active states
- Links
- Progress indicators

---

## Typography

### Font Stack
```css
font-family: var(--font-noto-sans-hk), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale
| Use | Size | Weight | Line-height |
|-----|------|--------|-------------|
| Page title | `text-3xl` / `1.875rem` | 700 | 1.2 |
| Section heading | `text-2xl` / `1.5rem` | 700 | 1.3 |
| Card title | `text-xl` / `1.25rem` | 600 | 1.4 |
| Body | `text-base` / `1rem` | 400 | 1.6 |
| Small/caption | `text-sm` / `0.875rem` | 400 | 1.5 |

### Chinese Typography
- Line-height: 1.8 for CJK text blocks
- No letter-spacing increase (hurts CJK readability)
- Use `font-feature-settings: "palt"` for proportional alternates

---

## Spacing System

Use Tailwind's default scale (multiples of 4px):

| Token | Pixels | Use |
|-------|--------|-----|
| `p-2` | 8px | Dense elements, badges |
| `p-3` | 12px | Input padding |
| `p-4` | 16px | Card padding (mobile) |
| `p-6` | 24px | Card padding (desktop) |
| `gap-4` | 16px | Grid/flex gaps |
| `mb-4` | 16px | Section spacing |
| `mb-8` | 32px | Major section breaks |

---

## Animation Guidelines

### Allowed Animations
```css
/* Opacity fade */
transition: opacity 0.15s ease-out;

/* Color change */
transition: background-color 0.15s, border-color 0.15s;

/* Focus ring */
transition: box-shadow 0.1s;
```

### Forbidden Animations
- `transform: scale()` on hover
- `translateY()` lift effects
- `filter: blur()` on backgrounds
- Multi-second `transition-all`
- Infinite animations (except loading spinners)
- Parallax effects

### Loading States
```tsx
// Simple spinner
<div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />

// Skeleton (for content loading)
<div className="animate-pulse bg-[var(--color-border)] rounded h-4 w-32" />
```

---

## Radix UI Integration (Future)

### When to Use Radix
- **Accordion** — for FAQs, collapsible sections
- **Dialog** — for modals (settings, confirmations)
- **Dropdown Menu** — for theme switcher, user menu
- **Tabs** — for tabbed interfaces (year selector, etc.)
- **Toast** — for notifications

### When NOT to Use Radix
- Simple buttons (just use `<button>`)
- Cards (just use `<div>`)
- Inputs (just use `<input>`)
- Links (just use `<a>` or `NavigationLink`)

### Styling Radix Components

Don't import Shadcn's pre-styled components. Use Radix primitives with custom Tailwind:

```tsx
import * as Accordion from '@radix-ui/react-accordion';

<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1" className="border-b border-[var(--color-border)]">
    <Accordion.Trigger className="
      flex w-full justify-between py-4 
      text-left font-medium 
      hover:text-[var(--color-accent)]
      data-[state=open]:text-[var(--color-accent)]
    ">
      Question text
    </Accordion.Trigger>
    <Accordion.Content className="pb-4 text-[var(--color-muted)]">
      Answer text
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## Development Shortcuts

### Quick Class Combos

```tsx
// Card
"bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-4 sm:p-6"

// Muted text
"text-[var(--color-muted)] text-sm"

// Section heading
"text-2xl font-bold text-[var(--color-heading)] mb-4"

// Primary button
"px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90"

// Ghost button
"px-4 py-2 rounded-lg text-[var(--color-body)] hover:bg-[var(--color-border)]/30"

// Input
"w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-body)] placeholder:text-[var(--color-muted)]"
```

### cn() Helper

```tsx
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />
```

---

## Review Checklist

Before merging any UI changes:

- [ ] Uses CSS variables for colors (no hardcoded hex)
- [ ] Respects all 4 themes (light, dark, blue, semi-dark)
- [ ] No `transition: all` — specific properties only
- [ ] No scale/lift hover effects
- [ ] No excessive gradients or shadows
- [ ] Focus states visible (`:focus-visible`)
- [ ] Touch targets ≥ 44px on mobile
- [ ] No emojis in UI elements
- [ ] Consistent spacing (4/8/16/24/32 scale)
- [ ] Typography matches scale (not arbitrary sizes)

---

## Migration Priority

1. **SubjectCard** — most visible, inline style heavy
2. **FAQSection** — used on many pages
3. **Countdown page** — 700 lines of inline styles
4. **Timer page** — similar to countdown
5. **12P pages** — study.tsx, quiz.tsx
6. **Tool pages** — pomodoro, individual-response

---

## References

- Duolingo Web: https://www.duolingo.com
- Linear (minimal SaaS): https://linear.app
- Radix Primitives: https://www.radix-ui.com/primitives
- Tailwind Typography: https://tailwindcss.com/docs/font-size
