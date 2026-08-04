const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [],
  // Blog migrado a /co/guias (Ago-2026): redirigir el /blog indexado por Google
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/co/guias",
        permanent: true,
      },
      {
        source: "/co/blog",
        destination: "/co/guias",
        permanent: true,
      },
    ]
  },
  // Optimize bundle size for known large packages
  experimental: {
    optimizePackageImports: ["@medusajs/ui", "@radix-ui/react-icons", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.stripe.com https://o45000000000.ingest.us.sentry.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://cdn.simpleicons.org https://*.s3.amazonaws.com https://medusa-public-images.s3.eu-west-1.amazonaws.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src https://www.googletagmanager.com https://js.stripe.com",
              "media-src 'self' https://cdn.coverr.co https://res.cloudinary.com",
              "connect-src 'self' https://api.tiendalebonmarche.com http://localhost:9000 https://o45000000000.ingest.us.sentry.io https://vitals.vercel-insights.com wss://*.vercel.app",
              "manifest-src 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.tiendalebonmarche.com",
      },
      {
        protocol: "https",
        hostname: "*.tiendalebonmarche.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
    ],
  },
}

module.exports = nextConfig