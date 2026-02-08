"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

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
