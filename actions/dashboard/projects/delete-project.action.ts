"use server";

import { revalidatePath } from "next/cache";
import { getProjectRepository } from "@/lib/repositories/projects/get-project-repository";
import type { ActionResult } from "@/types/action-result.interface";

const deleteProject = async (id: string): Promise<ActionResult> => {
  const repository = getProjectRepository();
  const result = await repository.delete({ id });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  return { ok: true };
};

export const deleteProjectAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing project id." };
  }

  return deleteProject(id);
};
