import { z } from "zod";
import { serializeExperienceHighlights } from "@/lib/portfolio/experience-tech";
import type { ParsedExperienceInput } from "@/types/parsed-experience-input.interface";
import type { ExperienceRowInput } from "@/types/experience-row-input.interface";

const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  period: z.string().min(1, "Period is required"),
  summary: z.string().min(1, "Summary is required"),
  highlights: z.string().min(1, "Highlights are required"),
  coreTech: z.string().optional().default(""),
});

const parseList = (raw: string): string[] => {
  return raw
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const parseExperienceForm = (
  formData: FormData,
): { data?: ParsedExperienceInput; error?: string } => {
  const raw = {
    role: String(formData.get("role") ?? ""),
    company: String(formData.get("company") ?? ""),
    period: String(formData.get("period") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    highlights: String(formData.get("highlights") ?? ""),
    coreTech: String(formData.get("coreTech") ?? ""),
  };

  const parsed = experienceSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  const highlights = parseList(parsed.data.highlights);
  if (highlights.length === 0) {
    return { error: "Add at least one highlight." };
  }

  const coreTech = parseList(parsed.data.coreTech);

  return {
    data: {
      role: parsed.data.role,
      company: parsed.data.company,
      period: parsed.data.period,
      summary: parsed.data.summary,
      highlights,
      coreTech,
    },
  };
};

const toExperienceRow = (data: ParsedExperienceInput): ExperienceRowInput => {
  return {
    role: data.role,
    company: data.company,
    period: data.period,
    summary: data.summary,
    highlights: serializeExperienceHighlights(data.highlights, data.coreTech),
  };
};

export { parseExperienceForm, toExperienceRow };
