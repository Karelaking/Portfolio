"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

const deleteWritingPost = async (id: string): Promise<ActionResult> => {
  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("writing_posts").deleteOne({ id });
  } catch (error: unknown) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete writing post.",
    };
  }

  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/dashboard/writing");
  return { ok: true };
};

export const deleteWritingPostAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return { ok: false, error: "Missing writing post id." };
  }

  return deleteWritingPost(id);
};
