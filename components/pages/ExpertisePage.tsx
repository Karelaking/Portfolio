import React from "react";
import { Container, SectionHeader } from "../serverComponent";
// import { getExpertiseIcon } from "@/data/Expertise";
import { getTechnologyLogo } from "@/data/Technology";
import { getTechnologiesAction } from "@/actions";
import { SectionOrnament } from "../serverComponent/section-ornament";
// import { AnimatedIcon } from "../motion";
import type { TechnologyItem } from "@/types/technology-item.interface";

// const expertise = await getExpertiseAction();
const technologies = await getTechnologiesAction();

const getWebsiteLabel = (websiteUrl: string): string => {
  return websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const getRelatedProjectTags = (technology: TechnologyItem): string[] => {
  const relatedTags = technology.relatedProjects
    .flatMap((project) => project.tags)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  return Array.from(new Set(relatedTags)).slice(0, 8);
};

export const ExpertisePage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="expertise"
    >
      <SectionOrnament className="top-10 right-10" />

      <div className="mt-4 space-y-4">
        <SectionHeader
          label="Tech Stack"
          title="Core technologies I build with"
          copy="Frameworks and tools with related projects, tags, and direct links."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {technologies.map((technology) => {
            const relatedProjects = technology.relatedProjects.slice(0, 3);
            const relatedTags = getRelatedProjectTags(technology);

            return (
              <article
                className="border-border/70 bg-card rounded-3xl border p-6"
                key={technology.id}
              >
                <div className="flex items-center gap-3">
                  <span className="border-border bg-background flex h-10 w-10 items-center justify-center rounded-full border">
                    {getTechnologyLogo(technology.logoKey)}
                  </span>
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {technology.name}
                    </h3>
                    <a
                      className="text-muted-foreground hover:text-foreground text-xs tracking-[0.16em] uppercase transition"
                      href={technology.websiteUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {getWebsiteLabel(technology.websiteUrl)}
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground mt-3 text-sm">
                  {technology.description}
                </p>

                {relatedTags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {relatedTags.map((tag) => (
                      <span
                        className="border-border/70 rounded-full border px-3 py-1 text-[11px] tracking-[0.18em] uppercase"
                        key={`${technology.id}-${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="border-border/70 mt-5 space-y-2 border-t pt-4">
                  <p className="text-foreground text-xs tracking-[0.2em] uppercase">
                    Related Projects
                  </p>

                  {relatedProjects.length > 0 ? (
                    relatedProjects.map((project) => (
                      <div
                        className="space-y-2"
                        key={`${technology.id}-${project.id}`}
                      >
                        <a
                          className="text-sm font-medium underline-offset-4 hover:underline"
                          href={project.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {project.name}
                        </a>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase"
                              key={`${project.id}-${technology.id}-${tag}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No related projects found yet.
                    </p>
                  )}  
                </div>
              </article>
            );
          })}
        </div>

        {technologies.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No technologies found in the database yet.
          </p>
        ) : null}
      </div>
    </Container>
  );
};
