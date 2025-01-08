import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '3.125.43.204'
      }
    ]
  }
};

export default nextConfig;
