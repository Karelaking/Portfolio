export type {
  CreateProjectInput,
  DeleteProjectInput,
  ProjectFetchAllResult,
  ProjectRepository,
  UpdateProjectInput,
} from "@/types/repositories/project-repository.interface";

export { ProjectRepositoryImpl } from "./project-repository.impl";
export { getProjectRepository } from "./get-project-repository";
