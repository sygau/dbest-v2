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
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
