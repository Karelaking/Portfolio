import type { Metadata } from "next";
import type React from "react";
import {
	AboutPage,
	ContactPage,
	ExperiencePage,
	ExpertisePage,
	GalleryPage,
	HeroPage,
	ProjectsPage,
	WritingPage,
} from "@/components/pages";

export const metadata: Metadata = {
	title: "Full-Stack Software Developer Portfolio",
	description:
		"Discover MK Katiyar's full-stack developer portfolio showcasing Next.js applications, technical expertise, backend engineering experience, and creative writing.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "MK Katiyar | Full-Stack Software Developer Portfolio",
		description:
			"Explore projects, tech stack, professional experience, writing, and contact details in MK Katiyar's software engineering portfolio.",
		url: "/",
		type: "website",
	},
	twitter: {
		title: "MK Katiyar | Full-Stack Software Developer Portfolio",
		description:
			"Explore projects, tech stack, professional experience, writing, and contact details in MK Katiyar's software engineering portfolio.",
	},
};

const page = (): React.JSX.Element => (
	<div className="bg-transparent px-0">
		<HeroPage />
		<AboutPage />
		<ExpertisePage />
		<ExperiencePage />
		<ProjectsPage />
		<WritingPage />
		<GalleryPage />
		<ContactPage />
	</div>
);

export default page;
