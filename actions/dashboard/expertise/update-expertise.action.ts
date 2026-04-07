"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseExpertiseForm, toExpertiseRow } from "./expertise-form";

export const updateExpertise = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const result = parseExpertiseForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("expertise").updateOne(
      { id },
      {
        $set: {
          ...toExpertiseRow(result.data),
          updated_at: new Date(),
        },
      },
    );
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to update expertise.",
    };
  }

  revalidatePath("/");
  revalidatePath("/expertise");
  revalidatePath("/dashboard/expertise");
  return { ok: true };
};