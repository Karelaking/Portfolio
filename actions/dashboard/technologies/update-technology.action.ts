"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import type { ParsedTechnologyInput } from "@/types/parsed-technology-input.interface";
import { parseTechnologyForm, toTechnologyRow } from "./technology-form";

const syncTechnologyProjects = async (
  db: mongoose.mongo.Db,
  technologyId: string,
  selectedProjectIds: string[],
): Promise<void> => {
  await db.collection("project_technologies").deleteMany({
    technology_id: technologyId,
  });

  if (selectedProjectIds.length === 0) {
    return;
  }

  const existingProjectRows = await db
    .collection("projects")
    .find(
      { id: { $in: selectedProjectIds } },
      {
        projection: {
          _id: 0,
          id: 1,
        },
      },
    )
    .toArray();

  const validProjectIds = existingProjectRows
    .map((row) => String((row as { id?: string }).id ?? ""))
    .filter((value) => value.length > 0);

  if (validProjectIds.length === 0) {
    return;
  }

  const relationRows = validProjectIds.map((projectId) => {
    return {
      project_id: projectId,
      technology_id: technologyId,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  await db.collection("project_technologies").insertMany(relationRows);
};

export const updateTechnology = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const result = parseTechnologyForm(formData);

  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const payloadData: ParsedTechnologyInput = result.data;

  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    await db.collection("technologies").updateOne(
      { id },
      {
        $set: {
          ...toTechnologyRow(payloadData),
          updated_at: new Date(),
        },
      },
    );

    await syncTechnologyProjects(db, id, payloadData.projectIds);
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to update technology.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/technologies");
  return { ok: true };
};
