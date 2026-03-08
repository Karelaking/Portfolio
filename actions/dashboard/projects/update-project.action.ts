"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/server";
// logger removed
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

// logger removed

export const updateProject = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    // logger removed
    const client = getSupabaseAdminClient();
    if (!client) {
      // logger removed
      return { ok: false, error: "Admin client not configured." };
    }

    const result = parseProjectForm(formData);
    if (!result.data) {
      // logger removed
      return { ok: false, error: result.error ?? "Invalid form data." };
    }

    const data = toProjectRow(result.data);
    const { error } = await client.from("projects").update(data).eq("id", id);
    if (error) {
      // logger removed
      return { ok: false, error: error.message || "Failed to update project." };
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    // logger removed
    return { ok: true };
  } catch (error) {
    // logger removed
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while updating project.",
    };
  }
};
