import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Compress static assets
  compress: true,
  // Generate ETags for cache validation
  generateEtags: true,
  // Enable PoweredBy header
  poweredByHeader: false,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Enable SWR (stale-while-revalidate)
  reactStrictMode: true,
  // Trailing slash consistency for SEO
  trailingSlash: false,
};

export default withSentryConfig(nextConfig, {


  org: "student-y7o",

  project: "javascript-nextjs",

 
  silent: !process.env.CI,


  widenClientFileUpload: true,

 
  tunnelRoute: "/monitoring",

  webpack: {
    
    automaticVercelMonitors: true,

   
    treeshake: {
     
      removeDebugLogging: true,
    },
  },
});
