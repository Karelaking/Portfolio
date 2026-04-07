"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

const deleteTechnology = async (id: string): Promise<ActionResult> => {
  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("technologies").deleteOne({ id });
    await db.collection("project_technologies").deleteMany({
      technology_id: id,
    });
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to delete technology.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/technologies");
  return { ok: true };
};

export const deleteTechnologyAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return { ok: false, error: "Missing technology id." };
  }

  return deleteTechnology(id);
};
