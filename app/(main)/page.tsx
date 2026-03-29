import React from "react";
import {
  AboutPage,
  ContactPage,
  ExperiencePage,
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
      <ExperiencePage />
      <ExperiencePage />
      <ProjectsPage />
      <WritingPage />
      <GalleryPage />
      <ContactPage />
    </div>
  );
};

export default page;
