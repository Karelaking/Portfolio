import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteFooter, SiteHeader, SiteShell } from "@/components/layouts";
import { SectionHeader } from "@/components/sections";
import { SectionOrnament } from "@/components/visuals";
import { getExperience } from "@/lib/portfolio/queries";

export const revalidate = 0;

const fetchExperience = cache(async (): Promise<Awaited<ReturnType<typeof getExperience>>> => {
  return getExperience();
});

const ExperienceContent = async (): Promise<ReactElement> => {
  const items = await fetchExperience();

  return (
    <section className="relative flex flex-col gap-8 border-t border-border/70 pt-12">
      <SectionOrnament className="left-6 right-auto" />
      <SectionHeader
        label="Experience"
        title="The complete timeline."
        copy="Every studio, product, and engineering role that shaped the craft."
      />
      <div className="space-y-6">
        {items.map((item) => (
          <div
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
          </div>
        ))}
      </div>
      <Link
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </section>
  );
};

export const ExperiencePage = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense fallback={<div className="h-40 rounded-3xl border border-border/70 bg-card" />}>
        <ExperienceContent />
      </Suspense>
    </SiteShell>
  );
};

export default ExperiencePage;
