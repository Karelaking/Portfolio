import type { ProjectItem } from "@/types/project-item.interface";

export interface ProjectRow extends Omit<ProjectItem, "imageSrc" | "imageAlt"> {
  image_src: string;
  image_alt: string;
}
