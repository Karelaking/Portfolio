"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React, { useRef, useEffect } from "react";
import { CircleText } from "@/components/circle-text";
import PageLayout from "@/components/page-layout";
import PageHeader from "./page-header";
import Heading from "./heading";

const AboutSection = (): React.JSX.Element => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      contentRef.current,
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

  return (
    <PageLayout
      sectionRef={sectionRef}
      sectionId="about"
      className="shadow-2xl"
    >   
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 animate-fade-in">
          <PageHeader title="About Me">
            <span className="block">
              Passionate <span className="text-blue-300">Web Developer</span> &{" "}
              <span className="text-purple-300">UI/UX Designer</span>
              <span className="block">
                Crafting Seamless Digital Experiences
              </span>
            </span>
          </PageHeader>
        </div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main Content */}
        <div ref={contentRef} className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
              I&lsquo;m{" "}
              {
                <CircleText
                  text="MRADUL KUMAR"
                  isBold={true}
                  textColor="#6ee7b7"
                  height="-top-3"
                />
              }{" "}
              , a web developer and UI/UX designer building digital products
              that blend form and function. My work spans from early-stage
              startups to established enterprises, always with a focus on
              creating solutions that are both beautiful and performant.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
              My approach is rooted in understanding the problem before jumping
              to solutions. I believe the best work happens at the intersection
              of user needs, business goals, and technical constraints. Whether
              it&lsquo;s architecting a scalable frontend system or refining
              micro-interactions, I bring the same level of attention to detail.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              When I&lsquo;m not pushing pixels or writing code, I&lsquo;m
              exploring web technologies, contributing to{" "}
              {<CircleText text="OPEN-SOURCE" isBold={true} />} projects, or
              mentoring aspiring developers in the community.
            </p>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="mb-20">
        <Heading>My Expertise</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertise.map((skill, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 px-6 py-4 text-gray-700 font-medium hover:border-indigo-300 hover:bg-white/80 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {skill}
                  </CardTitle>
                  <CardDescription>My expertise</CardDescription>
                </CardHeader>
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
    </PageLayout>
  );
};

export default AboutSection;
