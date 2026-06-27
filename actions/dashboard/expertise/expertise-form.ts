import { z } from "zod";
import type { ExpertiseRowInput } from "@/types/expertise-row-input.interface";
import type { ParsedExpertiseInput } from "@/types/parsed-expertise-input.interface";

const expertiseSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	icon: z.enum(["strategy", "system", "frontend", "direction"]),
});

const parseExpertiseForm = (
	formData: FormData
): { data?: ParsedExpertiseInput; error?: string } => {
	const raw = {
		title: String(formData.get("title") ?? ""),
		description: String(formData.get("description") ?? ""),
		icon: String(formData.get("icon") ?? ""),
	};

	const parsed = expertiseSchema.safeParse(raw);
	if (!parsed.success) {
		const message = parsed.error.issues[0]?.message ?? "Invalid data.";
		return { error: message };
	}

	return {
		data: {
			title: parsed.data.title,
			description: parsed.data.description,
			icon: parsed.data.icon,
		},
	};
};

const toExpertiseRow = (data: ParsedExpertiseInput): ExpertiseRowInput => ({
	title: data.title,
	description: data.description,
	icon: data.icon,
});

export { parseExpertiseForm, toExpertiseRow };
