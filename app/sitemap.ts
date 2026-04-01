import type { MetadataRoute } from "next";
import { toAbsoluteUrl } from "@/lib/siteConfig";

const now = new Date();

const publicRoutes: Array<{
	path: string;
	changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
	priority: number;
}> = [
		{ path: "/", changeFrequency: "weekly", priority: 1 },
		{ path: "/experience", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/expertise", changeFrequency: "monthly", priority: 0.75 },
		{ path: "/projects", changeFrequency: "monthly", priority: 0.75 },
		{ path: "/writing", changeFrequency: "weekly", priority: 0.72 },
		{ path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
	];

export default function sitemap(): MetadataRoute.Sitemap {
	return publicRoutes.map((route) => ({
		url: toAbsoluteUrl(route.path),
		lastModified: now,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));
}
