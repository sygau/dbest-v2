# dse.best - Comprehensive Site Information

## Executive Summary

**dse.best** is a Hong Kong DSE (Diploma of Secondary Education) educational platform built with Next.js Pages Router, serving past papers, study tools, and educational content. The site operates in dual modes: public (dse.best) and private (x.dse.best) with passcode protection.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 15.4.8 (Pages Router)
- **Deployment**: Cloudflare Pages (static export) + Vercel (private mode)
- **Styling**: Hybrid CSS (Bootstrap 5 + Tailwind v4 + Custom CSS)
- **Font**: Noto Sans HK (self-hosted via next/font/google)
- **Content**: Contentful CMS for blog + JSON data for static content
- **Real-time**: Ably for chat features
- **Analytics**: Google Analytics + Vercel Analytics (private mode)

### Project Structure
```
dbest-v1/
├── pages/              # Next.js Pages Router routes
│   ├── _app.tsx        # App wrapper with font/theme setup
│   ├── _document.tsx   # Document head with scripts/meta
│   ├── index.tsx       # Homepage
│   ├── [subject]/      # Subject pages (chinese, english, math, etc.)
│   ├── 12p/            # 12-point study system
│   ├── api/            # API endpoints
│   └── blog/           # Contentful blog integration
├── components/         # React components
│   ├── tw/             # Tailwind components (new)
│   └── [legacy].tsx   # Legacy Bootstrap components
├── data/               # Static JSON data
├── styles/             # CSS files
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── public/             # Static assets
└── docs/               # Documentation
```

## Key Features

### 1. Educational Resources
- **Past Papers**: All DSE subjects (2025 coverage)
- **12P System**: Advanced study tools with passages and analysis
- **Study Tools**: Timer, Pomodoro, Flashcards, Translator
- **Subject Coverage**: 14+ subjects including core and electives

### 2. Multi-Theme System
- **Themes**: Light, Dark, Blue-theme, Semi-dark
- **Implementation**: Triple-layer CSS variables (Bootstrap + Custom + Tailwind)
- **Theme Persistence**: localStorage with SSR-safe detection

### 3. Dual Mode Operation
- **Public Mode** (dse.best): Free access with AdSense
- **Private Mode** (x.dse.best): Passcode-protected, ad-free
- **Middleware**: Handles redirects, maintenance, and passcode validation

### 4. Content Management
- **Blog**: Contentful CMS integration
- **Static Data**: JSON files for subjects, FAQs, metadata
- **Structured Data**: Comprehensive JSON-LD for SEO

## Technical Implementation Details

### Routing & Navigation
- **Pages Router**: Traditional Next.js routing (no App Router)
- **Navigation**: Custom NavigationLink component to avoid SPA behavior
- **URL Structure**: Clean URLs with .html redirects for legacy
- **Breadcrumb**: Manual breadcrumb implementation per page

### Theme System Architecture
```css
/* Triple-layer variables */
html[data-bs-theme="dark"] {
  --bs-body-bg: #212529 !important;
  --bs-card-bg: #2b3035 !important;
  /* ... */
}

[data-theme="dark"] {
  --color-body-bg: #212529;
  --color-card-bg: #2b3035;
  /* ... */
}
```

### Component Architecture
- **Legacy**: Bootstrap-based components (FAQSection)
- **Modern**: Tailwind components in `/components/tw/` (Layout, Sidebar, ThemeSwitcher)
- **Hybrid**: Pages often mix both systems during migration

### Performance Optimizations
- **Font Loading**: next/font/google with preload
- **CSS Bundling**: Combined CSS files via build script
- **Image Optimization**: Unoptimized Next.js images (CF Pages constraint)
- **Script Loading**: Custom script loading for AdSense compliance

## Security & Access Control

### Passcode System
- **Environment Variables**: PASSCODE_MODE, PASSCODE_SECRETS
- **Cookie-based**: SHA-256 hashed passcode validation
- **Middleware Protection**: Route-level access control

### CSP Headers
- **Comprehensive CSP**: Allowlisted Google services, CDNs, internal domains
- **Per-route CSP**: Relaxed CSP for /dev and /bustime
- **Security Headers**: HSTS, XSS Protection, Frame Options

## Content & SEO

### Structured Data Implementation
- **JSON-LD**: Website, Breadcrumb, FAQ, Article schemas
- **Dynamic Generation**: Page-specific structured data
- **Subject Metadata**: Rich subject information for SEO

### Metadata Management
- **Centralized**: utils/structuredData.ts (1449 lines)
- **Page Metadata**: Individual page metadata objects
- **FAQ Data**: Static FAQ arrays with page-specific content

### Blog System
- **Contentful**: Headless CMS integration
- **Static Generation**: Build-time content fetching
- **SEO Optimized**: Blog-specific structured data

## Build & Deployment

### Build Process
```json
{
  "build:full": "npm run prebuild && npm run css:build && npm run obfuscate:appendlinksx && next build",
  "css:build": "node scripts/combine-css.js",
  "prebuild": "node scripts/generate-blog-data.js"
}
```

### Deployment Targets
- **Primary**: Cloudflare Pages (static export)
- **Private Mode**: Vercel (x.dse.best)
- **CDN**: Cloudflare for static assets

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Optimized builds with console removal
- **Private Mode**: Additional security and analytics

## Known Issues & Technical Debt

### Theme System Complexity
- **Problem**: Triple-layer CSS variables cause sync issues
- **Status**: Documented in THEME_UNIFICATION.md
- **Solution**: Single source of truth via data-theme only

### Monolithic Utilities
- **Problem**: Large utility files (structuredData.ts 1449 lines)
- **Status**: Documented in MONOLITHIC_CLEANUP.md
- **Solution**: Break into focused modules

### Inline Style Bloat
- **Problem**: Pages like countdown.tsx have 700+ lines of inline styles
- **Impact**: Build performance, maintainability
- **Solution**: Extract to CSS modules or Tailwind

### Hybrid CSS Systems
- **Problem**: Bootstrap + Tailwind + Custom CSS
- **Impact**: Inconsistent styling, larger bundle
- **Migration**: Incremental Tailwind adoption planned

## Development Guidelines

### Code Organization
- **Components**: Prefer Tailwind components in `/components/tw/`
- **Pages**: Use PageTransition wrapper for consistent navigation
- **Styling**: Migrate from Bootstrap utilities to Tailwind
- **SEO**: Use centralized metadata utilities

### Theme Development
- **New Themes**: Define in globals.css with !important overrides
- **Component Theming**: Use CSS custom properties for theme awareness
- **Testing**: Test all 4 themes for new components

### SEO Best Practices
- **Structured Data**: Use utility functions for consistent JSON-LD
- **Meta Tags**: Use PageHead pattern (planned)
- **FAQs**: Centralize FAQ data, avoid hardcoded arrays

## API Endpoints

### Core APIs
- `/api/secure-cdn`: Secure CDN access for private mode
- `/api/unlock`: Passcode validation endpoint
- `/api/test.js`: Development testing endpoint

### External Integrations
- **Contentful**: Blog content fetching
- **Google Analytics**: Visitor tracking
- **AdSense**: Revenue generation (public mode)
- **Ably**: Real-time chat functionality

## Performance Metrics

### Core Web Vitals
- **CLS**: Prevented with explicit dimensions on cards
- **LCP**: Optimized font loading and critical CSS
- **FID**: Minimal JavaScript, optimized script loading

### Bundle Optimization
- **CSS**: Combined and minified via build script
- **JavaScript**: Tree-shaken, console removal in production
- **Images**: Unoptimized with explicit dimensions

## Future Roadmap

### v2 Priorities (from docs/v2/roadmap.md)
1. **P0**: Theme system unification
2. **P0**: SEO/structured data consolidation
3. **P1**: Inline styles extraction
4. **P1**: PageHead component creation
5. **P2**: Script loading audit
6. **P3**: CSS convention enforcement

### Long-term Goals
- **Performance**: Core Web Vitals optimization
- **Maintainability**: Reduce technical debt
- **User Experience**: Better mobile responsiveness
- **Content**: Enhanced study tools and resources

## Business Context

### Monetization
- **AdSense**: Primary revenue source (public mode)
- **Private Mode**: Ad-free, potentially premium
- **Traffic**: Hong Kong DSE student demographic

### Content Strategy
- **Past Papers**: Core value proposition
- **Study Tools**: Differentiation features
- **Blog**: Content marketing, SEO value
- **Tools**: Timer, Pomodoro for study productivity

## Maintenance & Operations

### Regular Tasks
- **Content Updates**: Annual past paper updates
- **Blog Posts**: Regular educational content
- **Security**: Passcode rotation, dependency updates
- **Performance**: Build optimization, CDN management

### Monitoring
- **Analytics**: Google Analytics + Vercel Analytics
- **Error Tracking**: Console monitoring
- **Performance**: Core Web Vitals tracking
- **Uptime**: Site availability monitoring

---

## Quick Reference for AI Development

### Key Files to Understand
- `pages/_app.tsx`: App wrapper, font setup
- `pages/_document.tsx`: Head setup, script loading
- `middleware.ts`: Route protection, redirects
- `components/tw/Layout.tsx`: Main layout component
- `utils/structuredData.ts`: SEO and metadata
- `styles/globals.css`: Theme system

### Development Patterns
- Use `<NavigationLink>` instead of `<Link>` for AdSense compliance
- Wrap pages in `<PageTransition>` for consistent navigation
- Use theme-aware CSS variables for new components
- Follow existing component patterns in `/components/tw/`

### Common Gotchas
- No SPA behavior required (AdSense dependency)
- Triple theme system requires careful CSS variable usage
- Private/public mode affects content rendering
- Cloudflare Pages constraints (no Image Optimization API)

### Testing Approach
- Test all 4 themes for new components
- Verify both public and private mode functionality
- Check AdSense compliance for navigation changes
- Validate structured data for SEO pages

## Legacy Files & Technical Debt

### CSS Legacy System

#### SASS Legacy Files (`/public/sass_legacy/`)
**Status**: Superseded by Next.js CSS migration, kept for reference
- **Source Files**: Original SASS/SCSS files before migration
  - `main.scss` (58KB compiled) - Core layout and component styles
  - `blue-theme.scss`, `dark-theme.scss`, `semi-dark.scss` - Theme definitions
  - `responsive.scss` - Media queries and responsive design
  - `bordered-theme.scss` - Unused border variant theme
- **Compiled Files**: `.css`, `.min.css`, and `.css.map` versions
- **Migration Path**: Migrated to `styles/globals.css` via `scripts/migrate-to-nextjs-css.js`
- **Cleanup Priority**: Low - keep as rollback reference

#### CSS Build System
**Legacy Build Process**:
```javascript
// scripts/combine-css.js - Old build system
- Combined multiple CSS files into single combined.min.css
- Used CleanCSS for minification
- Created automatic backups in /public/assets/css/backups/
```

**Current Process**:
```javascript
// scripts/migrate-to-nextjs-css.js - Migration script
- Migrates legacy SASS files to Next.js globals.css
- Preserves asset paths for Next.js public folder
- Handles Bootstrap import removal (now self-hosted)
```

### Component Legacy Files

#### Superseded Components
**SubjectCardVariants.tsx** (288 lines)
- **Status**: Superseded by `/components/tw/SubjectCard.tsx`
- **Issue**: 100% inline styles, multiple variants with similar functionality
- **Replacement**: Modern Tailwind-based SubjectCard with consistent theming
- **Cleanup Priority**: High - No longer used

**LayoutPreserver.tsx** (175 lines)
- **Status**: Obsolete layout preservation system
- **Purpose**: Preserved old layout during navigation transitions
- **Issue**: References old CSS selectors (`.sidebar-wrapper`, `.wrapper`)
- **Current System**: Modern Layout component with proper state management
- **Cleanup Priority**: Medium - May have niche use cases

#### Legacy Navigation Components
**TraditionalLayoutManager.tsx** (12KB)
- **Status**: Legacy navigation system
- **Issue**: Complex DOM manipulation for layout preservation
- **Replacement**: Modern Layout component in `/components/tw/`
- **Cleanup Priority**: Medium

**TraditionalNavigationHandler.tsx** (2.8KB)
- **Status**: Navigation event handling for legacy system
- **Dependency**: Linked to TraditionalLayoutManager
- **Cleanup Priority**: Medium

**TraditionalNavigationEnhancer.tsx** (4KB)
- **Status**: Enhancement layer for legacy navigation
- **Cleanup Priority**: Medium

### Script Legacy Files

#### Build Scripts
**migrate-to-nextjs-css.js**
- **Status**: One-time migration script, completed
- **Purpose**: Migrated SASS to Next.js CSS structure
- **Cleanup Priority**: Low - Keep for reference/future migrations

**test-css-bundle.js**
- **Status**: CSS bundle testing utility
- **Purpose**: Validates combined CSS functionality
- **Cleanup Priority**: Low - Useful for build verification

#### Maintenance Scripts
**View Count Scripts** (3 files)
- `check-view-counts.js` - Analytics verification
- `inflate-view-counts.js` - View count manipulation (development)
- `reset-view-counts.js` - View count reset utility
- **Status**: Development/testing utilities
- **Cleanup Priority**: Low - Dev tools

### Asset Legacy Files

#### JavaScript Libraries
**OLD-appendLinks.min.js**
- **Status**: Superseded appendLinks script
- **Purpose**: Paper link injection for subject pages
- **Replacement**: `appendLinks.min.js` (current version)
- **Cleanup Priority**: High - No longer referenced

**Bootstrap Assets**
- `bootstrap.bundle.min.js` - Bootstrap JS (still used)
- `bootstrap.min.css` - Bootstrap CSS (superseded by self-hosted)
- `jquery.min.js` - jQuery dependency (minimal usage)
- **Status**: Partially legacy, some still required
- **Cleanup Priority**: Low - Bootstrap still in use

#### Backup Files
**CSS Backups** (`/public/assets/css/backups/`)
- **Pattern**: `combined.min.css.backup-{timestamp}`
- **Count**: 5 backup files (auto-rotated)
- **Purpose**: Rollback protection for CSS builds
- **Cleanup Priority**: None - Important for safety

**Source Maps**
- **Files**: `.css.map` and `.js.map` files throughout
- **Purpose**: Development debugging
- **Status**: Should be excluded from production
- **Cleanup Priority**: Low - Already excluded via build process

### Unused/Dead Code

#### CSS Rules in globals.css
- **Estimated**: ~4400 lines contain rules for deleted pages
- **Examples**: Rules for removed components, old page layouts
- **Identification**: Requires audit of CSS usage
- **Cleanup Priority**: Medium - Bundle size impact

#### Configuration Files
**Legacy Config Files**
- Various JSON configs in `/public/config/` for old systems
- Some subject configs may be superseded
- **Cleanup Priority**: Medium - Requires verification

### Migration Status Summary

| Category | Legacy State | Modern Replacement | Cleanup Priority |
|----------|--------------|-------------------|------------------|
| CSS Build | SASS + combine-css.js | Next.js globals.css | Low (reference) |
| Components | SubjectCardVariants | tw/SubjectCard | High |
| Navigation | TraditionalLayoutManager | tw/Layout | Medium |
| Scripts | OLD-appendLinks.js | appendLinks.min.js | High |
| Assets | Bootstrap CDN | Self-hosted | Low |
| Build Tools | migrate-to-nextjs-css.js | Built-in Next.js | Low (reference) |

### Recommended Cleanup Strategy

#### Phase 1: Safe Removals (High Confidence)
1. **SubjectCardVariants.tsx** - Confirmed unused
2. **OLD-appendLinks.min.js** - Superseded version
3. **LayoutPreserver.tsx** - Obsolete DOM manipulation

#### Phase 2: Verification Required (Medium Confidence)
1. **Traditional navigation components** - Check for niche usage
2. **CSS dead rules** - Audit and remove unused selectors
3. **Legacy config files** - Verify current relevance

#### Phase 3: Reference Materials (Low Priority)
1. **SASS legacy files** - Keep as rollback reference
2. **Migration scripts** - Keep for future migrations
3. **Backup files** - Maintain safety net

#### Phase 4: Ongoing Maintenance
1. **CSS backup rotation** - Continue current auto-cleanup
2. **Source map exclusion** - Ensure production builds exclude maps
3. **Bundle audit** - Regular checks for unused assets

### Detection Methods for Future Legacy Code

#### Automated Detection
```bash
# Find unused imports
grep -r "import.*from.*components" --include="*.tsx" --include="*.ts" | grep -v node_modules

# Find CSS class usage
grep -r "className=" --include="*.tsx" | sort | uniq -c | sort -nr

# Find file references
grep -r "SubjectCardVariants" --include="*.tsx" --include="*.ts" .
```

#### Manual Review Checklist
- [ ] Component not imported in any page
- [ ] CSS class not found in component search
- [ ] Script not referenced in _document.tsx
- [ ] Config file not loaded in build process
- [ ] Asset not served via public folder

---

## Quick Reference for AI Development

### Key Files to Understand
- `pages/_app.tsx`: App wrapper, font setup
- `pages/_document.tsx`: Head setup, script loading
- `middleware.ts`: Route protection, redirects
- `components/tw/Layout.tsx`: Main layout component
- `utils/structuredData.ts`: SEO and metadata
- `styles/globals.css`: Theme system

### Development Patterns
- Use `<NavigationLink>` instead of `<Link>` for AdSense compliance
- Wrap pages in `<PageTransition>` for consistent navigation
- Use theme-aware CSS variables for new components
- Follow existing component patterns in `/components/tw/`

### Common Gotchas
- No SPA behavior required (AdSense dependency)
- Triple theme system requires careful CSS variable usage
- Private/public mode affects content rendering
- Cloudflare Pages constraints (no Image Optimization API)

### Testing Approach
- Test all 4 themes for new components
- Verify both public and private mode functionality
- Check AdSense compliance for navigation changes
- Validate structured data for SEO pages

### Legacy Awareness
- Check `/components/tw/` for modern components before creating new ones
- Verify CSS class usage in globals.css before adding new rules
- Use existing navigation patterns (NavigationLink) for consistency
- Avoid inline styles - use Tailwind or CSS modules instead



