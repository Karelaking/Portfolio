import type { ReactElement } from "react";

export const ProjectsPageSkeleton = (): ReactElement => {
  return (
    <section className="relative flex flex-col gap-8 border-t border-border/70 pt-12">
      <div className="flex flex-col gap-3">
        <div className="h-4 w-20 rounded-full bg-muted" />
        <div className="h-7 w-72 rounded-full bg-muted" />
        <div className="h-4 w-96 max-w-full rounded-full bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            className="rounded-3xl border border-border/70 bg-card p-6"
            key={`projects-page-skeleton-${index}`}
          >
            <div className="h-40 w-full rounded-2xl border border-border bg-muted" />
            <div className="mt-4 space-y-3">
              <div className="h-5 w-40 rounded-full bg-muted" />
              <div className="h-4 w-full rounded-full bg-muted" />
              <div className="h-4 w-5/6 rounded-full bg-muted" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 rounded-full bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
                <div className="h-6 w-16 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-4 w-32 rounded-full bg-muted" />
    </section>
  );
};
