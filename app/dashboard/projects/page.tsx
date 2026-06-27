import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { cache, Suspense } from "react";
import { ProjectDeleteButton } from "@/components/clientComponent";
import { ProjectsPanelSkeleton } from "@/components/serverComponent/skeletons";
import { getProjectRepository } from "@/lib/repositories/projects/get-project-repository";
import type { ProjectItem } from "@/types";

interface ProjectFetchResult {
	error?: string;
	projects: ProjectItem[];
}

const fetchProjects = cache(async (): Promise<ProjectFetchResult> => {
	const repository = getProjectRepository();
	const result = await repository.getAll();

	return {
		projects: result.projects,
		error: result.error,
	};
});

const ProjectsPanel = async (): Promise<ReactElement> => {
	const { projects, error } = await fetchProjects();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Projects</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{projects.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Manage your portfolio projects with quick edits, previews, and
						cleanup.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/projects/new"
				>
					New project
				</Link>
			</div>

			<div className="space-y-4">
				{error ? (
					<div className="rounded-3xl border border-red-500/40 bg-card p-6 text-red-500 text-sm">
						{error}
					</div>
				) : null}
				{projects.length === 0 ? (
					<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
						<div className="space-y-3">
							<p className="text-muted-foreground text-sm">
								No projects yet. Add your first project to start building your
								portfolio.
							</p>
							<Link
								className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
								href="/dashboard/projects/new"
							>
								Create project
							</Link>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{projects.map((project) => (
							<article
								className="group flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5"
								key={project.id}
							>
								<div className="flex flex-col gap-4 sm:flex-row">
									<div className="relative h-32 w-full overflow-hidden rounded-2xl border border-border/70 bg-background sm:h-28 sm:w-44">
										<Image
											alt={project.imageAlt}
											className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
											height={224}
											sizes="(min-width: 1024px) 320px, (min-width: 640px) 176px, 100vw"
											src={project.imageSrc}
											width={320}
										/>
									</div>
									<div className="flex-1 space-y-3">
										<div className="flex flex-wrap items-start justify-between gap-3">
											<div className="space-y-1">
												<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
													Project
												</p>
												<p className="font-semibold text-lg">{project.name}</p>
											</div>
											<a
												className="inline-flex items-center gap-2 font-semibold text-foreground text-xs uppercase tracking-[0.25em] transition hover:text-muted-foreground"
												href={project.href}
												rel="noreferrer"
												target="_blank"
											>
												Visit
												<span aria-hidden="true">↗</span>
											</a>
										</div>
										<p className="text-muted-foreground text-sm">
											{project.description}
										</p>
										{project.tags.length > 0 ? (
											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag) => (
													<span
														className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
														key={tag}
													>
														{tag}
													</span>
												))}
											</div>
										) : null}
									</div>
								</div>
								<div className="flex flex-wrap gap-2">
									<Link
										className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
										href={`/dashboard/projects/${project.id}/edit`}
									>
										Edit
									</Link>
									<ProjectDeleteButton projectId={project.id} />
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const ProjectsPage = (): ReactElement => (
	<Suspense fallback={<ProjectsPanelSkeleton />}>
		<ProjectsPanel />
	</Suspense>
);

export default ProjectsPage;
