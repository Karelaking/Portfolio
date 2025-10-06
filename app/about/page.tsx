"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect } from "react";
import MatrixRain from "@/components/MatrixRain";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      contentRef.current,
      skillsRef.current,
      metricsRef.current,
      ctaRef.current,
    ];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
          el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 150);
      }
    });

    // Animate metrics numbers
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".counter");
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target") || "0");
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent =
                  Math.floor(current).toString() +
                  (counter.classList.contains("percent") ? "%" : "+");
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent =
                  target.toString() +
                  (counter.classList.contains("percent") ? "%" : "+");
              }
            };
            updateCounter();
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const expertise = [
    "Frontend Development",
    "UI/UX Design",
    "Backend Architecture",
    "Performance Optimization",
    "Responsive Design",
    "API Integration",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-tr from-indigo-50 to-white overflow-hidden"
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-indigo-600 animate-expand"></div>
            <Badge
              variant="outline"
              className="text-sm font-semibold text-indigo-600 tracking-wider uppercase border-indigo-200 bg-transparent"
            >
              About
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Crafting Digital Experiences
            <br />
            That Make an Impact
          </h2>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              I&lsquo;m Mradul Kumar, a web developer and UI/UX designer with
              over 5 years of experience building digital products that blend
              form and function. My work spans from early-stage startups to
              established enterprises, always with a focus on creating solutions
              that are both beautiful and performant.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              My approach is rooted in understanding the problem before jumping
              to solutions. I believe the best work happens at the intersection
              of user needs, business goals, and technical constraints. Whether
              it&lsquo;s architecting a scalable frontend system or refining
              micro-interactions, I bring the same level of attention to detail.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              When I&lsquo;m not pushing pixels or writing code, I&lsquo;m
              exploring emerging web technologies, contributing to open-source
              projects, or mentoring aspiring developers in the community.
            </p>
          </div>
        </div>

        {/* Expertise Grid */}
        <div ref={skillsRef} className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Core Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {expertise.map((skill, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 px-6 py-4 text-gray-700 font-medium hover:border-indigo-300 hover:bg-white/80 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </Card>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div ref={metricsRef} className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center md:text-left group">
            <div
              className="counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="20"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Projects Built
            </div>
          </div>
          <div className="text-center md:text-left group">
            <div
              className="counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="10"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Technologies
            </div>
          </div>
          <div className="text-center md:text-left group">
            <div
              className="counter percent text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="100"
            >
              0%
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Commitment
            </div>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Let&lsquo;s build something together
              </h3>
              <p className="text-gray-600">
                Available for select freelance projects and full-time
                opportunities.
              </p>
            </div>
            <Button
              asChild
              className="group inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap hover:gap-3 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              <a href="#contact">
                Get in Touch
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
