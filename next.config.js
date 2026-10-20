import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Image optimization
  images: {
    domains: [
      'cdn5.f-cdn.com', // Freelancer.com CDN
      'cdn3.f-cdn.com',
      'images.unsplash.com', // Unsplash for project images
      'user-images.githubusercontent.com', // GitHub user content
    ],
    formats: ['image/webp', 'image/avif'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  poweredByHeader: false, // Remove x-powered-by header
  
  // Enable compression
  compress: true,
  
  // The site is a single page now — send old routes to the matching section
  async redirects() {
    return [
      { source: '/projects/:path*', destination: '/#work', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/experience', destination: '/#experience', permanent: true },
      { source: '/resume', destination: '/#experience', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/gallery', destination: '/', permanent: true },
    ];
  },

  // Headers for better caching.
  // Don't add a rule for /_next/static here: Next.js already caches those hashed files in
  // production, and forcing "immutable" in dev makes the browser keep stale code (dev file
  // names don't change between edits), which causes hydration mismatch errors.
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
