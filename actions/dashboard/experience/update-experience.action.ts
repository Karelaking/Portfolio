"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseExperienceForm, toExperienceRow } from "./experience-form";

export const updateExperience = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseExperienceForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const { error } = await client
    .from("experience")
    .update(toExperienceRow(result.data))
    .eq("id", id);
  if (error) {
    return { ok: false, error: error.message || "Failed to update experience." };
  }

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/dashboard/experience");
  return { ok: true };
};
