import { HoverEffect } from "./ui/card-hover-effect";
import { SectionContainer } from "./ui/section-container";

interface Project {
  title: string;
  description: string | null;
  project_url: string | null;
  image_url: string | null;
}

export function ProjectSection({ projects }: { projects: Project[] }) {
  // Map DB projects to HoverEffect items
  const items = projects.map(p => ({
    title: p.title,
    description: p.description || "",
    link: p.project_url || "#",
    // You might want to pass image_url too if HoverEffect supports it
  }))

  return (
    <SectionContainer id="projects" className="bg-white dark:bg-gray-950">
        <HoverEffect items={items} />
    </SectionContainer>
  );
}
