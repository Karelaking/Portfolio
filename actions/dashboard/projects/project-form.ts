import {object, string } from "zod";
import type { ParsedProjectInput } from "@/types/parsed-project-input.interface";
import type { ProjectRowInput } from "@/types/project-row-input.interface";

const projectSchema = object({
  name: string().min(1, "Name is required"),
  description: string().min(1, "Description is required"),
  tags: string().optional(),
  imageSrc: string().min(1, "Image URL is required"),
  imageAlt: string().min(1, "Image alt is required"),
  href: string().min(1, "Project URL is required"),
});

const toProjectRow = (data: ParsedProjectInput): ProjectRowInput => {
  return {
    name: data.name,
    description: data.description,
    tags: data.tags,
    image_src: data.imageSrc,
    image_alt: data.imageAlt,
    href: data.href,
  };
};

const parseTags = (raw: string | undefined): string[] => {
  if (!raw) {
    return [];
  }
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};

const parseProjectForm = (
  formData: FormData,
): { data?: ParsedProjectInput; error?: string } => {
  const raw = {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    imageSrc: String(formData.get("imageSrc") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    href: String(formData.get("href") ?? ""),
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  return {
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      tags: parseTags(parsed.data.tags),
      imageSrc: parsed.data.imageSrc,
      imageAlt: parsed.data.imageAlt,
      href: parsed.data.href,
    },
  };
};

export { parseProjectForm, toProjectRow };
