import type { Metadata } from "next";
import type React from "react";
import { getTechnologiesAction } from "@/actions";
import {
	Container,
	SectionHeader,
	SectionOrnament,
} from "@/components/serverComponent";
import { getTechnologyLogo } from "@/data/Technology";
import { toAbsoluteUrl } from "@/lib/siteConfig";
import type { TechnologyItem } from "@/types/technology-item.interface";

export const metadata: Metadata = {
	title: "Tech Stack and Expertise | MK Katiyar",
	description:
		"Explore MK Katiyar's technical expertise across frameworks, tools, and project-backed implementation experience.",
	alternates: {
		canonical: "/expertise",
	},
	openGraph: {
		title: "Tech Stack and Expertise | MK Katiyar",
		description:
			"Frameworks, tools, and project-backed expertise used by MK Katiyar.",
		url: "/expertise",
		type: "website",
	},
	twitter: {
		title: "Tech Stack and Expertise | MK Katiyar",
		description:
			"Frameworks, tools, and project-backed expertise used by MK Katiyar.",
	},
};

const technologies = await getTechnologiesAction();

const getWebsiteLabel = (websiteUrl: string): string =>
	websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

const getRelatedProjectTags = (technology: TechnologyItem): string[] => {
	const relatedTags = technology.relatedProjects
		.flatMap((project) => project.tags)
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0);

	return Array.from(new Set(relatedTags)).slice(0, 8);
};

const ExpertiseRoutePage = (): React.ReactElement => {
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
		<>
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
			<Container
				className="relative flex flex-col gap-8 border-border/70 py-12"
				id="expertise"
			>
				<SectionOrnament className="top-10 right-10" />

				<div className="mt-4 space-y-4">
					<SectionHeader
						as="h1"
						copy="Frameworks and tools with related projects, tags, and direct links."
						label="Tech Stack"
						title="Core technologies I build with"
					/>

					<div className="grid gap-6 md:grid-cols-3">
						{technologies.map((technology) => {
							const relatedProjects = technology.relatedProjects.slice(0, 3);
							const relatedTags = getRelatedProjectTags(technology);

							return (
								<article
									className="rounded-3xl border border-border/70 bg-card p-6"
									key={technology.id}
								>
									<div className="flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
											{getTechnologyLogo(technology.logoKey)}
										</span>
										<div>
											<h2 className="font-semibold text-foreground text-lg">
												{technology.name}
											</h2>
											<a
												className="text-muted-foreground text-xs uppercase tracking-[0.16em] transition hover:text-foreground"
												href={technology.websiteUrl}
												rel="noreferrer"
												target="_blank"
											>
												{getWebsiteLabel(technology.websiteUrl)}
											</a>
										</div>
									</div>

									<p className="mt-3 text-muted-foreground text-sm">
										{technology.description}
									</p>

									{relatedTags.length > 0 ? (
										<div className="mt-4 flex flex-wrap gap-2">
											{relatedTags.map((tag) => (
												<span
													className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
													key={`${technology.id}-${tag}`}
												>
													{tag}
												</span>
											))}
										</div>
									) : null}

									<div className="mt-5 space-y-2 border-border/70 border-t pt-4">
										<p className="text-foreground text-xs uppercase tracking-[0.2em]">
											Related Projects
										</p>

										{relatedProjects.length > 0 ? (
											relatedProjects.map((project) => (
												<div
													className="space-y-2"
													key={`${technology.id}-${project.id}`}
												>
													<a
														className="font-medium text-sm underline-offset-4 hover:underline"
														href={project.href}
														rel="noreferrer"
														target="_blank"
													>
														{project.name}
													</a>
													<div className="flex flex-wrap gap-2">
														{project.tags.map((tag) => (
															<span
																className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground uppercase tracking-[0.16em]"
																key={`${project.id}-${technology.id}-${tag}`}
															>
																{tag}
															</span>
														))}
													</div>
												</div>
											))
										) : (
											<p className="text-muted-foreground text-sm">
												No related projects found yet.
											</p>
										)}
									</div>
								</article>
							);
						})}
					</div>

					{technologies.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No technologies found in the database yet.
						</p>
					) : null}
				</div>
			</Container>
		</>
	);
};

export default ExpertiseRoutePage;
