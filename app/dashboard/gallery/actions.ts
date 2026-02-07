"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/portfolio/types";

const gallerySchema = z.object({
  src: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required"),
});

interface ParsedGalleryInput {
  src: string;
  alt: string;
}

interface GalleryRowInput {
  src: string;
  alt: string;
}

const parseGalleryForm = (
  formData: FormData,
): { data?: ParsedGalleryInput; error?: string } => {
  const raw = {
    src: String(formData.get("src") ?? ""),
    alt: String(formData.get("alt") ?? ""),
  };

  const parsed = gallerySchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  return {
    data: {
      src: parsed.data.src,
      alt: parsed.data.alt,
    },
  };
};

const toGalleryRow = (data: ParsedGalleryInput): GalleryRowInput => {
  return {
    src: data.src,
    alt: data.alt,
  };
};

export const createGalleryImage = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseGalleryForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const payload = {
    id: crypto.randomUUID(),
    ...toGalleryRow(result.data),
    order_index: 0,
  };

  const { error } = await client.from("gallery").insert(payload);
  if (error) {
    return { ok: false, error: error.message || "Failed to add image." };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};

export const updateGalleryImage = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseGalleryForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const { error } = await client.from("gallery").update(toGalleryRow(result.data)).eq("id", id);
  if (error) {
    return { ok: false, error: error.message || "Failed to update image." };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};

export const deleteGalleryImage = async (id: string): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const { error } = await client.from("gallery").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};

export const deleteGalleryImageAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing image id." };
  }

  return deleteGalleryImage(id);
};
