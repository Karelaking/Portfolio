import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

const SkeletonBlock = ({ className }: { className?: string }): ReactElement => {
  return <div className={cn("animate-pulse rounded-full bg-muted/60", className)} />;
};

export const HeroSkeleton = (): ReactElement => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
      <div className="flex flex-col gap-6">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-12 w-full max-w-xl" />
        <SkeletonBlock className="h-4 w-full max-w-2xl" />
        <SkeletonBlock className="h-4 w-3/4 max-w-xl" />
        <div className="flex flex-wrap items-center gap-3">
          <SkeletonBlock className="h-9 w-56" />
          <SkeletonBlock className="h-4 w-32" />
        </div>
        <SkeletonBlock className="h-4 w-56" />
        <div className="flex flex-wrap items-center gap-3">
          <SkeletonBlock className="h-10 w-40" />
          <SkeletonBlock className="h-10 w-44" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["hero-metric-1", "hero-metric-2", "hero-metric-3"].map((key) => (
            <div className="rounded-2xl border border-border/70 bg-card px-4 py-3" key={key}>
              <SkeletonBlock className="h-6 w-16" />
              <SkeletonBlock className="mt-2 h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-[520px] w-[420px] rounded-[2.5rem] border border-border bg-card" />
      </div>
    </section>
  );
};
