import type { WritingPost } from "@/types/writing-post.interface";
import type { WritingRow } from "@/types/writing-row.interface";

const isValidUrlOrPath = (value: string): boolean => {
	if (!value) {
		return false;
	}

	if (value.startsWith("/")) {
		return true;
	}

	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
};

const stripHtml = (value: string): string =>
	value
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();

export const parseWritingForm = (
	formData: FormData
): { data?: WritingPost; error?: string } => {
	const title = String(formData.get("title") ?? "").trim();
	const coverImageSrc = String(formData.get("coverImageSrc") ?? "").trim();
	const coverImageAlt = String(formData.get("coverImageAlt") ?? "").trim();
	const content = String(formData.get("content") ?? "").trim();
	const publishedAt = String(formData.get("publishedAt") ?? "").trim();
	const tagsRaw = String(formData.get("tags") ?? "").trim();

	if (!title) {
		return { error: "Title is required." };
	}

	if (!(coverImageSrc && isValidUrlOrPath(coverImageSrc))) {
		return { error: "Cover image URL must be a valid URL or path." };
	}

	if (!coverImageAlt) {
		return { error: "Cover image alt text is required." };
	}

	if (!content || stripHtml(content).length === 0) {
		return { error: "Content is required." };
	}

	if (!publishedAt) {
		return { error: "Published date is required." };
	}

	const tags = tagsRaw
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

	if (tags.length === 0) {
		return { error: "Add at least one tag." };
	}

	return {
		data: {
			id: "",
			title,
			coverImageSrc,
			coverImageAlt,
			content,
			tags,
			publishedAt,
		},
	};
};

export const toWritingRow = (
	value: Omit<WritingPost, "id">
): Omit<WritingRow, "id"> => ({
	title: value.title,
	cover_image_src: value.coverImageSrc,
	cover_image_alt: value.coverImageAlt,
	content: value.content,
	tags: value.tags,
	published_at: value.publishedAt,
});
