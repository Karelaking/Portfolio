"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";

const deleteExperience = async (id: string): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const { error } = await client.from("experience").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/dashboard/experience");
  return { ok: true };
};

export const deleteExperienceAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing experience id." };
  }

  return deleteExperience(id);
};
