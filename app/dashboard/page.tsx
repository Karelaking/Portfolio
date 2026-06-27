import Link from "next/link";
import type { ReactElement } from "react";
import { getExperience, getExpertise } from "@/lib/portfolio/queries";
import type { ExperienceItem } from "@/types/experience-item.interface";
import type { ExpertiseItem } from "@/types/expertise-item.interface";

type DashboardLinkItem = {
	label: string;
	href: string;
};

interface ExperienceFetchResult {
	items: ExperienceItem[];
}

interface ExpertiseFetchResult {
	items: ExpertiseItem[];
}

const dashboardLinks: DashboardLinkItem[] = [
	{ label: "Manage projects", href: "/dashboard/projects" },
	{ label: "Manage hero section", href: "/dashboard/hero" },
	{ label: "Manage experience", href: "/dashboard/experience" },
	{ label: "Manage expertise", href: "/dashboard/expertise" },
	{ label: "Manage technologies", href: "/dashboard/technologies" },
	{ label: "Manage gallery", href: "/dashboard/gallery" },
	{ label: "Manage writing", href: "/dashboard/writing" },
	{ label: "View portfolio", href: "/" },
	{ label: "Auth settings", href: "/login" },
];

const fetchExperiencePreview = async (): Promise<ExperienceFetchResult> => {
	const items = await getExperience();
	return { items };
};

const fetchExpertisePreview = async (): Promise<ExpertiseFetchResult> => {
	const items = await getExpertise();
	return { items };
};

const DashboardPage = async (): Promise<ReactElement> => {
	const [{ items: experienceItems }, { items: expertiseItems }] =
		await Promise.all([fetchExperiencePreview(), fetchExpertisePreview()]);
	const latestExperience = experienceItems.slice(0, 3);
	const latestExpertise = expertiseItems.slice(0, 3);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-semibold text-3xl">Dashboard</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Manage your portfolio data from one place.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{dashboardLinks.map((link) => (
					<Link
						className="rounded-2xl border border-border/70 bg-card p-5 text-sm transition hover:border-foreground"
						href={link.href}
						key={link.href}
					>
						{link.label}
					</Link>
				))}
			</div>
			<section className="rounded-3xl border border-border/70 bg-card p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-2">
						<div className="flex flex-wrap items-center gap-3">
							<h2 className="font-semibold text-xl">Experience</h2>
							<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
								{experienceItems.length} total
							</span>
						</div>
						<p className="text-muted-foreground text-sm">
							Manage your timeline entries and keep your portfolio up to date.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Link
							className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/experience"
						>
							Manage experience
						</Link>
						<Link
							className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/experience/new"
						>
							Add new
						</Link>
					</div>
				</div>

				{latestExperience.length > 0 ? (
					<ul className="mt-5 space-y-3">
						{latestExperience.map((item) => (
							<li
								className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3"
								key={item.id}
							>
								<p className="font-semibold text-sm">{item.role}</p>
								<p className="mt-1 text-muted-foreground text-xs">
									{item.company} · {item.period}
								</p>
							</li>
						))}
					</ul>
				) : (
					<div className="mt-5 rounded-2xl border border-border/60 border-dashed bg-background/40 p-4 text-muted-foreground text-sm">
						No experience entries yet. Add your first one to publish it in the
						portfolio timeline.
					</div>
				)}
			</section>

			<section className="rounded-3xl border border-border/70 bg-card p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-2">
						<div className="flex flex-wrap items-center gap-3">
							<h2 className="font-semibold text-xl">Expertise</h2>
							<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
								{expertiseItems.length} total
							</span>
						</div>
						<p className="text-muted-foreground text-sm">
							Curate the expertise cards that appear in your portfolio section.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Link
							className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/expertise"
						>
							Manage expertise
						</Link>
						<Link
							className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/expertise/new"
						>
							Add new
						</Link>
					</div>
				</div>

				{latestExpertise.length > 0 ? (
					<ul className="mt-5 space-y-3">
						{latestExpertise.map((item) => (
							<li
								className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3"
								key={item.id}
							>
								<div className="flex flex-wrap items-center justify-between gap-2">
									<p className="font-semibold text-sm">{item.title}</p>
									<span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
										{item.icon}
									</span>
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									{item.description}
								</p>
							</li>
						))}
					</ul>
				) : (
					<div className="mt-5 rounded-2xl border border-border/60 border-dashed bg-background/40 p-4 text-muted-foreground text-sm">
						No expertise entries yet. Add your first one to publish it in the
						expertise section.
					</div>
				)}
			</section>

			<p className="text-muted-foreground text-xs">
				Tell me which CRUD sections you want and I’ll add them here.
			</p>
		</div>
	);
};

export default DashboardPage;
