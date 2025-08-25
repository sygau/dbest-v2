/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  
  // Enable full optimization for production
  experimental: {
    // Disable optimizeCss as it requires additional dependencies
    optimizeCss: false,
    largePageDataBytes: 128 * 100000, // 128KB
  },
  
  // Optimize compiler for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  images: {
    unoptimized: true,
    domains: [
      'images.ctfassets.net', // Contentful CDN
      'dummyimage.com', // Fallback images
      'dse.best', // Your domain
      'nextjs.dse.best' // Preview domain
    ],
  },
  
  // Explicitly disable assetPrefix for all deployments
  assetPrefix: '',
  
  
  // Clean URLs like your current setup
  async redirects() {
    return [
      {
        source: '/:page.html',
        destination: '/:page',
        permanent: true,
      },
      {
        source: '/blog/:slug.html',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  
  // Security headers only - let Vercel/Cloudflare handle caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          /* {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://cdn.jsdelivr.net https://code.jquery.com https://vercel.com https://cdn.ably.com https://rest.ably.io https://*.pages.dev https://*.disqus.com https://*.liadm.com https://*.privacymanager.io; style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://*.googleadservices.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev; font-src 'self' https://*.gstatic.com https://*.googleapis.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev; img-src 'self' data: https: https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://images.ctfassets.net https://dbest-cdn.pages.dev https://dummyimage.com https://*.disqus.com https://*.liadm.com https://*.privacymanager.io https://www.hkeaa.edu.hk; connect-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://dse.best https://dbest-cdn.pages.dev https://vercel.com https://cdn.ably.com https://rest.ably.io https://*.ably-realtime.com wss://realtime.ably.io https://api.web3forms.com https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://dbest-cdn.pages.dev https://*.dse.best https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-ancestors 'none';"
          }, */
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://cdn.jsdelivr.net https://code.jquery.com https://vercel.com https://cdn.ably.com https://rest.ably.io https://*.pages.dev https://*.disqus.com https://*.liadm.com https://*.privacymanager.io; style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://*.googleadservices.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev; font-src 'self' https://*.gstatic.com https://*.googleapis.com https://cdn.jsdelivr.net https://dbest-cdn.pages.dev; img-src 'self' data: https: https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://images.ctfassets.net https://dbest-cdn.pages.dev https://dummyimage.com https://*.disqus.com https://*.liadm.com https://*.privacymanager.io https://www.hkeaa.edu.hk; connect-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://dse.best https://dbest-cdn.pages.dev https://vercel.com https://cdn.ably.com https://rest.ably.io https://*.ably-realtime.com wss://realtime.ably.io https://api.web3forms.com https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.adsensecustomsearchads.com https://*.adtrafficquality.google https://dbest-cdn.pages.dev https://*.dse.best https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-ancestors 'none';"
          } 
        ],
      },
      // Exclude CSP for personal projects in public and dev folders
      {
        source: '/dev/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; img-src 'self' data: blob: https: http:; connect-src 'self' https: http: ws: wss:; frame-src 'self' https: http:; object-src 'none'; base-uri 'self';"
          }
        ],
      },
      {
        source: '/bustime/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; img-src 'self' data: blob: https: http:; connect-src 'self' https: http: ws: wss:; frame-src 'self' https: http:; object-src 'none'; base-uri 'self';"
          }
        ],
      }
    ]
  },
}

module.exports = nextConfig
