import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay otro package-lock.json suelto en el perfil de usuario; sin esto
  // Next.js infiere mal la raíz del workspace.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Serve modern formats (AVIF first, WebP fallback) for smaller payloads.
    formats: ["image/avif", "image/webp"],
    // Allow optimizing remote YouTube thumbnails through next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
