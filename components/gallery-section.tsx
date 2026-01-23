"use client";

import React, { useRef } from "react";
import { SectionContainer } from "./ui/section-container";
import { GalleryScroll } from "./ui/gallery-scroll";
import { motion, useInView } from "motion/react";
import PageHeading from "./ui/page-heading";

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const items = [
    {
      title: "Tyler Durden",
      url: "https://www.instagram.com/p/DSKlTmwklae/media?size=l",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      url: "https://www.instagram.com/p/DSKlPW4Ej5g/media?size=l",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      url: "https://www.instagram.com/p/DSKlMX_EktB/media?size=l",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      url: "https://www.instagram.com/p/CyNg9gnO4x6/media?size=l",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      url: "https://www.instagram.com/p/Ct7DTD7yCLr/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Norway",
      url: "https://www.instagram.com/p/Csnczc0O8SL/media?size=l",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      url: "https://www.instagram.com/p/Ct7DF-NypzU/media?size=l",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      url: "https://www.instagram.com/p/Cs8R1kEStUu/media?size=l",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  return (
    <SectionContainer
      id="gallery"
      className="flex min-h-screen w-full flex-col items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div ref={sectionRef} className="flex w-full flex-col items-center gap-12 px-4 lg:px-16">
        {/* Section Header */}
        <div className="relative text-center">
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"
          />

<PageHeading>Gallery</PageHeading>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 font-jetbrains-mono text-sm text-neutral-500 dark:text-neutral-400 md:text-base"
          >
            Moments captured through my lens
          </motion.p>
        </div>

        {/* Gallery Scrolls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex w-full flex-col gap-4"
        >
          <GalleryScroll items={items} speed="slow" />
          <GalleryScroll items={items} direction="right" speed="slow" />
          <GalleryScroll items={items} speed="slow" className="hidden md:block" />
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
            More on Instagram
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
        </motion.div>
      </div>
    </SectionContainer>
  );
}
