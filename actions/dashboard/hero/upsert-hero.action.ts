"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import { parseHeroForm, toHeroRow } from "./hero-form";

export const upsertHeroAction = async (
	_prevState: ActionResult | null,
	formData: FormData
): Promise<ActionResult> => {
	const result = parseHeroForm(formData);
	if (!result.data) {
		return { ok: false, error: result.error ?? "Invalid form data." };
	}

	try {
		await connectMongo();
		const db = mongoose.connection.db;

		if (!db) {
			return { ok: false, error: "MongoDB is not connected." };
		}

		const payload = toHeroRow(result.data);

		await db.collection("hero").updateOne(
			{ id: "default" },
			{
				$set: {
					...payload,
					updated_at: new Date(),
				},
				$setOnInsert: {
					created_at: new Date(),
				},
			},
			{ upsert: true }
		);
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Failed to save hero.",
		};
	}

	revalidatePath("/");
	revalidatePath("/dashboard/hero");
	return { ok: true };
};
