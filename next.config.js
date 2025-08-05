/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Remove output: 'export' for Vercel deployment
  // output: 'export',
  // distDir: 'out',
  
  // Optimize for performance and reduce flash
  swcMinify: true,
  experimental: {
    optimizeCss: false,
    largePageDataBytes: 128 * 100000, // 128KB
  },
  
  // Optimize compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: {
    unoptimized: true,
    domains: [
      'images.ctfassets.net', // Contentful CDN
      'dummyimage.com', // Fallback images
      'dse.best', // Your domain
      'nextjs.dse.best' // Preview domain
    ],
  },
  // Remove assetPrefix to let Vercel handle this automatically
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://dse.best' : '',
  
  // Environment variables for build
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || 'fqnskombkl24',
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || 'VGIR_FUs5N8woFJ4K47tm-JWr2YVbAe521Ev4oAWVc0',
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  },
  
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
  
  // Headers for better caching and performance
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
        ],
      },
    ]
  },
}

module.exports = nextConfig
