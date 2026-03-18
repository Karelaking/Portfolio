"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

const deleteGalleryImage = async (id: string): Promise<ActionResult> => {
  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("gallery").deleteOne({ id });
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to delete image.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};

export const deleteGalleryImageAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing image id." };
  }

  return deleteGalleryImage(id);
};
