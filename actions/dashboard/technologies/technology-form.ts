import { z } from "zod";
import type { ParsedTechnologyInput } from "@/types/parsed-technology-input.interface";
import type { TechnologyRowInput } from "@/types/technology-row-input.interface";

const technologySchema = z.object({
	name: z.string().min(1, "Technology name is required"),
	description: z.string().min(1, "Description is required"),
	websiteUrl: z.string().url("Website URL must be valid"),
	logoKey: z.string().min(1, "Logo key is required"),
	projectIds: z.array(z.string()).default([]),
});

const toSlug = (value: string): string =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const parseProjectIds = (formData: FormData): string[] =>
	formData
		.getAll("projectIds")
		.map((value: FormDataEntryValue): string => String(value).trim())
		.filter((value: string): boolean => value.length > 0);

const parseTechnologyForm = (
	formData: FormData
): { data?: ParsedTechnologyInput; error?: string } => {
	const raw = {
		name: String(formData.get("name") ?? ""),
		description: String(formData.get("description") ?? ""),
		websiteUrl: String(formData.get("websiteUrl") ?? ""),
		logoKey: String(formData.get("logoKey") ?? ""),
		projectIds: parseProjectIds(formData),
	};

	const parsed = technologySchema.safeParse(raw);

	if (!parsed.success) {
		const message = parsed.error.issues[0]?.message ?? "Invalid data.";
		return { error: message };
	}

	return {
		data: {
			name: parsed.data.name,
			description: parsed.data.description,
			websiteUrl: parsed.data.websiteUrl,
			logoKey: parsed.data.logoKey,
			projectIds: parsed.data.projectIds,
		},
	};
};

const toTechnologyRow = (data: ParsedTechnologyInput): TechnologyRowInput => ({
	name: data.name,
	slug: toSlug(data.name),
	description: data.description,
	website_url: data.websiteUrl,
	logo_key: data.logoKey,
});

export { parseTechnologyForm, toTechnologyRow };
