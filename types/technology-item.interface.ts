import type { ProjectItem } from "./project-item.interface";

export interface TechnologyItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  logoKey: string;
  relatedProjects: ProjectItem[];
}