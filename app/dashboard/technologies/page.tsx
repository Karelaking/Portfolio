import Link from "next/link";
import type { ReactElement } from "react";
import { TechnologyDeleteButton } from "@/components/clientComponent";
import { getTechnologies } from "@/lib/portfolio/queries";

const TechnologiesPage = async (): Promise<ReactElement> => {
	const technologies = await getTechnologies();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Technologies</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{technologies.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Store technology details and connect each technology to related
						projects.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/technologies/new"
				>
					New technology
				</Link>
			</div>

			{technologies.length === 0 ? (
				<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
					<p className="text-muted-foreground text-sm">
						No technologies yet. Add your first technology entry.
					</p>
				</div>
			) : (
				<div className="space-y-4">
					{technologies.map((technology) => (
						<article
							className="rounded-3xl border border-border/70 bg-card p-6"
							key={technology.id}
						>
							<div className="space-y-2">
								<div className="flex flex-wrap items-center gap-2">
									<p className="font-semibold text-lg">{technology.name}</p>
									<span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
										{technology.logoKey}
									</span>
								</div>
								<a
									className="text-muted-foreground text-xs uppercase tracking-[0.2em] hover:text-foreground"
									href={technology.websiteUrl}
									rel="noreferrer"
									target="_blank"
								>
									{technology.websiteUrl}
								</a>
								<p className="text-muted-foreground text-sm">
									{technology.description}
								</p>
							</div>

							<div className="mt-4 border-border/70 border-t pt-4">
								<p className="text-foreground text-xs uppercase tracking-[0.2em]">
									Connected Projects
								</p>
								{technology.relatedProjects.length > 0 ? (
									<ul className="mt-2 space-y-1">
										{technology.relatedProjects.map((project) => (
											<li
												className="text-muted-foreground text-sm"
												key={project.id}
											>
												{project.name}
											</li>
										))}
									</ul>
								) : (
									<p className="mt-2 text-muted-foreground text-sm">
										No connected projects yet.
									</p>
								)}
							</div>

							<div className="mt-4 flex flex-wrap gap-2">
								<Link
									className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
									href={`/dashboard/technologies/${technology.id}/edit`}
								>
									Edit
								</Link>
								<TechnologyDeleteButton technologyId={technology.id} />
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
};

export default TechnologiesPage;
