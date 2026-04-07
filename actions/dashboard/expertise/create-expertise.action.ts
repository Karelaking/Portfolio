"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseExpertiseForm, toExpertiseRow } from "./expertise-form";

export const createExpertise = async (
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

    const payload = {
      id: crypto.randomUUID(),
      ...toExpertiseRow(result.data),
      order_index: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db.collection("expertise").insertOne(payload);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to add expertise.",
    };
  }

  revalidatePath("/");
  revalidatePath("/expertise");
  revalidatePath("/dashboard/expertise");
  return { ok: true };
};