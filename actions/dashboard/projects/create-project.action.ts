"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

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
