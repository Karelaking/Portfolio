import type { ProjectItem } from "@/types/project-item.interface";

export interface ProjectRow extends Omit<ProjectItem, "imageSrc" | "imageAlt"> {
	image_alt: string;
	image_src: string;
}
