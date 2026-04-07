import type { ReactElement } from "react";
import Link from "next/link";
import { getExpertise } from "@/lib/portfolio/queries";
import type { ExpertiseItem } from "@/types/expertise-item.interface";
import { ExpertiseDeleteButton } from "@/components/clientComponent";

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
            <h1 className="text-3xl font-semibold">Expertise</h1>
            <span className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] uppercase">
              {items.length} total
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage expertise cards shown in your portfolio section.
          </p>
        </div>
        <Link
          className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
          href="/dashboard/expertise/new"
        >
          New expertise
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="border-border/70 bg-card rounded-3xl border border-dashed p-6">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              No expertise entries yet. Add your first card to get started.
            </p>
            <Link
              className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
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
              className="border-border/70 bg-card rounded-3xl border p-6"
              key={item.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <span className="text-muted-foreground border-border/70 rounded-full border px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase">
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
                  className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
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
