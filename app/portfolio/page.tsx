"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Heading from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import React, { useRef, useEffect } from "react";
import { GraduationCap, Code2, Briefcase, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "../layout/page";

const Portfolio = (): React.JSX.Element => {
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
      icon: <Code2 className="w-5 h-5" />,
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
      icon: <Briefcase className="w-5 h-5" />,
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "Nest.js",
      ],
    },
    {
      category: "Tools & Workflow",
      icon: <Award className="w-5 h-5" />,
      items: ["Git", "Docker", "CI/CD", "Webpack", "Jest", "Figma"],
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

  const competencies = [
    {
      title: "Technical",
      items: [
        "Responsive Web Design & Mobile-First Development",
        "Performance Optimization & Web Vitals",
        "RESTful API Design & Integration",
      ],
    },
    {
      title: "Professional",
      items: [
        "Agile/Scrum Methodology",
        "Technical Documentation",
        "Cross-functional Collaboration",
      ],
    },
  ];

  return (
    <PageLayout
      sectionRef={sectionRef}
      sectionId="portfolio"
      transparent={true}
    >
      <div className="relative z-10 min-w-5xl mx-auto">
        {/* Section Header */}
        <Heading title="Expertise" discription={["Technical Capabilities"]} />

        <div ref={contentRef} className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              A comprehensive overview of my technical skills, professional
              experience, and educational background.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div ref={contentRef}>
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Technical Skills
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab Content */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid gap-6">
                {technicalSkills.map((skillGroup, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400">
                          {skillGroup.icon}
                        </div>
                        {skillGroup.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Core Competencies Card */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Core Competencies
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Technical and professional strengths
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {competencies.map((comp, index) => (
                        <div key={index} className="space-y-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                            {comp.title}
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            {comp.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-indigo-600 dark:text-indigo-400 mt-1">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Education Tab Content */}
            <TabsContent value="education" className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="text-indigo-600 dark:text-indigo-400 font-medium text-base">
                          {edu.institution}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="dark:border-gray-600">
                        {edu.year}
                      </Badge>
                      {edu.gpa && (
                        <Badge className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">
                          GPA: {edu.gpa}
                        </Badge>
                      )}
                      {edu.credential && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {edu.credential}
                        </span>
                      )}
                    </div>
                    {edu.focus && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 pt-4 border-t dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Focus:{" "}
                        </span>
                        {edu.focus}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
