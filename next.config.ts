import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export so Next.js generates an "out" folder
  images: {
    unoptimized: true, // Required for static export when using remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
