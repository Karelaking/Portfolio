"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { createScopedLogger } from "@/lib/logging";
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

const logger = createScopedLogger("projects");

export const updateProject = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    logger.info({ id }, "updateProject invoked");
    const client = getSupabaseAdminClient();
    if (!client) {
      logger.error("updateProject: admin client missing");
      return { ok: false, error: "Admin client not configured." };
    }

    const result = parseProjectForm(formData);
    if (!result.data) {
      logger.warn({ error: result.error }, "updateProject: invalid form data");
      return { ok: false, error: result.error ?? "Invalid form data." };
    }

    const data = toProjectRow(result.data);
    const { error } = await client.from("projects").update(data).eq("id", id);
    if (error) {
      logger.error({ error }, "updateProject: update failed");
      return { ok: false, error: error.message || "Failed to update project." };
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    logger.info({ id }, "updateProject: success");
    return { ok: true };
  } catch (error) {
    logger.error({ error }, "updateProject: unexpected error");
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while updating project.",
    };
  }
};
