"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseHeroForm, toHeroRow } from "./hero-form";

export const upsertHeroAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseHeroForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const payload = toHeroRow(result.data);
  const { error } = await client.from("hero").upsert(payload, { onConflict: "id" });
  if (error) {
    return { ok: false, error: error.message || "Failed to save hero." };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/hero");
  return { ok: true };
};
