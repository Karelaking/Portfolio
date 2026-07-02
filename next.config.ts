import path from "node:path";
import type { NextConfig } from "next";

const appEnv: string = process.env.NODE_ENV ?? "development";
const isProduction: boolean = appEnv === "production";
const siteUrl: string =
	process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
	(isProduction ? "https://example.com" : "http://localhost:3000");

// Removed the CustomNextConfig interface and cleaned up the configuration
const nextConfig: NextConfig = {
	env: {
		// Only expose safe public values here. Do NOT add private secrets.
		NEXT_PUBLIC_APP_ENV: appEnv,
		NEXT_PUBLIC_SITE_URL: siteUrl,
	},
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
			{
				protocol: "https",
				hostname: "images.unsplash.com",
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
	allowedDevOrigins: ["192.168.29.142"],
};

export default nextConfig;
