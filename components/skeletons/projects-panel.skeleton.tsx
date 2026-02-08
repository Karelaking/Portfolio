import type { ReactElement } from "react";

export const ProjectsPanelSkeleton = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-8 w-32 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
          <div className="h-4 w-72 rounded-full bg-muted" />
        </div>
        <div className="h-9 w-32 rounded-full bg-muted" />
      </div>
      <div className="space-y-4">
        {[0, 1, 2].map((index) => (
          <div
            className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5"
            key={`project-skeleton-${index}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-32 w-full rounded-2xl border border-border/70 bg-muted sm:h-28 sm:w-44" />
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded-full bg-muted" />
                  <div className="h-5 w-48 rounded-full bg-muted" />
                </div>
                <div className="h-4 w-full rounded-full bg-muted" />
                <div className="h-4 w-5/6 rounded-full bg-muted" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-muted" />
                  <div className="h-6 w-24 rounded-full bg-muted" />
                  <div className="h-6 w-16 rounded-full bg-muted" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-full bg-muted" />
              <div className="h-8 w-24 rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
