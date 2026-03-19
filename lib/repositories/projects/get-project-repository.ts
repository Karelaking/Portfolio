import type { ProjectRepository } from "@/types/repositories/project-repository.interface";
import { ProjectRepositoryImpl } from "./project-repository.impl";

export const getProjectRepository = (): ProjectRepository => {
  return new ProjectRepositoryImpl();
};
