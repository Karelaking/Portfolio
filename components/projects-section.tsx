"use client";

import { useRef } from "react";
import { HoverEffect, HoverEffectItem } from "./ui/card-hover-effect";
import { SectionContainer } from "./ui/section-container";
import { motion, useInView } from "motion/react";
import PageHeading from "./ui/page-heading";

export interface Project {
  title: string;
  description: string | null;
  project_url: string | null;
  image_url: string | null;
  github_url?: string | null;
  tags?: string[] | null;
}

export function ProjectSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Map DB projects to HoverEffect items
  const items: HoverEffectItem[] = projects.map((p) => ({
    title: p.title,
    description: p.description || "",
    link: p.project_url || "#",
    image: p.image_url,
    github: p.github_url,
    tags: p.tags || [],
  }));

  return (
    <SectionContainer
      id="projects"
      className="flex min-h-screen w-full items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div
        ref={sectionRef}
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 lg:px-16"
      >
        {/* Section Header */}
        <div className="relative text-center">
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"
          />

          <PageHeading>Projects</PageHeading>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 font-jetbrains-mono text-sm text-neutral-500 dark:text-neutral-400 md:text-base"
          >
            Things I&apos;ve built and shipped
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          {items.length > 0 ? (
            <HoverEffect items={items} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-neutral-400"
                >
                  ⚡
                </motion.div>
              </div>
              <p className="font-jetbrains-mono text-neutral-500 dark:text-neutral-400">
                Projects coming soon...
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-neutral-300 dark:to-neutral-700" />
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-neutral-400">
            Building the future
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
        </motion.div>
      </div>
    </SectionContainer>
  );
}
