import type { NextConfig } from "next";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const supabaseHostname = (() => {
  if (!supabaseUrl) {
    return null;
  }
  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return null;
  }
})();

const remotePatterns: NextConfig["images"] = {
  remotePatterns: [
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

if (supabaseHostname) {
  remotePatterns.remotePatterns?.push({
    protocol: "https",
    hostname: supabaseHostname,
  });
}

const nextConfig: NextConfig = {
  images: remotePatterns,
  experimental: {
  },
};

export default nextConfig;
