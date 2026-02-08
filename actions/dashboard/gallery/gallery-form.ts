import { z } from "zod";
import type { ParsedGalleryInput } from "@/types/parsed-gallery-input.interface";
import type { GalleryRowInput } from "@/types/gallery-row-input.interface";

const gallerySchema = z.object({
  src: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required"),
});

const parseGalleryForm = (
  formData: FormData,
): { data?: ParsedGalleryInput; error?: string } => {
  const raw = {
    src: String(formData.get("src") ?? ""),
    alt: String(formData.get("alt") ?? ""),
  };

  const parsed = gallerySchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  return {
    data: {
      src: parsed.data.src,
      alt: parsed.data.alt,
    },
  };
};

const toGalleryRow = (data: ParsedGalleryInput): GalleryRowInput => {
  return {
    src: data.src,
    alt: data.alt,
  };
};

export { parseGalleryForm, toGalleryRow };
