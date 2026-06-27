import type { ProjectItem } from "./project-item.interface";

export interface TechnologyItem {
	description: string;
	id: string;
	logoKey: string;
	name: string;
	relatedProjects: ProjectItem[];
	slug: string;
	websiteUrl: string;
}
