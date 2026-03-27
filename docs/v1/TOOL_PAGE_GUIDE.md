# Creating a Tool-Based Page Guide

This guide explains how to create a new "Tool" page (like Pomodoro, Timer, or Individual Response) that follows the `dbest-v1` architecture.

## 1. Page Structure Template

All tool pages should follow this standard structure to ensure consistency in SEO, Styling, and Theme support.

```tsx
import Head from 'next/head';
import { useMemo } from 'react';
import { 
  getMainPageMetadata, 
  generateToolStructuredData // Create this in structuredData.ts
} from '../utils/structuredData';

export default function NewToolPage() {
  // 1. Setup Metadata & SEO
  const metadata = useMemo(() => getMainPageMetadata('new-tool'), []);
  const structuredData = useMemo(() => generateToolStructuredData(), []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="page-wrapper">
        {/* 2. Breadcrumbs (Standard UI) */}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active">新工具名稱</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* 3. Main Content Container */}
        <div className="layout-center">
          <div className="content-stack">
             {/* Tool Logic Goes Here */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper { padding: 1rem; min-height: 80vh; }
        .layout-center { display: flex; justify-content: center; padding-bottom: 4rem; }
        .content-stack { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 20px; }
        
        /* Use Theme Variables instead of hardcoded hex colors */
        .tool-card {
          background: var(--bs-card-bg);
          border: 1px solid var(--bs-border-color);
          color: var(--bs-body-color);
        }
      `}</style>
    </>
  );
}
```

## 2. SEO & Metadata Integration

Before creating the page, you MUST update two utility files:

### A. `utils/pageMetadata.ts`
Add your page's meta tags to the `mainPagesMetadata` object. This ensures the title and description are managed centrally.

### B. `utils/structuredData.ts`
Create a generator function (e.g., `generateNewToolStructuredData`) that returns a JSON-LD object. Use `schema.org` types like `SoftwareApplication` or `WebApplication`.

## 3. Best Practices for Tools

1.  **Theme Awareness:** Never use hardcoded hex colors like `#ffffff` or `#000000`. Always use Bootstrap variables:
    *   `var(--bs-body-bg)` - Page background
    *   `var(--bs-card-bg)` - Card/Container background
    *   `var(--bs-body-color)` - Primary text
    *   `var(--bs-heading-color)` - Titles
    *   `var(--bs-border-color)` - Borders
2.  **Mobile First:** Wrap your main tool logic in a container with `max-width` (usually 420px for timers, 680px for text-heavy tools) to keep it readable on desktop while fitting perfectly on mobile.
3.  **Local Storage:** For settings (like Pomodoro durations), use `useEffect` to sync state with `localStorage` so user preferences persist.
4.  **No Direct DOM Manipulation:** Avoid `document.getElementById`. Use React `useRef` for elements like `<audio>` or `<canvas>`.
