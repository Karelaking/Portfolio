import Link from "next/link";
import type { ReactElement } from "react";
import { ExperienceDeleteButton } from "@/components/clientComponent";
import { splitExperienceHighlights } from "@/lib/portfolio/experience-tech";
import { getExperience } from "@/lib/portfolio/queries";
import type { ExperienceItem } from "@/types/experience-item.interface";

interface ExperienceFetchResult {
	items: ExperienceItem[];
}

const fetchExperience = async (): Promise<ExperienceFetchResult> => {
	const items = await getExperience();
	return { items };
};

const ExperiencePage = async (): Promise<ReactElement> => {
	const { items } = await fetchExperience();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Experience</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{items.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Manage the experience timeline shown on your portfolio.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/experience/new"
				>
					New experience
				</Link>
			</div>

			{items.length === 0 ? (
				<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm">
							No experience entries yet. Add your first role to get started.
						</p>
						<Link
							className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/experience/new"
						>
							Add experience
						</Link>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{items.map((item) => {
						const parsedHighlights = splitExperienceHighlights(item.highlights);

						return (
							<article
								className="rounded-3xl border border-border/70 bg-card p-6"
								key={item.id}
							>
								<div className="flex flex-wrap items-baseline justify-between gap-2">
									<div>
										<p className="font-semibold text-lg">{item.role}</p>
										<p className="text-muted-foreground text-sm">
											{item.company}
										</p>
									</div>
									<span className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
										{item.period}
									</span>
								</div>
								<p className="mt-3 text-muted-foreground text-sm">
									{item.summary}
								</p>
								{parsedHighlights.coreTech.length > 0 ? (
									<div className="mt-4 flex flex-wrap gap-2">
										{parsedHighlights.coreTech.map((tech) => (
											<span
												className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-[10px] text-primary uppercase tracking-[0.2em]"
												key={`${item.id}-core-${tech}`}
											>
												{tech}
											</span>
										))}
									</div>
								) : null}
								<ul className="mt-4 space-y-2 text-sm">
									{parsedHighlights.highlights.map((highlight) => (
										<li key={`${item.id}-${highlight}`}>• {highlight}</li>
									))}
								</ul>
								<div className="mt-4 flex flex-wrap gap-2">
									<Link
										className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
										href={`/dashboard/experience/${item.id}/edit`}
									>
										Edit
									</Link>
									<ExperienceDeleteButton experienceId={item.id} />
								</div>
							</article>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ExperiencePage;
