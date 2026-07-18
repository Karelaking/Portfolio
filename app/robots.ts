import type { MetadataRoute } from "next";
import { siteConfig, toAbsoluteUrl } from "@/lib/siteConfig";

const disallowedPaths = ["/dashboard", "/dashboard/", "/api/"];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: disallowedPaths,
		},
		host: siteConfig.url,
		sitemap: toAbsoluteUrl("/sitemap.xml"),
	};
}
