import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteFooter, SiteHeader, SiteShell } from "@/components/layouts";
import { SectionHeader } from "@/components/sections";
import { SectionOrnament } from "@/components/visuals";
import { getExperience } from "@/lib/portfolio/queries";

export const revalidate = 0;

const fetchExperience = cache(
  async (): Promise<Awaited<ReturnType<typeof getExperience>>> => {
    return getExperience();
  },
);

const ExperienceContent = async (): Promise<ReactElement> => {
  const items = await fetchExperience();

  return (
    <section className="border-border/70 relative flex flex-col gap-8 border-t pt-12">
      <SectionOrnament className="right-auto left-6" />
      <SectionHeader
        label="Experience"
        title="The complete timeline."
        copy="Every studio, product, and engineering role that shaped the craft."
      />
      <div className="space-y-6">
        {items.map((item) => (
          <div
            className="border-border/70 bg-card rounded-3xl border p-6"
            key={item.id}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-lg font-semibold">{item.role}</p>
                <p className="text-muted-foreground text-sm">{item.company}</p>
              </div>
              <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                {item.period}
              </span>
            </div>
            <p className="text-muted-foreground mt-3 text-sm">{item.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {item.highlights.map((highlight) => (
                <li key={`${item.id}-${highlight}`}>• {highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </section>
  );
};

const ExperiencePage = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense
        fallback={
          <div className="border-border/70 bg-card h-40 rounded-3xl border" />
        }
      >
        <ExperienceContent />
      </Suspense>
    </SiteShell>
  );
};

export default ExperiencePage;
