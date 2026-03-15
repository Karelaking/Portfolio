import {
  AboutPage,
  ExpertisePage,
  ExperiencePage,
  ProjectsPage,
  SocialPage,
  WritingPage,
  GalleryPage,
  ContactPage,
  HeroPage,
} from "@/components/pages";
import { Fragment, ReactElement } from "react";

export const revalidate = 0;

const Page = (): ReactElement => {
  return (
    <Fragment>
      <HeroPage />
      <AboutPage />
      <ExpertisePage />
      <ExperiencePage />
      <ProjectsPage />
      <SocialPage />
      <WritingPage />
      <GalleryPage />
      <ContactPage />
    </Fragment>
  );
};

export default Page;
