import React from "react";
import {
  AboutPage,
  ContactPage,
  ExperiencePage,
  ExpertisePage,
  GalleryPage,
  HeroPage,
  ProjectsPage,
  WritingPage,
} from "@/components/pages";

const page = (): React.JSX.Element => {
  return (
    <div className="bg-transparent px-0">
      <HeroPage />
      <AboutPage />
      <ExpertisePage />
      <ExperiencePage />
      <ProjectsPage />
      <WritingPage />
      <GalleryPage />
      <ContactPage />
    </div>
  );
};

export default page;
