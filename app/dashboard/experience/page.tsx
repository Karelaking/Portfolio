import type { ReactElement } from "react";
import Link from "next/link";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import type { ExperienceItem } from "@/lib/portfolio/types";
import { ExperienceDeleteButton } from "@/components/dashboard/experience-delete-button";

interface ExperienceFetchResult {
  items: ExperienceItem[];
  error?: string;
}

const fetchExperience = async (): Promise<ExperienceFetchResult> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return {
      items: [],
      error:
        "Supabase client not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the dev server.",
    };
  }

  const { data, error } = await client
    .from("experience")
    .select("id,role,company,period,summary,highlights")
    .order("order_index", { ascending: true });

  if (error) {
    return {
      items: [],
      error: `Supabase error: ${error.message}`,
    };
  }

  return { items: (data as ExperienceItem[]) ?? [] };
};

const ExperiencePage = async (): Promise<ReactElement> => {
  const { items, error } = await fetchExperience();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Experience</h1>
            <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {items.length} total
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage the experience timeline shown on your portfolio.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
          href="/dashboard/experience/new"
        >
          New experience
        </Link>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-500/40 bg-card p-6 text-sm text-red-500">
          {error}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/70 bg-card p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No experience entries yet. Add your first role to get started.
            </p>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
              href="/dashboard/experience/new"
            >
              Add experience
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
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold">{item.role}</p>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.highlights.map((highlight) => (
                  <li key={`${item.id}-${highlight}`}>• {highlight}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
                  href={`/dashboard/experience/${item.id}/edit`}
                >
                  Edit
                </Link>
                <ExperienceDeleteButton experienceId={item.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperiencePage;
