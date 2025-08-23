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
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src https:; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests;"
          },
          /* {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://cdn.jsdelivr.net https://code.jquery.com https://vercel.com https://cdn.ably.com https://rest.ably.io https://cdn.dse.best https://*.disqus.com https://*.liadm.com https://*.privacymanager.io; style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://*.googleadservices.com https://cdn.jsdelivr.net https://cdn.dse.best; font-src 'self' https://*.gstatic.com https://*.googleapis.com https://cdn.jsdelivr.net https://cdn.dse.best; img-src 'self' data: https: https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://images.ctfassets.net https://cdn.dse.best https://dummyimage.com https://*.disqus.com https://*.liadm.com https://*.privacymanager.io; connect-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://dse.best https://cdn.dse.best https://vercel.com https://cdn.ably.com https://rest.ably.io https://api.web3forms.com https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-src 'self' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://cdn.dse.best https://*.disqus.com https://disqus.com https://*.liadm.com https://*.privacymanager.io; frame-ancestors 'none';"
          } */
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
          }
          // No CSP header for dev projects
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
          }
          // No CSP header for bustime project
        ],
      }
    ]
  },
}

module.exports = nextConfig
