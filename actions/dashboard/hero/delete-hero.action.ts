"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";

export const deleteHeroAction = async (): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const { error } = await client.from("hero").delete().eq("id", "default");
  if (error) {
    return { ok: false, error: error.message || "Failed to delete hero." };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/hero");
  return { ok: true };
};
