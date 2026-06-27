import Link from "next/link";
import type { ReactElement } from "react";
import { ExpertiseDeleteButton } from "@/components/clientComponent";
import { getExpertise } from "@/lib/portfolio/queries";
import type { ExpertiseItem } from "@/types/expertise-item.interface";

interface ExpertiseFetchResult {
	items: ExpertiseItem[];
}

const fetchExpertise = async (): Promise<ExpertiseFetchResult> => {
	const items = await getExpertise();
	return { items };
};

const ExpertisePage = async (): Promise<ReactElement> => {
	const { items } = await fetchExpertise();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Expertise</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{items.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Manage expertise cards shown in your portfolio section.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/expertise/new"
				>
					New expertise
				</Link>
			</div>

			{items.length === 0 ? (
				<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm">
							No expertise entries yet. Add your first card to get started.
						</p>
						<Link
							className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/expertise/new"
						>
							Add expertise
						</Link>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{items.map((item) => (
						<article
							className="rounded-3xl border border-border/70 bg-card p-6"
							key={item.id}
						>
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div className="space-y-2">
									<div className="flex flex-wrap items-center gap-2">
										<p className="font-semibold text-lg">{item.title}</p>
										<span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
											{item.icon}
										</span>
									</div>
									<p className="text-muted-foreground text-sm">
										{item.description}
									</p>
								</div>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								<Link
									className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
									href={`/dashboard/expertise/${item.id}/edit`}
								>
									Edit
								</Link>
								<ExpertiseDeleteButton expertiseId={item.id} />
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
};

export default ExpertisePage;
