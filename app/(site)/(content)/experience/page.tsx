import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { getExperience } from "@/lib/portfolio/queries";
import { splitExperienceHighlights } from "@/lib/portfolio/experience-tech";
import {
  Container,
  SectionHeader,
  SectionOrnament,
} from "@/components/serverComponent";

export const revalidate = 0;

const fetchExperience = cache(
  async (): Promise<Awaited<ReturnType<typeof getExperience>>> => {
    return getExperience();
  },
);

const ExperienceContent = async (): Promise<ReactElement> => {
  const items = await fetchExperience();

  return (
    <Container className="border-border/70 relative flex flex-col gap-8 border-t pt-12">
      <SectionOrnament className="right-auto left-6" />
      <SectionHeader
        label="Experience"
        title="The complete timeline."
        copy="Every studio, product, and engineering role that shaped the craft."
      />
      <div className="space-y-6">
        {items.map((item) => {
          const parsedHighlights = splitExperienceHighlights(item.highlights);

          return (
            <div
              className="border-border/70 bg-card rounded-3xl border p-6"
              key={item.id}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold">{item.role}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.company}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  {item.period}
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                {item.summary}
              </p>
              {parsedHighlights.coreTech.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {parsedHighlights.coreTech.map((tech) => (
                    <span
                      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase"
                      key={`${item.id}-core-${tech}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
              <ul className="mt-4 space-y-2 text-sm">
                {parsedHighlights.highlights.map((highlight) => (
                  <li key={`${item.id}-${highlight}`}>• {highlight}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Link
        className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </Container>
  );
};

const ExperiencePage = (): ReactElement => {
  return (
    <Suspense
      fallback={
        <div className="border-border/70 bg-card h-40 rounded-3xl border" />
      }
    >
      <ExperienceContent />
    </Suspense>
  );
};

export default ExperiencePage;
