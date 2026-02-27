import {
  AboutPage,
  ExpertisePage,
  ExperiencePage,
  ProjectsPage,
  SocialPage,
  BlogPage,
  GalleryPage,
  ContactPage,
  HeroPage,
} from "@/components/pages";
import { RootProvider } from "@/components/providers";
import { ReactElement } from "react";

export const revalidate = 0;

const Page = (): ReactElement => {
  return (
    <RootProvider>
      <HeroPage />
      <AboutPage />
      <ExpertisePage />
      <ExperiencePage />
      <ProjectsPage />
      <SocialPage />
      <BlogPage />
      <GalleryPage />
      <ContactPage />
    </RootProvider>
  );
};

export default Page;
