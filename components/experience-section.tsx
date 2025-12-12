"use client";

import React, { useRef, useEffect } from "react";
import { CircleText } from "@/components/circle-text";
import PageLayout from "@/app/layout/page";
import PageHeader from "./page-header";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const ExperienceSection = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      contentRef.current,
      timelineRef.current,
      metricsRef.current,
      skillsRef.current,
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

    // Animate counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const isPercent = counter.classList.contains('percent');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (isPercent ? '%' : '+');
      }, 30);
    });
  }, []);

  const experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading frontend development for enterprise SaaS platform serving 100K+ daily users. Architecting scalable React applications and mentoring junior developers.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led migration from JavaScript to TypeScript across 5 projects",
        "Mentored 3 junior developers who promoted to mid-level"
      ],
      technologies: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Lab",
      period: "2020 - 2022",
      location: "Austin, TX",
      description: "Developed full-stack applications for startup clients, implementing both frontend and backend solutions with focus on scalability and user experience.",
      achievements: [
        "Built 12 production applications from concept to deployment",
        "Reduced server costs by 30% through optimization",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ],
      technologies: ["Node.js", "React", "PostgreSQL", "Docker", "AWS"]
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency Co",
      period: "2018 - 2020",
      location: "New York, NY",
      description: "Created responsive, interactive web experiences for various clients including e-commerce platforms and corporate websites.",
      achievements: [
        "Delivered 25+ client projects with 95% satisfaction rate",
        "Improved page load speeds by 35% across all projects",
        "Led adoption of modern frontend frameworks"
      ],
      technologies: ["Vue.js", "JavaScript", "SASS", "Webpack", "Firebase"]
    }
  ];

  const skills = [
    "Frontend Architecture",
    "Performance Optimization", 
    "UI/UX Design",
    "API Development",
    "Cloud Deployment",
    "Team Leadership"
  ];

  return (
    <PageLayout
      sectionRef={sectionRef}
      sectionId="experience"
      className="shadow-2xl"
    >   
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 animate-fade-in">
          <PageHeader title="Experience">
            <span className="block">
              My Professional <span className="text-blue-300">Journey</span>
            </span>
            <span className="block">
              Building <span className="text-purple-300">Digital Solutions</span>
            </span>
          </PageHeader>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Professional Summary */}
        <div ref={contentRef} className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
              With over{" "}
              {
                <CircleText
                  text="5+ YEARS"
                  isBold={true}
                  textColor="#6ee7b7"
                  height="-top-3"
                />
              }{" "}
              of experience in web development,               I&apos;ve had the privilege of working with 
              startups and enterprises to build scalable, user-centric applications. 
              My journey spans from crafting pixel-perfect UIs to architecting robust backend systems.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              I specialize in{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                modern JavaScript frameworks
              </span>
              ,{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                cloud architecture
              </span>
              , and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                performance optimization
              </span>
              . My approach combines technical excellence with creative problem-solving to deliver exceptional digital experiences.
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Work Experience
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                
                {/* Experience Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {exp.title}
                        </CardTitle>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1 md:mt-0">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {exp.company}
                        </CardDescription>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                          {exp.location}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      
                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                              <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex}
                            variant="outline"
                            className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div ref={metricsRef} className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center md:text-left group">
            <div
              className="counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="5"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Years Experience
            </div>
          </div>
          <div className="text-center md:text-left group">
            <div
              className="counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="25"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Projects Delivered
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
              Client Satisfaction
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div ref={skillsRef} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 px-6 py-4 text-gray-700 font-medium hover:border-indigo-300 hover:bg-white/80 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {skill}
                  </CardTitle>
                  <CardDescription>Expertise area</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ExperienceSection;