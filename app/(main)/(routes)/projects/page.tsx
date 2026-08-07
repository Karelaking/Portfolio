import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getProjectsAction } from "@/actions/dashboard";
import { HeaderMenuPopover, ProjectsGrid } from "@/components/clientComponent";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Full-Stack Projects & Case Studies | MK Katiyar",
	description:
		"Explore shipped full-stack projects by MK Katiyar, featuring problem statements, software architectures, frontend/backend stack highlights, and live demos.",
	alternates: {
		canonical: "/projects",
	},
	openGraph: {
		title: "Full-Stack Projects & Case Studies | MK Katiyar",
		description:
			"Explore shipped full-stack projects by MK Katiyar, featuring problem statements, software architectures, frontend/backend stack highlights, and live demos.",
		url: "/projects",
		type: "website",
	},
	twitter: {
		title: "Full-Stack Projects & Case Studies | MK Katiyar",
		description:
			"Explore shipped full-stack projects by MK Katiyar, featuring problem statements, software architectures, frontend/backend stack highlights, and live demos.",
	},
};

const ProjectsRoutePage = async (): Promise<React.ReactElement> => {
	const projects = await getProjectsAction();

	const projectsCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Projects by MK Katiyar",
		description:
			"A curated collection of full-stack projects with demos and technology tags.",
		url: toAbsoluteUrl("/projects"),
	};

	const projectsListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Project archive",
		itemListElement: projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "CreativeWork",
				name: project.name,
				url: project.href,
			},
		})),
	};

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(projectsCollectionJsonLd),
				}}
				type="application/ld+json"
			/>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListJsonLd) }}
				type="application/ld+json"
			/>

			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Title Header */}
				<div className="border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
						// PROJECT ARCHIVE
					</span>
					<h1 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
						COMPLETE SHIPPED PROJECTS & CASE STUDIES
					</h1>
					<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
						Explore the complete engineering archive featuring live product demos, architecture details, and technical stack specifications.
					</p>
				</div>

				{/* Bin-Packed 2-Column Sharp Bordered Grid */}
				<div className="flex-1">
					<ProjectsGrid projects={projects} />
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						TOTAL {projects.length} SHIPPED PROJECTS
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="/"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Home
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Home
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
							<span className="inline-flex transition-transform duration-300 group-hover:-translate-x-5 group-hover:-translate-y-5">
								<IconArrowUpLeft size={16} />
							</span>
							<span className="absolute inline-flex translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
								<IconArrowUpLeft size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ProjectsRoutePage;
