import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { getProjects } from "@/lib/portfolio/queries";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

const projects = await getProjects();
const featuredProjects = projects.slice(0, 4);

export const ProjectsPage = (): React.ReactElement => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="projects"
	>
		<SectionOrnament className="right-8" />
		<SectionHeader
			copy="A snapshot of recent work across product and interface design."
			label="Projects"
			title="Love to work with different tech"
		/>
		<div className="grid gap-6 md:grid-cols-2">
			{featuredProjects.map((project) => (
				<article
					className="rounded-3xl border border-border/70 bg-card p-6"
					key={project.id}
				>
					<Image
						alt={project.imageAlt?.trim() || `${project.name} project preview`}
						className="h-40 w-full rounded-2xl border border-border bg-background object-cover"
						height={360}
						sizes="(min-width: 768px) 50vw, 100vw"
						src={project.imageSrc}
						width={520}
					/>
					<div className="mt-4 flex items-start justify-between gap-4">
						<div>
							<h3 className="font-semibold text-lg">{project.name}</h3>
							<p className="mt-2 text-muted-foreground text-sm">
								{project.description}
							</p>
						</div>
						<a
							className="flex items-center gap-2 text-foreground text-xs uppercase tracking-[0.3em]"
							href={project.href}
							rel="noreferrer"
							target="_blank"
						>
							View
							<IconArrowUpRight size={16} />
						</a>
					</div>
					<div className="mt-4 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
								key={tag}
							>
								{tag}
							</span>
						))}
					</div>
				</article>
			))}
		</div>
		{projects.length > featuredProjects.length ? (
			<div className="flex justify-center">
				<Link
					className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/projects"
				>
					Show more
					<IconArrowUpRight size={14} />
				</Link>
			</div>
		) : null}
	</Container>
);
