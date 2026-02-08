"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseGalleryForm, toGalleryRow } from "./gallery-form";

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
