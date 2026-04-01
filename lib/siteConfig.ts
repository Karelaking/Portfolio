const fallbackSiteUrl = "https://example.com";

const normalizeUrl = (url: string): string => {
	return url.replace(/\/+$/, "");
};

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
	name: "MK Katiyar Portfolio",
	description:
		"Explore MK Katiyar's portfolio featuring full-stack projects, engineering experience, technical expertise, writing, and gallery work.",
	url: normalizeUrl(configuredSiteUrl || fallbackSiteUrl),
	profiles: [
		"https://github.com/Karelaking",
		"https://www.linkedin.com/in/kumar-mradul-katiyar",
		"https://www.instagram.com/katiyar.karelaking",
	],
};

export const siteUrl = new URL(siteConfig.url);

export const toAbsoluteUrl = (path: string): string => {
	return new URL(path, siteUrl).toString();
};
