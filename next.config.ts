import type { NextConfig } from "next";
import path from "node:path";

// Removed the CustomNextConfig interface and cleaned up the configuration
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "www.instagram.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
    qualities: [75, 90],
  },
  outputFileTracingRoot: path.resolve(process.cwd()),
  logging: {
    browserToTerminal: true,
  },
  reactCompiler: {
    compilationMode: "annotation",
  },
  experimental: {},
};

export default nextConfig;
