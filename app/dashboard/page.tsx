import type { ReactElement } from "react";
import Link from "next/link";
import { getExperience } from "@/lib/portfolio/queries";
import { getExpertise } from "@/lib/portfolio/queries";
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
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage your portfolio data from one place.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {dashboardLinks.map((link) => (
          <Link
            className="border-border/70 bg-card hover:border-foreground rounded-2xl border p-5 text-sm transition"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <section className="border-border/70 bg-card rounded-3xl border p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">Experience</h2>
              <span className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] uppercase">
                {experienceItems.length} total
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Manage your timeline entries and keep your portfolio up to date.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
              href="/dashboard/experience"
            >
              Manage experience
            </Link>
            <Link
              className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
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
                className="border-border/60 bg-background/40 rounded-2xl border px-4 py-3"
                key={item.id}
              >
                <p className="text-sm font-semibold">{item.role}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {item.company} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-border/60 bg-background/40 text-muted-foreground mt-5 rounded-2xl border border-dashed p-4 text-sm">
            No experience entries yet. Add your first one to publish it in the
            portfolio timeline.
          </div>
        )}
      </section>

      <section className="border-border/70 bg-card rounded-3xl border p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">Expertise</h2>
              <span className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] uppercase">
                {expertiseItems.length} total
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Curate the expertise cards that appear in your portfolio section.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
              href="/dashboard/expertise"
            >
              Manage expertise
            </Link>
            <Link
              className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
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
                className="border-border/60 bg-background/40 rounded-2xl border px-4 py-3"
                key={item.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                    {item.icon}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-border/60 bg-background/40 text-muted-foreground mt-5 rounded-2xl border border-dashed p-4 text-sm">
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
