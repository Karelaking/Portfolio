"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { createScopedLogger } from "@/lib/logging";
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

const logger = createScopedLogger("projects");

export const createProject = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    logger.info("createProject invoked");
    const client = getSupabaseAdminClient();
    if (!client) {
      logger.error("createProject: admin client missing");
      return { ok: false, error: "Admin client not configured." };
    }

    const result = parseProjectForm(formData);
    if (!result.data) {
      logger.warn({ error: result.error }, "createProject: invalid form data");
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
      logger.error({ error }, "createProject: insert failed");
      return { ok: false, error: error.message || "Failed to create project." };
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    logger.info({ id: payload.id }, "createProject: success");
    return { ok: true };
  } catch (error) {
    logger.error({ error }, "createProject: unexpected error");
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while creating project.",
    };
  }
};
