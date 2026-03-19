"use server";

import { revalidatePath } from "next/cache";
import { getProjectRepository } from "@/lib/repositories/projects/get-project-repository";
import type { ActionResult } from "@/types/action-result.interface";
import { parseProjectForm, toProjectRow } from "./project-form";

export const updateProject = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    const repository = getProjectRepository();

    const result = parseProjectForm(formData);
    if (!result.data) {
      return { ok: false, error: result.error ?? "Invalid form data." };
    }

    const data = toProjectRow(result.data);
    const updateResult = await repository.update({
      id,
      data,
    });

    if (!updateResult.ok) {
      return updateResult;
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while updating project.",
    };
  }
};
