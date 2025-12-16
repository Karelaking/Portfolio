import { HoverEffect } from "./ui/card-hover-effect";
import { SectionContainer } from "./ui/section-container";
import { SectionHeader } from "./ui/section-header";

type Project = {
  title: string;
  description: string | null;
  project_url: string | null;
  image_url: string | null;
  // map database fields to what HoverEffect expects, or change HoverEffect
  // HoverEffect expects { title, description, link }
}

export function ProjectSection({ projects }: { projects: any[] }) {
  // Map DB projects to HoverEffect items
  const items = projects.map(p => ({
    title: p.title,
    description: p.description || "",
    link: p.project_url || "#",
    // You might want to pass image_url too if HoverEffect supports it
  }))

  return (
    <SectionContainer id="projects" className="bg-white dark:bg-gray-950">
        <SectionHeader title="Projects" align="center" />
        <HoverEffect items={items} />
    </SectionContainer>
  );
}
