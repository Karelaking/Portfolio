"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseExperienceForm, toExperienceRow } from "./experience-form";

export const createExperience = async (
	_prevState: ActionResult | null,
	formData: FormData
): Promise<ActionResult> => {
	const result = parseExperienceForm(formData);
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
			...toExperienceRow(result.data),
			order_index: 0,
			created_at: new Date(),
			updated_at: new Date(),
		};

		await db.collection("experience").insertOne(payload);
	} catch (error) {
		return {
			ok: false,
			error:
				error instanceof Error ? error.message : "Failed to add experience.",
		};
	}

	revalidatePath("/");
	revalidatePath("/experience");
	revalidatePath("/dashboard/experience");
	return { ok: true };
};
