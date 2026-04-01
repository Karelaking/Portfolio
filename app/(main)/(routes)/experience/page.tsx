import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ExperienceItem } from "@/types";
import { getExperienceAction } from "@/actions/dashboard";
import { ExperienceCard } from "@/components/clientComponent";
import {
  Container,
  SectionOrnament,
  SectionHeader,
} from "@/components/serverComponent";
import { IconArrowUpLeft } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Engineering Experience | MK Katiyar",
  description:
    "Review MK Katiyar's engineering experience across product roles, shipped outcomes, and technical leadership.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Engineering Experience | MK Katiyar",
    description:
      "Engineering roles, product outcomes, and delivery highlights by MK Katiyar.",
    url: "/experience",
    type: "website",
  },
  twitter: {
    title: "Engineering Experience | MK Katiyar",
    description:
      "Engineering roles, product outcomes, and delivery highlights by MK Katiyar.",
  },
};

const experience = await getExperienceAction();

const ExperiencePage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="experience"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        as="h1"
        label="Experience"
        title="Proof of my tech journey"
        copy="Product, studio, and engineering roles that refined the craft."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((item: ExperienceItem, index: number) => (
          <ExperienceCard key={item.id} item={item} index={index} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
          href="/"
        >
          <IconArrowUpLeft size={14} />
          Back
        </Link>
      </div>
    </Container>
  );
};

export default ExperiencePage;
