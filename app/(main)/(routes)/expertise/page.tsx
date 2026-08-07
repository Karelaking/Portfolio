import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getTechnologiesAction } from "@/actions";
import { HeaderMenuPopover } from "@/components/clientComponent";
import { getTechnologyLogo } from "@/data/Technology";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Tech Stack, Skills & Expertise | MK Katiyar",
	description:
		"Explore MK Katiyar's technical expertise, skills and backend/frontend stack. Review project-backed implementation experience with modern tools.",
	alternates: {
		canonical: "/expertise",
	},
	openGraph: {
		title: "Tech Stack, Skills & Expertise | MK Katiyar",
		description:
			"Explore MK Katiyar's technical expertise, skills and backend/frontend stack. Review project-backed implementation experience with modern tools.",
		url: "/expertise",
		type: "website",
	},
	twitter: {
		title: "Tech Stack, Skills & Expertise | MK Katiyar",
		description:
			"Explore MK Katiyar's technical expertise, skills and backend/frontend stack. Review project-backed implementation experience with modern tools.",
	},
};

const ExpertiseRoutePage = async (): Promise<React.ReactElement> => {
	const technologies = await getTechnologiesAction();

	const expertiseCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Tech Stack and Expertise",
		description:
			"Frameworks, tools, and project-backed technical expertise by MK Katiyar.",
		url: toAbsoluteUrl("/expertise"),
	};

	const expertiseListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Technology stack",
		itemListElement: technologies.map((technology, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Thing",
				name: technology.name,
				url: technology.websiteUrl,
			},
		})),
	};

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(expertiseCollectionJsonLd),
				}}
				type="application/ld+json"
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(expertiseListJsonLd),
				}}
				type="application/ld+json"
			/>

			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Header Row (Single Unified Navbar) */}
				<header className="sticky top-0 z-40 flex flex-nowrap items-center justify-between gap-2 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-10 sm:py-4">
					<div className="flex items-center gap-2.5 min-w-0 sm:gap-6">
						<Link className="flex items-center gap-2 min-w-0 sm:gap-2.5" href="/">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white sm:h-8 sm:w-8">
								MK
							</span>
							<span className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase truncate sm:text-xl">
								mradul katiyar
							</span>
						</Link>
					</div>

					<div className="flex items-center gap-2 shrink-0 sm:gap-3">
						<HeaderMenuPopover />
					</div>
				</header>

				{/* Title Header */}
				<div className="border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
						// TECH STACK ARCHIVE
					</span>
					<h1 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
						CORE TECHNOLOGIES & TOOLKITS
					</h1>
					<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
						Full overview of languages, frameworks, databases, and platform infrastructure engineered for speed and resilience.
					</p>
				</div>

				{/* Tech Stack Logo Grid with Intersection Corner Nodes */}
				<div className="flex-1 bg-white">
					<div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 border-b border-neutral-200 bg-white sm:grid-cols-3 md:grid-cols-4 items-stretch">
						{technologies.map((tech) => (
							<div
								className="group relative flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:bg-neutral-50/80 min-h-40 sm:min-h-45"
								key={tech.id}
							>
								{/* Grid Intersection Corner Node Dots */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />

								{/* Tech Logo Icon */}
								<div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110">
									{getTechnologyLogo(tech.logoKey || tech.name)}
								</div>

								{/* Tech Name */}
								<h2 className="mt-4 font-extrabold text-base text-neutral-900 tracking-tight uppercase transition-colors duration-300 group-hover:text-black sm:text-lg">
									{tech.name}
								</h2>

								{/* Website Link */}
								<a
									className="mt-1 font-mono text-[10px] text-neutral-400 tracking-widest uppercase transition-colors duration-300 group-hover:text-neutral-700 hover:underline"
									href={tech.websiteUrl}
									rel="noreferrer"
									target="_blank"
								>
									{tech.name.toLowerCase()}.dev ↗
								</a>
							</div>
						))}
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						TOTAL {technologies.length} TECHNOLOGIES & TOOLKITS
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

export default ExpertiseRoutePage;
