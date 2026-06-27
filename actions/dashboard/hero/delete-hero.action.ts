"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

export const deleteHeroAction = async (): Promise<ActionResult> => {
	try {
		await connectMongo();
		const db = mongoose.connection.db;

		if (!db) {
			return { ok: false, error: "MongoDB is not connected." };
		}

		await db.collection("hero").deleteOne({ id: "default" });
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Failed to delete hero.",
		};
	}

	revalidatePath("/");
	revalidatePath("/dashboard/hero");
	return { ok: true };
};
