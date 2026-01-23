"use client";

import AboutSection from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import ScreenFitText from "@/components/screen-fit-text";
import React, { useRef } from "react";
import { experience } from "@/data/experience";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { motion, useScroll, useSpring } from "motion/react";

const Page = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="relative flex h-max w-full flex-col bg-white dark:bg-neutral-950 md:items-center md:justify-center"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-green-500 to-emerald-400"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating scroll indicator dots */}
      <motion.div
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full border border-neutral-300 dark:border-neutral-700"
            style={{
              backgroundColor: smoothProgress.get() > i / 7 ? "#10b981" : "transparent",
            }}
          />
        ))}
      </motion.div>

      {/* Sections with smooth transitions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <HeroSection />
      </motion.div>

      <ScreenFitText>know about me</ScreenFitText>

      <AboutSection />

      <ScreenFitText>what I excel at</ScreenFitText>

      <ExperienceSection experience={experience || []} />

      <ScreenFitText>what I do best</ScreenFitText>

      <ExpertiseSection />

      {/* <ScreenFitText>
        what I have created
      </ScreenFitText>
      <ProjectSection projects={projects || []} /> */}

      <ScreenFitText>curated moments</ScreenFitText>

      <GallerySection />

      <ScreenFitText>engage with me</ScreenFitText>

      <ContactSection />

      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/80 shadow-lg backdrop-blur-sm transition-colors hover:border-green-500 hover:bg-green-500/10 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-green-500"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Page;