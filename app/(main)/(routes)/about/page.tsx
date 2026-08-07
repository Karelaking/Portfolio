import type { Metadata } from "next";
import type React from "react";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
	title: "About MK Katiyar | Full-Stack Software Developer",
	description:
		"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "About MK Katiyar | Full-Stack Software Developer",
		description:
			"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
		url: "/about",
		type: "website",
	},
	twitter: {
		title: "About MK Katiyar | Full-Stack Software Developer",
		description:
			"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
	},
};

const AboutRoutePage = (): React.ReactElement => {
	return <AboutPage />;
};

export default AboutRoutePage;
