import React from "react";
import { Container } from "../serverComponent";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { SectionHeader } from "../sections";
import { SectionOrnament } from "../visuals";
import { getExperienceAction } from "@/actions/dashboard";

const experience = await getExperienceAction();

const featuredExperience = experience.slice(0, 3);
const hasMoreExperience = experience.length > featuredExperience.length;

export const ExperiencePage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="experience"
    >
      <SectionOrnament className="right-auto left-6" />
      <SectionHeader
        label="Experience"
        title="Prove of my tech life journey"
        copy="Product, studio, and engineering roles that refined the craft."
      />
      <div className="space-y-6">
        {featuredExperience.map((item) => (
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
      {hasMoreExperience ? (
        <div className="flex justify-center">
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
            href="/experience"
          >
            Show more
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      ) : null}
    </Container>
  );
};
