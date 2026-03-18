import type { ActionResult } from "@/types/action-result.interface";
import type { ProjectItem } from "@/types/project-item.interface";
import type { ProjectRowInput } from "@/types/project-row-input.interface";

export interface CreateProjectInput {
  id: string;
  data: ProjectRowInput;
}

export interface UpdateProjectInput {
  id: string;
  data: ProjectRowInput;
}

export interface DeleteProjectInput {
  id: string;
}

export interface ProjectFetchAllResult {
  projects: ProjectItem[];
  error?: string;
}

export interface ProjectRepository {
  getAll(): Promise<ProjectFetchAllResult>;
  getById(id: string): Promise<ProjectItem | null>;
  create(input: CreateProjectInput): Promise<ActionResult>;
  update(input: UpdateProjectInput): Promise<ActionResult>;
  delete(input: DeleteProjectInput): Promise<ActionResult>;
}
