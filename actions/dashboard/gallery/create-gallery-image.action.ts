"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseGalleryForm, toGalleryRow } from "./gallery-form";

export const createGalleryImage = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const result = parseGalleryForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    const payload = {
      id: crypto.randomUUID(),
      ...toGalleryRow(result.data),
      order_index: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db.collection("gallery").insertOne(payload);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to add image.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};
