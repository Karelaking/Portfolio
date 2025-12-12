"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/hero-section";
import MatrixRain from "@/components/matrix-rain";
import ScanningLine from "@/components/scanning-line";
import GridBackground from "@/components/grid-background";
import AboutSection from "@/components/about-section";
import ExpertiseCard from "@/components/expertise-card";
import ExperienceSection from "@/components/experience-section";


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
          <AboutSection/>
        </section>
        <section
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="min-h-screen grid md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center p-2 lg:p-8"
          id="portfolio"
        >
          <ExpertiseCard 
            title="Frontend"
            description="Crafting responsive, performant user interfaces with modern frameworks and best practices."
            skills={["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]}
            pastelColor="purple"
          />
          <ExpertiseCard 
            title="Backend"
            description="Building scalable server-side applications with robust APIs and database architecture."
            skills={["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]}
            pastelColor="blue"
          />
          <ExpertiseCard 
            title="UI/UX Design"
            description="Creating intuitive, beautiful interfaces that prioritize user experience and accessibility."
            skills={["Figma", "Adobe XD", "Prototyping", "Design Systems", "User Research"]}
            pastelColor="pink"
          />
          <ExpertiseCard 
            title="Mobile Development"
            description="Developing cross-platform mobile applications with native performance and feel."
            skills={["React Native", "Flutter", "iOS", "Android", "Progressive Web Apps"]}
            pastelColor="green"
          />
          <ExpertiseCard 
            title="Cloud & DevOps"
            description="Deploying and managing applications with modern cloud infrastructure and CI/CD pipelines."
            skills={["AWS", "Docker", "Kubernetes", "GitHub Actions", "Vercel"]}
            pastelColor="yellow"
          />
          <ExpertiseCard 
            title="API Design"
            description="Designing and implementing efficient, secure APIs that power modern applications."
            skills={["GraphQL", "REST", "WebSocket", "Authentication", "Rate Limiting"]}
            pastelColor="indigo"
          />
        </section>
        
        {/* Experience Section */}
        <section
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="min-h-screen"
          id="experience"
        >
          <ExperienceSection />
        </section>
      </div>
    </main>
  );
}
