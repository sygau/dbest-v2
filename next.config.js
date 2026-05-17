// @ts-check
const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');

// Make Cloudflare bindings available during `next dev`.
initOpenNextCloudflareForDev();

const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// CSP for production pages (migrated from public/_headers).
const CSP_PROD = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com https://cdn.jsdelivr.net https://code.jquery.com https://*.pages.dev https://*.workers.dev https://*.disqus.com https://*.liadm.com https://*.privacymanager.io https://launchpad-wrapper.privacymanager.io https://launchpad.privacymanager.io",
  "style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://*.googleadservices.com https://fonts.googleapis.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev",
  "font-src 'self' https://*.gstatic.com https://*.googleapis.com https://fonts.googleapis.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev",
  "img-src 'self' data: https: https://images.ctfassets.net https://dbest-cdn.pages.dev https://dummyimage.com https://placehold.co",
  "connect-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com https://dse.best https://dbest-cdn.pages.dev https://api.web3forms.com https://*.disqus.com https://*.privacymanager.io",
  "frame-src 'self' https://*.google.com https://*.googleapis.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://dbest-cdn.pages.dev https://*.dse.best https://*.disqus.com https://disqus.com https://*.privacymanager.io",
  "frame-ancestors 'none'",
].join('; ');

const CSP_DEV = "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; img-src 'self' data: blob: https: http:; connect-src 'self' https: http: ws: wss:; frame-src 'self' https: http:; object-src 'none'; base-uri 'self'";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  experimental: {
    optimizeCss: false,
    largePageDataBytes: 128 * 100000,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net', 'dse.best'],
  },

  assetPrefix: '',

  async redirects() {
    return [
      // .html -> clean URLs (carried over from previous setup).
      { source: '/:page.html', destination: '/:page', permanent: true },
      { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true },

      // Migrated from public/_redirects (CF Pages file, removed).
      {
        source: '/hkpl_link',
        destination: 'https://sls.hkpl.gov.hk/digital-collection/tc/collection_hkcee-and-hkale-papers-collection.html',
        permanent: true,
      },
      { source: '/countdown2027', destination: '/countdown', permanent: true },
      { source: '/jable', destination: 'https://jable.tv/', permanent: false },
      { source: '/pornhub', destination: 'https://pornhub.com/', permanent: false },
    ];
  },

  async headers() {
    return [
      // Production pages.
      {
        source: '/:path*',
        headers: [
          ...SECURITY_HEADERS,
          { key: 'Content-Security-Policy-Report-Only', value: CSP_PROD },
        ],
      },
      // WebP stickers.
      {
        source: '/assets/stickers/:path*',
        headers: [{ key: 'Content-Type', value: 'image/webp' }],
      },
      // Dev sandbox + bustime: relaxed CSP for testing/PWA.
      {
        source: '/dev/:path*',
        headers: [
          ...SECURITY_HEADERS,
          { key: 'Content-Security-Policy-Report-Only', value: CSP_DEV },
        ],
      },
      {
        source: '/bustime/:path*',
        headers: [
          ...SECURITY_HEADERS,
          { key: 'Content-Security-Policy-Report-Only', value: CSP_DEV },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
