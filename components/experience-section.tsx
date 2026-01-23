"use client";

import React, { useRef } from "react";
import { Timeline as TimelineComponent } from "./ui/timeline";
import { format } from "date-fns";
import { Experience } from "@/types/experience.interface";
import { SectionContainer } from "./ui/section-container";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import PageHeading from "./ui/page-heading";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};



// Experience card with magnetic hover effect
const ExperienceCard = ({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    rotateY.set(deltaX * 8);
    rotateX.set(-deltaY * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const isPresent = !exp.end_date;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      custom={index * 0.1}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative max-w-2xl"
      >
        {/* Main card */}
        <div className="relative rounded-2xl border border-neutral-200 bg-white/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700 md:p-8 lg:p-10">
          {/* Floating accent */}
          <motion.div
            className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-green-500/30 md:-right-3 md:-top-3 md:h-5 md:w-5"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          />

          {/* Company name */}
          <motion.h3
            className="mb-2 text-lg font-bold text-neutral-900 dark:text-white md:mb-3 md:text-2xl lg:text-3xl"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {exp.company}
          </motion.h3>

          {/* Role with date */}
          <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-6 md:gap-3">
            <span className="font-jetbrains-mono text-sm font-medium text-green-600 dark:text-green-400 md:text-base">
              {exp.role}
            </span>
            <span className="text-neutral-400">|</span>
            <span className="font-jetbrains-mono text-xs text-neutral-500 dark:text-neutral-400 md:text-sm">
              {format(new Date(exp.start_date), "MMM yyyy")}
              <span className="mx-1">→</span>
              {isPresent ? (
                <span className="inline-flex items-center gap-1.5">
                  Present
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                </span>
              ) : (
                format(new Date(exp.end_date!), "MMM yyyy")
              )}
            </span>
          </div>

          {/* Description */}
          <p className="font-jetbrains-mono text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base md:leading-7">
            {exp.description}
          </p>

          {/* Hover glow effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.08), transparent 40%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Map experience data to timeline format with animated cards
  const data = experience.map((exp, index) => ({
    title: format(new Date(exp.start_date), "yyyy"),
    content: <ExperienceCard exp={exp} index={index} />,
  }));

  return (
    <SectionContainer
      id="experience"
      className="flex min-h-screen w-full items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div ref={sectionRef} className="flex w-full max-w-7xl flex-col items-center gap-8 px-4 lg:px-16">
        {/* Section Header */}

        <PageHeading>Experience</PageHeading>
        {/* Decorative underline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 font-jetbrains-mono text-sm text-neutral-500 dark:text-neutral-400 md:text-base"
        >
          A journey through my professional milestones
        </motion.p>


        {/* Timeline with scroll animation */}
        <TimelineComponent data={data} />

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-neutral-300 dark:to-neutral-700" />
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-neutral-400">
            & More to Come
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
        </motion.div>
      </div>
    </SectionContainer>
  );
}
