"use client";

import About from "./about/page";
import Portfolio from "./portfolio/page";
import { useEffect, useRef } from "react";
import Hero from "@/components/hero-section";
import MatrixRain from "@/components/matrix-rain";
import ScanningLine from "@/components/scanning-line";
import GridBackground from "@/components/grid-background";
import FloatingParticles from "@/components/floating-particles";

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionsRef.current.forEach((section) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-visible");
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden scroll-smooth">
      {/* Fixed Background Layers - Always visible behind */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
        <ScanningLine />
        <GridBackground />
        <FloatingParticles />
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10">
        {/* Hero Section - First section, no background overlay */}
        <section
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="min-h-screen flex items-center justify-center md:px-8 lg:px-0 xl:px-16"
          id="hero"
        >
          <Hero />
        </section>
        <section
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="min-h-screen flex items-center justify-center"
          id="about"
        >
          <About />
        </section>
        <section
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="min-h-screen flex items-center justify-center"
          id="portfolio"
        >
          <Portfolio />
        </section>
      </div>
    </main>
  );
}
