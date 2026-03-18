import type { ProjectRow } from "./project-row.interface";

export interface ProjectTechnologyRow {
  project_id: string;
  projects: ProjectRow | null;
}

export interface TechnologyRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_key: string;
  project_technologies: ProjectTechnologyRow[];
}