import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getExperienceAction } from "@/actions/dashboard";
import { ExperienceCard } from "@/components/clientComponent";
import {
	Container,
	SectionHeader,
	SectionOrnament,
} from "@/components/serverComponent";
import type { ExperienceItem } from "@/types";

export const metadata: Metadata = {
	title: "Engineering & Software Experience | MK Katiyar",
	description:
		"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
	alternates: {
		canonical: "/experience",
	},
	openGraph: {
		title: "Engineering & Software Experience | MK Katiyar",
		description:
			"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
		url: "/experience",
		type: "website",
	},
	twitter: {
		title: "Engineering & Software Experience | MK Katiyar",
		description:
			"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
	},
};

const experience = await getExperienceAction();

const ExperiencePage = (): React.ReactElement => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="experience"
	>
		<SectionOrnament className="right-6" />
		<SectionHeader
			as="h1"
			copy="Product, studio, and engineering roles that refined the craft."
			label="Experience"
			title="Proof of my tech journey"
		/>
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{experience.map((item: ExperienceItem, index: number) => (
				<ExperienceCard index={index} item={item} key={item.id} />
			))}
		</div>
		<div className="flex justify-center">
			<Link
				className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
				href="/"
			>
				<IconArrowUpLeft size={14} />
				Back
			</Link>
		</div>
	</Container>
);

export default ExperiencePage;
