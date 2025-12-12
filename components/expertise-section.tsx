"use client";

import React, { useRef, useEffect } from "react";
import { CircleText } from "@/components/circle-text";
import PageLayout from "@/app/layout/page";
import PageHeader from "./page-header";
import ExpertiseCard from "./expertise-card";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import SkillProgress from "./skill-progress";

interface ExpertiseSkill {
  name: string;
  proficiency: number; // 1-5 scale
  yearsOfExperience?: number;
  description?: string;
  projects?: number;
}

interface ExpertiseCategory {
  title: string;
  description: string;
  skills: string[];
  pastelColor: string;
  yearsOfExperience: number;
  projectCount: number;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  detailedSkills?: ExpertiseSkill[];
}

const ExpertiseSection = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      contentRef.current,
      categoriesRef.current,
      metricsRef.current,
      techRef.current,
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
    const counters = document.querySelectorAll('.expertise-counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const hasPlus = counter.textContent?.includes('+');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
      }, 30);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach((bar, index) => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        if (bar instanceof HTMLElement) {
          bar.style.width = width + '%';
        }
      }, 1000 + (index * 100));
    });
  }, []);

  const expertiseCategories: ExpertiseCategory[] = [
    {
      title: "Frontend Development",
      description: "Crafting responsive, performant user interfaces with modern frameworks and best practices.",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      pastelColor: "purple",
      yearsOfExperience: 5,
      projectCount: 20,
      proficiencyLevel: "expert",
      detailedSkills: [
        { name: "React/Next.js", proficiency: 5, yearsOfExperience: 5, projects: 15 },
        { name: "TypeScript", proficiency: 4, yearsOfExperience: 4, projects: 12 },
        { name: "Tailwind CSS", proficiency: 5, yearsOfExperience: 3, projects: 18 },
        { name: "Framer Motion", proficiency: 4, yearsOfExperience: 2, projects: 8 },
      ]
    },
    {
      title: "Backend Development",
      description: "Building scalable server-side applications with robust APIs and database architecture.",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
      pastelColor: "blue",
      yearsOfExperience: 4,
      projectCount: 15,
      proficiencyLevel: "advanced",
      detailedSkills: [
        { name: "Node.js/Express", proficiency: 4, yearsOfExperience: 4, projects: 12 },
        { name: "PostgreSQL", proficiency: 4, yearsOfExperience: 3, projects: 8 },
        { name: "MongoDB", proficiency: 3, yearsOfExperience: 2, projects: 6 },
        { name: "REST APIs", proficiency: 5, yearsOfExperience: 4, projects: 15 },
      ]
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive, beautiful interfaces that prioritize user experience and accessibility.",
      skills: ["Figma", "Adobe XD", "Prototyping", "Design Systems", "User Research"],
      pastelColor: "pink",
      yearsOfExperience: 3,
      projectCount: 25,
      proficiencyLevel: "advanced",
      detailedSkills: [
        { name: "Figma", proficiency: 5, yearsOfExperience: 3, projects: 20 },
        { name: "Adobe XD", proficiency: 4, yearsOfExperience: 2, projects: 10 },
        { name: "Prototyping", proficiency: 4, yearsOfExperience: 3, projects: 15 },
        { name: "Design Systems", proficiency: 3, yearsOfExperience: 2, projects: 5 },
      ]
    },
    {
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications with native performance and feel.",
      skills: ["React Native", "Flutter", "iOS", "Android", "Progressive Web Apps"],
      pastelColor: "green",
      yearsOfExperience: 3,
      projectCount: 10,
      proficiencyLevel: "intermediate",
      detailedSkills: [
        { name: "React Native", proficiency: 4, yearsOfExperience: 3, projects: 6 },
        { name: "Flutter", proficiency: 3, yearsOfExperience: 1, projects: 2 },
        { name: "iOS Development", proficiency: 2, yearsOfExperience: 1, projects: 1 },
        { name: "PWA", proficiency: 4, yearsOfExperience: 2, projects: 4 },
      ]
    },
    {
      title: "Cloud & DevOps",
      description: "Deploying and managing applications with modern cloud infrastructure and CI/CD pipelines.",
      skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Vercel"],
      pastelColor: "yellow",
      yearsOfExperience: 4,
      projectCount: 15,
      proficiencyLevel: "advanced",
      detailedSkills: [
        { name: "AWS", proficiency: 4, yearsOfExperience: 3, projects: 10 },
        { name: "Docker", proficiency: 4, yearsOfExperience: 2, projects: 8 },
        { name: "Kubernetes", proficiency: 3, yearsOfExperience: 1, projects: 3 },
        { name: "CI/CD", proficiency: 4, yearsOfExperience: 3, projects: 12 },
      ]
    },
    {
      title: "API Design",
      description: "Designing and implementing efficient, secure APIs that power modern applications.",
      skills: ["GraphQL", "REST", "WebSocket", "Authentication", "Rate Limiting"],
      pastelColor: "indigo",
      yearsOfExperience: 5,
      projectCount: 30,
      proficiencyLevel: "expert",
      detailedSkills: [
        { name: "GraphQL", proficiency: 4, yearsOfExperience: 3, projects: 8 },
        { name: "REST APIs", proficiency: 5, yearsOfExperience: 5, projects: 25 },
        { name: "WebSocket", proficiency: 3, yearsOfExperience: 2, projects: 4 },
        { name: "Authentication", proficiency: 4, yearsOfExperience: 4, projects: 20 },
      ]
    }
  ];

  const allTechnologies = [
    { name: "JavaScript", category: "Language", proficiency: 5 },
    { name: "TypeScript", category: "Language", proficiency: 4 },
    { name: "Python", category: "Language", proficiency: 3 },
    { name: "React", category: "Framework", proficiency: 5 },
    { name: "Next.js", category: "Framework", proficiency: 5 },
    { name: "Node.js", category: "Runtime", proficiency: 4 },
    { name: "AWS", category: "Cloud", proficiency: 4 },
    { name: "Docker", category: "DevOps", proficiency: 4 },
    { name: "PostgreSQL", category: "Database", proficiency: 4 },
    { name: "MongoDB", category: "Database", proficiency: 3 },
    { name: "Figma", category: "Design", proficiency: 5 },
    { name: "Tailwind CSS", category: "Styling", proficiency: 5 },
  ];

  const getProficiencyColor = (level: number) => {
    if (level >= 5) return "bg-green-500";
    if (level >= 4) return "bg-blue-500";
    if (level >= 3) return "bg-yellow-500";
    if (level >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  const getProficiencyLabel = (level: number) => {
    if (level >= 5) return "Expert";
    if (level >= 4) return "Advanced";
    if (level >= 3) return "Intermediate";
    if (level >= 2) return "Beginner";
    return "Novice";
  };

  return (
    <PageLayout
      sectionRef={sectionRef}
      sectionId="expertise"
      className="shadow-2xl"
    >   
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 animate-fade-in">
          <PageHeader title="Expertise">
            <span className="block">
              My Technical <span className="text-blue-300">Skills</span> &{" "}
              <span className="text-purple-300">Capabilities</span>
            </span>
            <span className="block">
              Building <span className="text-indigo-300">Digital Solutions</span>
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
              of comprehensive development experience, I specialize in creating{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                end-to-end digital solutions
              </span>
              . My expertise spans from crafting pixel-perfect user interfaces to architecting scalable backend systems and deploying robust cloud infrastructure.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              I believe in{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                continuous learning
              </span>
              ,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                best practices
              </span>
              , and{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                user-centric design
              </span>
              . Every project is an opportunity to push boundaries and deliver exceptional digital experiences that make a meaningful impact.
            </p>
          </div>
        </div>

        {/* Expertise Categories Grid */}
        <div ref={categoriesRef} className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Core Expertise Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseCategories.map((category, index) => (
              <div key={index} className="relative">
                <ExpertiseCard
                  title={category.title}
                  description={category.description}
                  skills={category.skills}
                  pastelColor={category.pastelColor}
                  animationDelay={index * 100}
                />
                {/* Experience Badge */}
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  {category.yearsOfExperience}+ yrs
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Metrics */}
        <div ref={metricsRef} className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="text-center group">
            <div
              className="expertise-counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="5"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Years Experience
            </div>
          </div>
          <div className="text-center group">
            <div
              className="expertise-counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="25"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Technologies
            </div>
          </div>
          <div className="text-center group">
            <div
              className="expertise-counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="50"
            >
              0+
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Projects Completed
            </div>
          </div>
          <div className="text-center group">
            <div
              className="expertise-counter text-4xl font-bold text-indigo-600 mb-2 transition-transform group-hover:scale-110"
              data-target="100"
            >
              0
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              % Client Satisfaction
            </div>
          </div>
        </div>

        {/* Detailed Skills Breakdown */}
        <div ref={techRef} className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Technical Proficiency
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseCategories.slice(0, 4).map((category, index) => (
              <Card key={index} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {category.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {getProficiencyLabel(category.detailedSkills?.[0]?.proficiency || 3)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {category.yearsOfExperience} years • {category.projectCount} projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {category.detailedSkills?.slice(0, 3).map((skill, skillIndex) => (
                      <SkillProgress
                        key={skillIndex}
                        name={skill.name}
                        proficiency={skill.proficiency}
                        yearsOfExperience={skill.yearsOfExperience}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Cloud */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {allTechnologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`text-sm py-2 px-3 hover:scale-105 transition-transform cursor-pointer
                  ${tech.proficiency >= 5 ? 'border-green-300 text-green-700 dark:text-green-400' : ''}
                  ${tech.proficiency >= 4 ? 'border-blue-300 text-blue-700 dark:text-blue-400' : ''}
                  ${tech.proficiency >= 3 ? 'border-yellow-300 text-yellow-700 dark:text-yellow-400' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech.name}
                <span className="ml-1 text-xs opacity-60">({tech.proficiency}/5)</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ExpertiseSection;