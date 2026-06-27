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
	title: "Full-Stack Developer Portfolio",
	description:
		"Discover MK Katiyar's full-stack portfolio with projects, technical expertise, experience, writing, and contact details.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "MK Katiyar | Full-Stack Developer Portfolio",
		description:
			"Projects, expertise, experience, writing, and contact details in one portfolio.",
		url: "/",
		type: "website",
	},
	twitter: {
		title: "MK Katiyar | Full-Stack Developer Portfolio",
		description:
			"Projects, expertise, experience, writing, and contact details in one portfolio.",
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
