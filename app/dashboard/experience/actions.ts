"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/portfolio";

const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  period: z.string().min(1, "Period is required"),
  summary: z.string().min(1, "Summary is required"),
  highlights: z.string().min(1, "Highlights are required"),
});

interface ParsedExperienceInput {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

interface ExperienceRowInput {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

const parseHighlights = (raw: string): string[] => {
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
  };

  const parsed = experienceSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid data.";
    return { error: message };
  }

  const highlights = parseHighlights(parsed.data.highlights);
  if (highlights.length === 0) {
    return { error: "Add at least one highlight." };
  }

  return {
    data: {
      role: parsed.data.role,
      company: parsed.data.company,
      period: parsed.data.period,
      summary: parsed.data.summary,
      highlights,
    },
  };
};

const toExperienceRow = (data: ParsedExperienceInput): ExperienceRowInput => {
  return {
    role: data.role,
    company: data.company,
    period: data.period,
    summary: data.summary,
    highlights: data.highlights,
  };
};

export const createExperience = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseExperienceForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const payload = {
    id: crypto.randomUUID(),
    ...toExperienceRow(result.data),
    order_index: 0,
  };

  const { error } = await client.from("experience").insert(payload);
  if (error) {
    return { ok: false, error: error.message || "Failed to add experience." };
  }

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/dashboard/experience");
  return { ok: true };
};

export const updateExperience = async (
  id: string,
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const result = parseExperienceForm(formData);
  if (!result.data) {
    return { ok: false, error: result.error ?? "Invalid form data." };
  }

  const { error } = await client
    .from("experience")
    .update(toExperienceRow(result.data))
    .eq("id", id);
  if (error) {
    return { ok: false, error: error.message || "Failed to update experience." };
  }

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/dashboard/experience");
  return { ok: true };
};

export const deleteExperience = async (id: string): Promise<ActionResult> => {
  const client = getSupabaseAdminClient();
  if (!client) {
    return { ok: false, error: "Admin client not configured." };
  }

  const { error } = await client.from("experience").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/dashboard/experience");
  return { ok: true };
};

export const deleteExperienceAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing experience id." };
  }

  return deleteExperience(id);
};
