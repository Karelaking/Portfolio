import { getProjects } from "@/lib";

export const getProjectsAction = async () => {
  const projects = await getProjects();
  return projects;
}