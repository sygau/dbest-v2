# Dual Deployment Guide

This project supports deployment to two different platforms:
- **dse.best** → Cloudflare Pages (static site, no API routes)
- **x.dse.best** → Vercel (full Next.js with API routes)

## Build Commands

### For Cloudflare Pages (dse.best)
```bash
npm run build:cloudflare
```
This command:
- Temporarily moves the `/pages/api` folder out of the way
- Runs the Next.js build without API routes
- Restores the API folder after build
- Produces a static build compatible with Cloudflare Pages

### For Vercel (x.dse.best)
```bash
npm run build:vercel
# or simply
npm run build
```
This command:
- Builds the full Next.js application including API routes
- Compatible with Vercel's serverless functions

## Deployment Setup

### Cloudflare Pages Configuration
1. **Build Command**: `npm run build:cloudflare`
2. **Build Output Directory**: `.next`
3. **Node.js Version**: 18.x or higher

### Vercel Configuration
1. **Build Command**: `npm run build:vercel` (or default)
2. **Framework Preset**: Next.js
3. **Node.js Version**: 18.x or higher

## API Routes

The following API routes are only available on Vercel (x.dse.best):
- `/api/secure-cdn` - CDN configuration endpoint
- `/api/unlock` - Passcode authentication
- `/api/test` - Test endpoint

These routes are automatically excluded from Cloudflare builds.

## Environment Variables

### Cloudflare Pages (dse.best)
- Standard Next.js environment variables
- No API-specific variables needed
- **Note**: `PASSCODE_MODE` should NOT be set (or set to `false`)

### Vercel (x.dse.best)
- All standard variables
- `PASSCODE_MODE=true` - Enables passcode-specific 404 page
- `PASSCODE_SECRETS` - Comma-separated list of valid passcodes
- `PASSCODE_COOKIE_NAME` - Cookie name for authentication
- `PASSCODE_MAX_AGE_DAYS` - Cookie expiration in days
- `SECURE_CDN_URL` - Primary CDN URL for secure content

## Build Process

### Cloudflare Build Process
1. Backup `/pages/api` folder
2. Run `next build` (without API routes)
3. Restore `/pages/api` folder
4. Output static files to `.next/`

### Vercel Build Process
1. Run standard `next build`
2. Include all API routes
3. Output to `.next/` with serverless functions

## Troubleshooting

### Cloudflare Build Issues
- Ensure API folder is properly restored after build
- Check that no API routes are referenced in static pages
- Verify build output doesn't include server-side code

### Vercel Build Issues
- Ensure all API routes are properly configured
- Check environment variables are set
- Verify serverless function limits

## Development

For local development, use:
```bash
npm run dev
```

This runs the full application with all API routes available.

## File Structure

```
pages/
├── api/                    # API routes (Vercel only)
│   ├── secure-cdn.ts
│   ├── unlock.ts
│   └── test.js
├── [other pages]           # Static pages (both platforms)
└── 404.tsx                # Custom 404 page
```

## Notes

- API routes are only functional on Vercel
- Cloudflare Pages builds are purely static
- Both deployments share the same codebase
- Environment variables differ between platforms
