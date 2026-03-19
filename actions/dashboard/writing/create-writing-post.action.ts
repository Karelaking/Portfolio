"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseWritingForm, toWritingRow } from "./writing-form";

export const createWritingPost = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const parsed = parseWritingForm(formData);
  if (!parsed.data) {
    return { ok: false, error: parsed.error ?? "Invalid form data." };
  }

  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("writing_posts").insertOne({
      id: crypto.randomUUID(),
      ...toWritingRow(parsed.data),
      order_index: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error: unknown) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create writing post.",
    };
  }

  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/dashboard/writing");
  return { ok: true };
};
