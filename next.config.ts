import type { NextConfig } from "next"
import { getOsNotes } from "./lib/os-notes"

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    const noteRedirects = getOsNotes()
      .filter((note) => note.legacySlug !== note.slug)
      .map((note) => ({
        source: `/lab/notes/${note.legacySlug}`,
        destination: `/lab/notes/${note.slug}`,
        permanent: true,
      }))
    return [
      ...noteRedirects,
      {
        // Duplicate of the note above, removed 2026-09-30
        source:
          "/lab/notes/2026-08-15--the-cybernetic-teammate-a-field-experiment-on-generative-ai---dt-20260815-225343-c010--claude-personal",
        destination:
          "/lab/notes/the-cybernetic-teammate-a-field-experiment-on-generative-ai",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' img.youtube.com data: https://*.google-analytics.com https://*.googletagmanager.com",
              "font-src 'self'",
              "frame-src https://www.youtube-nocookie.com",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig
