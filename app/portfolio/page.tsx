"use client";

import MatrixRain from "@/components/matrix-rain";
import React, { useRef, useEffect, useState } from "react";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "education"
  >("skills");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(30px)";
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition =
            "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }
  }, []);

  const technicalSkills = [
    {
      category: "Frontend",
      items: [
        "React.js",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "HTML5/CSS3",
        "JavaScript ES6+",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
      ],
    },
    {
      category: "Tools & Workflow",
      items: ["Git", "Docker", "CI/CD", "Webpack", "Jest", "Figma"],
    },
  ];

  const experiences = [
    {
      role: "Web Developer",
      company: "Tech Solutions Inc.",
      period: "Jan 2023 - Present",
      location: "Remote",
      description:
        "Led development of customer-facing web applications serving 50K+ monthly users. Architected scalable frontend solutions and optimized performance across the platform.",
      achievements: [
        "Increased organic traffic by 40% through technical SEO improvements and performance optimization",
        "Reduced page load times by 2.3 seconds, improving Core Web Vitals scores by 60%",
        "Collaborated with product and design teams to deliver 5 major feature releases on schedule",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "Jun 2022 - Dec 2022",
      location: "Hybrid",
      description:
        "Developed responsive web applications for diverse clients across healthcare, finance, and e-commerce sectors.",
      achievements: [
        "Built 8 production-ready websites using React, achieving 95+ Lighthouse scores",
        "Implemented WCAG 2.1 AA accessibility standards across all projects",
        "Reduced JavaScript bundle size by 35% through code splitting and lazy loading",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2020 - 2024",
      gpa: "3.8/4.0",
      focus: "Software Engineering, Web Development, Data Structures",
    },
    {
      degree: "Google UX Design Professional Certificate",
      institution: "Coursera",
      year: "2024",
      credential: "Credential ID: ABC123XYZ",
    },
    {
      degree: "Meta Front-End Developer Professional Certificate",
      institution: "Coursera",
      year: "2023",
      credential: "Credential ID: DEF456ABC",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
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
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-indigo-600 animate-expand"></div>
            <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Technical Capabilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            A comprehensive overview of my technical skills, professional
            experience, and educational background.
          </p>
        </div>

        {/* Tab Navigation */}
        <div ref={contentRef} className="mb-12">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("skills")}
              className={`pb-4 font-medium transition-all relative ${
                activeTab === "skills"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Technical Skills
              {activeTab === "skills" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`pb-4 font-medium transition-all relative ${
                activeTab === "experience"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Experience
              {activeTab === "experience" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`pb-4 font-medium transition-all relative ${
                activeTab === "education"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Education
              {activeTab === "education" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="animate-fade-in-up">
              <div className="space-y-8">
                {technicalSkills.map((skillGroup, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg p-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded border border-gray-200 hover:border-indigo-300 hover:bg-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Core Competencies
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">Technical</p>
                      <ul className="space-y-1 text-sm">
                        <li>
                          • Responsive Web Design & Mobile-First Development
                        </li>
                        <li>• Performance Optimization & Web Vitals</li>
                        <li>• RESTful API Design & Integration</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">Professional</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Agile/Scrum Methodology</li>
                        <li>• Technical Documentation</li>
                        <li>• Cross-functional Collaboration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="animate-fade-in-up space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg p-8 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-600 font-medium mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0 md:text-right">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-gray-700 text-sm"
                      >
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="animate-fade-in-up space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg p-8 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-3">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>{edu.year}</span>
                        {edu.gpa && (
                          <span className="px-3 py-1 bg-gray-100 rounded">
                            GPA: {edu.gpa}
                          </span>
                        )}
                        {edu.credential && (
                          <span className="text-gray-500">
                            {edu.credential}
                          </span>
                        )}
                      </div>
                      {edu.focus && (
                        <p className="text-sm text-gray-600 mt-3">
                          Focus: {edu.focus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
