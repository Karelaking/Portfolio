import React from "react";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";
import { IconArrowUpRight } from "@tabler/icons-react";
import { getExperienceAction } from "@/actions/dashboard";
import { ExperienceCard } from "../clientComponent";
import Link from "next/link";
import type { ExperienceItem } from "@/types";

const experience = await getExperienceAction();

const featuredExperience = experience.slice(0, 3);
const hasMoreExperience = experience.length > featuredExperience.length;

export const ExperiencePage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="experience"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        label="Experience"
        title="Prove of my tech life journey"
        copy="Product, studio, and engineering roles that refined the craft."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featuredExperience.map((item: ExperienceItem, index: number) => (
          <ExperienceCard key={item.id} item={item} index={index} />
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
