import { z } from "zod";
import type { HeroMetric } from "@/types/hero-metric.interface";
import type { ParsedHeroInput } from "@/types/parsed-hero-input.interface";
import type { HeroRowInput } from "@/types/hero-row-input.interface";

const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  availability: z.string().min(1, "Availability is required"),
  imageSrc: z.string().min(1, "Image URL is required"),
  imageAlt: z.string().min(1, "Image alt text is required"),
  metrics: z.string().min(1, "Metrics are required"),
});

const parseMetrics = (raw: string): HeroMetric[] => {
  try {
    const parsed = JSON.parse(raw) as HeroMetric[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .map((item) => ({
        label: String(item?.label ?? "").trim(),
        value: String(item?.value ?? "").trim(),
      }))
      .filter((item) => item.label.length > 0 && item.value.length > 0);
  } catch {
    return [];
  }
};

const parseHeroForm = (
  formData: FormData,
): { data?: ParsedHeroInput; error?: string } => {
  const raw = {
    title: String(formData.get("title") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    description: String(formData.get("description") ?? ""),
    location: String(formData.get("location") ?? ""),
    availability: String(formData.get("availability") ?? ""),
    imageSrc: String(formData.get("imageSrc") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    metrics: String(formData.get("metrics") ?? "[]"),
  };

  const parsed = heroSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  const metrics = parseMetrics(parsed.data.metrics);
  if (metrics.length === 0) {
    return { error: "Add at least one metric with a label and value." };
  }

  return {
    data: {
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      description: parsed.data.description,
      location: parsed.data.location,
      availability: parsed.data.availability,
      imageSrc: parsed.data.imageSrc,
      imageAlt: parsed.data.imageAlt,
      metrics,
    },
  };
};

const toHeroRow = (data: ParsedHeroInput): HeroRowInput => {
  return {
    id: "default",
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    location: data.location,
    availability: data.availability,
    image_src: data.imageSrc,
    image_alt: data.imageAlt,
    metrics: data.metrics,
  };
};

export { parseHeroForm, toHeroRow };
