import type { NextConfig } from "next";
import path from "node:path";

const remotePatterns: NextConfig["images"] = {
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
      hostname: "images.unsplash.com",
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
      hostname: "example.com",
    },
    {
      protocol: "https",
      hostname: "media.licdn.com",
    },
  ],
};

const nextConfig: NextConfig = {
  images: remotePatterns,
  outputFileTracingRoot: path.resolve(process.cwd()),
  experimental: {},
};

export default nextConfig;
