"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

const deleteExperience = async (id: string): Promise<ActionResult> => {
	try {
		await connectMongo();
		const db = mongoose.connection.db;

		if (!db) {
			return { ok: false, error: "MongoDB is not connected." };
		}

		await db.collection("experience").deleteOne({ id });
	} catch (error) {
		return {
			ok: false,
			error:
				error instanceof Error ? error.message : "Failed to delete experience.",
		};
	}

	revalidatePath("/");
	revalidatePath("/experience");
	revalidatePath("/dashboard/experience");
	return { ok: true };
};

export const deleteExperienceAction = async (
	_prevState: ActionResult | null,
	formData: FormData
): Promise<ActionResult> => {
	const id = String(formData.get("id") ?? "");
	if (!id) {
		return { ok: false, error: "Missing experience id." };
	}

	return deleteExperience(id);
};
