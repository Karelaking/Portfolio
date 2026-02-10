"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseGalleryForm, toGalleryRow } from "./gallery-form";

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

  const { error } = await client
    .from("gallery")
    .update(toGalleryRow(result.data))
    .eq("id", id);
  if (error) {
    return { ok: false, error: error.message || "Failed to update image." };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};
