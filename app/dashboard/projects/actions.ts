"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/portfolio/types";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().optional(),
  imageSrc: z.string().min(1, "Image URL is required"),
  imageAlt: z.string().min(1, "Image alt is required"),
  href: z.string().min(1, "Project URL is required"),
});

interface ParsedProjectInput {
  name: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
}

interface ProjectRowInput {
  name: string;
  description: string;
  tags: string[];
  image_src: string;
  image_alt: string;
  href: string;
}

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

export const createProject = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    console.log("[projects] createProject invoked");
    const client = getSupabaseAdminClient();
    if (!client) {
      console.error("[projects] createProject: admin client missing");
      return { ok: false, error: "Admin client not configured." };
    }

    const result = parseProjectForm(formData);
    if (!result.data) {
      console.error("[projects] createProject: invalid form data", result.error);
      return { ok: false, error: result.error ?? "Invalid form data." };
    }
    const data = toProjectRow(result.data);
    const payload = {
      id: crypto.randomUUID(),
      ...data,
      order_index: 0,
    };

    const { error } = await client.from("projects").insert(payload);
    if (error) {
      console.error("[projects] createProject: insert failed", error);
      return { ok: false, error: error.message || "Failed to create project." };
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    console.log("[projects] createProject: success", payload.id);
    return { ok: true };
  } catch (error) {
    console.error("[projects] createProject: unexpected error", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while creating project.",
    };
  }
};

export const updateProject = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    console.log("[projects] updateProject invoked", id);
    const client = getSupabaseAdminClient();
    if (!client) {
      console.error("[projects] updateProject: admin client missing");
      return { ok: false, error: "Admin client not configured." };
    }

    const result = parseProjectForm(formData);
    if (!result.data) {
      console.error("[projects] updateProject: invalid form data", result.error);
      return { ok: false, error: result.error ?? "Invalid form data." };
    }
    const data = toProjectRow(result.data);
    const { error } = await client.from("projects").update(data).eq("id", id);
    if (error) {
      console.error("[projects] updateProject: update failed", error);
      return { ok: false, error: error.message || "Failed to update project." };
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    console.log("[projects] updateProject: success", id);
    return { ok: true };
  } catch (error) {
    console.error("[projects] updateProject: unexpected error", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while updating project.",
    };
  }
};

export const deleteProject = async (id: string): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const { error } = await client.from("projects").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  return { ok: true };
};

export const deleteProjectAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing project id." };
  }

  return deleteProject(id);
};
