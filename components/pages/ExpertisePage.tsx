import type React from "react";
import { getTechnologyLogo } from "@/data/Technology";
import { getTechnologies } from "@/lib";
import type { TechnologyItem } from "@/types/technology-item.interface";
import { Container, SectionHeader } from "../serverComponent";
import { SectionOrnament } from "../serverComponent/section-ornament";

// const expertise = await getExpertiseAction();
const technologies = await getTechnologies();
const REGEX_URL = /^https?:\/\//;
const REGEX_DOMAIN = /\/$/;

const getRelatedProjectTags = (technology: TechnologyItem): string[] => {
	const relatedTags = technology.relatedProjects
		.flatMap((project) => project.tags)
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0);
	return Array.from(new Set(relatedTags)).slice(0, 8);
};

export const ExpertisePage = (): React.ReactElement => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="expertise"
	>
		<SectionOrnament className="top-10 right-10" />

		<div className="mt-4 space-y-4">
			<SectionHeader
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
							className="group rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:bg-background/80 hover:shadow-foreground/5 hover:shadow-xl"
							key={technology.id}
						>
							<div className="flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
									{getTechnologyLogo(technology.logoKey)}
								</span>
								<div>
									<h3 className="font-semibold text-foreground text-lg transition-colors duration-300 group-hover:text-primary">
										{technology.name}
									</h3>
									<a
										className="text-muted-foreground text-xs uppercase tracking-[0.16em] transition-all duration-300 hover:text-foreground hover:tracking-[0.2em]"
										href={technology.websiteUrl}
										rel="noreferrer"
										target="_blank"
									>
										{technology.websiteUrl
											.replace(REGEX_URL, "")
											.replace(REGEX_DOMAIN, "")}
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
											className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/35 hover:bg-muted/50"
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
											className="space-y-2 transition-transform duration-300 hover:translate-x-0.5"
											key={`${technology.id}-${project.id}`}
										>
											<a
												className="font-medium text-sm underline-offset-4 transition-all duration-200 hover:tracking-[0.04em] hover:underline"
												href={project.href}
												rel="noreferrer"
												target="_blank"
											>
												{project.name}
											</a>
											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag) => (
													<span
														className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-muted/80"
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
);
