"use client";

import Heading from "@/components/heading";
import { Card } from "@/components/ui/card";
import React, { useRef, useEffect } from "react";
import PageLayout from "@/components/page-layout";

const About = (): React.JSX.Element => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

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

  }, []);

  const expertise = [
    "Frontend Development",
    "UI/UX Design",
    "Backend Architecture",
    "Performance Optimization",
    "Responsive Design",
    "API Integration",
  ];

  return <PageLayout sectionRef={sectionRef} sectionId="about" className="shadow-2xl">
    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <Heading title="About Me" discription={["Passionate Web Developer & UI/UX Designer", "Crafting Seamless Digital Experiences"]} />

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
      <div ref={metricsRef} className="grid md:grid-cols-3 gap-8 mb-4">
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
    </div>
  </PageLayout>;
}

export default About;
