import type { ActionResult } from "@/types/action-result.interface";
import type { ProjectItem } from "@/types/project-item.interface";
import type { ProjectRowInput } from "@/types/project-row-input.interface";

export interface CreateProjectInput {
	data: ProjectRowInput;
	id: string;
}

export interface UpdateProjectInput {
	data: ProjectRowInput;
	id: string;
}

export interface DeleteProjectInput {
	id: string;
}

export interface ProjectFetchAllResult {
	error?: string;
	projects: ProjectItem[];
}

export interface ProjectRepository {
	create(input: CreateProjectInput): Promise<ActionResult>;
	delete(input: DeleteProjectInput): Promise<ActionResult>;
	getAll(): Promise<ProjectFetchAllResult>;
	getById(id: string): Promise<ProjectItem | null>;
	update(input: UpdateProjectInput): Promise<ActionResult>;
}
