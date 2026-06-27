"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseGalleryForm, toGalleryRow } from "./gallery-form";

export const updateGalleryImage = async (
	id: string,
	_prevState: ActionResult | null,
	formData: FormData
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

		await db.collection("gallery").updateOne(
			{ id },
			{
				$set: {
					...toGalleryRow(result.data),
					updated_at: new Date(),
				},
			}
		);
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Failed to update image.",
		};
	}

	revalidatePath("/");
	revalidatePath("/dashboard/gallery");
	return { ok: true };
};
