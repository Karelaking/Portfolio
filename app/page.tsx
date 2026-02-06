"use client";

import AboutSection from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import ScreenFitText from "@/components/screen-fit-text";
import React, { useRef, useEffect, useState } from "react";
import { experience } from "@/data/experience";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ProjectSectionClient } from "@/components/projects-section-client";
import { motion, useScroll, useSpring } from "motion/react";

// Visual background components
const GridPattern = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }}
  />
);

const DotPattern = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.08) 1.5px, transparent 1.5px)`,
      backgroundSize: "24px 24px",
    }}
  />
);

const GradientOrb = ({ position, color, size }: { position: string; color: string; size: string }) => (
  <div className={`pointer-events-none absolute ${position} ${size} rounded-full ${color} blur-3xl z-0`} />
);

const Page = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setShowBackToTop(v > 0.1);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

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

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <GradientOrb position="-left-32 -top-32" color="bg-green-500/10" size="h-96 w-96" />
        <GradientOrb position="-right-32 top-1/3" color="bg-emerald-500/10" size="h-80 w-80" />
        <GridPattern />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full"
        >
          <HeroSection />
        </motion.div>
      </div>

      <ScreenFitText>know about me</ScreenFitText>

      {/* About Section */}
      <div className="relative w-full overflow-hidden">
        <DotPattern />
        <div className="relative z-10">
          <AboutSection />
        </div>
      </div>

      <ScreenFitText>what I excel at</ScreenFitText>

      {/* Experience Section */}
      <div className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <GridPattern />
        <div className="relative z-10">
          <ExperienceSection experience={experience || []} />
        </div>
      </div>

      <ScreenFitText>what I do best</ScreenFitText>

      {/* Expertise Section */}
      <div className="relative w-full overflow-hidden">
        <DotPattern />
        <GradientOrb position="left-1/4 top-1/4" color="bg-green-500/5" size="h-64 w-64" />
        <div className="relative z-10">
          <ExpertiseSection />
        </div>
      </div>

      <ScreenFitText>things I&apos;ve built</ScreenFitText>

      {/* Projects Section */}
      <div className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <GridPattern />
        <GradientOrb position="-right-20 top-1/3" color="bg-teal-500/10" size="h-72 w-72" />
        <div className="relative z-10">
          <ProjectSectionClient />
        </div>
      </div>

      <ScreenFitText>curated moments</ScreenFitText>

      {/* Gallery Section */}
      <div className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <GradientOrb position="-left-20 top-1/2" color="bg-purple-500/10" size="h-72 w-72" />
        <GradientOrb position="-right-20 bottom-1/4" color="bg-violet-500/10" size="h-64 w-64" />
        <div className="relative z-10">
          <GallerySection />
        </div>
      </div>

      <ScreenFitText>engage with me</ScreenFitText>

      {/* Contact Section */}
      <div className="relative w-full overflow-hidden">
        <GridPattern />
        <GradientOrb position="right-1/4 top-1/3" color="bg-emerald-500/5" size="h-80 w-80" />
        <div className="relative z-10">
          <ContactSection />
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/80 shadow-lg backdrop-blur-sm transition-colors hover:border-green-500 hover:bg-green-500/10 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-green-500"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
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