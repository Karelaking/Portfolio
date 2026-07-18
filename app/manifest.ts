import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "MK Katiyar",
		short_name: "MK Katiyar",
		description:
			"Explore MK Katiyar's featuring full-stack projects, engineering experience, technical writing, and creative works.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/icon",
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: "/apple-icon",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}
