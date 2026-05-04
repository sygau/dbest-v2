import React, { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

type IconVariant = 'blob' | 'splash' | 'blot' | 'sticker' | 'drip';

interface IconCardProps {
  variant?: IconVariant;
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}

export function IconCard({
  variant = 'blob',
  icon,
  title,
  description,
  content,
  footer,
}: IconCardProps) {
  const variantClass = `r4-icon-${variant}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`${variantClass} flex-shrink-0 -mt-3.5`} aria-hidden="true" style={{ color: '#ffffff' }}>
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription className="mt-0.5">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}

      <style jsx>{`
        /* ---------- 1. PAINT SPLASH (SVG mask) ---------- */
        .r4-icon-splash {
          position: relative;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 4c8 0 10 10 18 9s14-6 20 0 2 14 6 20 12 8 11 16-12 8-14 16 6 16 0 22-16-2-22 4-2 14-10 16-12-8-20-9-14 6-20 0-2-14-6-20-12-8-11-16 12-8 14-16-6-16 0-22 16 2 22-4 4-16 12-16z'/></svg>") center/contain no-repeat;
          mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 4c8 0 10 10 18 9s14-6 20 0 2 14 6 20 12 8 11 16-12 8-14 16 6 16 0 22-16-2-22 4-2 14-10 16-12-8-20-9-14 6-20 0-2-14-6-20-12-8-11-16 12-8 14-16-6-16 0-22 16 2 22-4 4-16 12-16z'/></svg>") center/contain no-repeat;
          transform: rotate(-8deg);
          transition: transform 0.3s ease;
        }
        .r4-icon-splash:hover {
          transform: rotate(4deg) scale(1.05);
        }

        /* ---------- 2. ORGANIC BLOB (border-radius morph) ---------- */
        .r4-icon-blob {
          position: relative;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
          transform: rotate(-6deg);
          box-shadow:
            0 4px 12px -2px rgba(124, 58, 237, 0.4),
            inset -2px -3px 6px rgba(0, 0, 0, 0.1),
            inset 2px 3px 6px rgba(255, 255, 255, 0.25);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .r4-icon-blob:hover {
          border-radius: 47% 53% 38% 62% / 49% 60% 40% 51%;
          transform: rotate(8deg);
        }

        /* ---------- 3. INK BLOT / STAMP (rough edges) ---------- */
        .r4-icon-blot {
          position: relative;
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          background: #7c3aed;
          -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 6c12-2 22 4 28 14s2 18 8 26 18 10 14 22-18 6-26 14-6 18-18 16-14-12-26-14-22 4-26-8 8-16 6-26-12-16-6-26 18-2 26-10 8-10 20-8z'/></svg>") center/contain no-repeat;
          mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 6c12-2 22 4 28 14s2 18 8 26 18 10 14 22-18 6-26 14-6 18-18 16-14-12-26-14-22 4-26-8 8-16 6-26-12-16-6-26 18-2 26-10 8-10 20-8z'/></svg>") center/contain no-repeat;
          transform: rotate(5deg);
        }
        .r4-icon-blot::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 50%);
        }

        /* ---------- 4. STICKER (offset shadow + outline) ---------- */
        .r4-icon-sticker {
          position: relative;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: #8b5cf6;
          border-radius: 58% 42% 47% 53% / 52% 55% 45% 48%;
          border: 2.5px solid #1f1235;
          box-shadow: 3px 3px 0 #1f1235;
          transform: rotate(-7deg);
          transition: all 0.2s ease;
        }
        .r4-icon-sticker:hover {
          transform: rotate(-7deg) translate(-2px, -2px);
          box-shadow: 5px 5px 0 #1f1235;
        }

        /* ---------- 5. PAINT DRIP / GOO ---------- */
        .r4-icon-drip {
          position: relative;
          width: 44px;
          height: 50px;
          display: grid;
          place-items: center;
          padding-bottom: 6px;
          background: linear-gradient(180deg, #a78bfa, #6d28d9);
          -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 110'><path d='M20 10c-12 12-14 36-4 52s38 18 52 6 16-36 6-52-42-18-54-6zM30 70c-2 8 0 16 6 18s10-4 8-12-12-12-14-6zM68 72c-1 6 1 12 5 14s7-3 6-9-10-10-11-5z'/></svg>") center/contain no-repeat;
          mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 110'><path d='M20 10c-12 12-14 36-4 52s38 18 52 6 16-36 6-52-42-18-54-6zM30 70c-2 8 0 16 6 18s10-4 8-12-12-12-14-6zM68 72c-1 6 1 12 5 14s7-3 6-9-10-10-11-5z'/></svg>") center/contain no-repeat;
          transform: rotate(-3deg);
        }
      `}</style>
    </Card>
  );
}
