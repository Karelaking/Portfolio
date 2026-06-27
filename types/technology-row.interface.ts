import type { ProjectRow } from "./project-row.interface";

export interface ProjectTechnologyRow {
	project_id: string;
	projects: ProjectRow | null;
}

export interface TechnologyRow {
	description: string;
	id: string;
	logo_key: string;
	name: string;
	project_technologies: ProjectTechnologyRow[];
	slug: string;
	website_url: string;
}
