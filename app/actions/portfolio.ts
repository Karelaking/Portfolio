"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type {
  ActionResult,
  BlogPost,
  ExpertiseItem,
  ExperienceItem,
  GalleryImage,
  HeroData,
  ProjectItem,
  SocialLink,
} from "@/lib/portfolio/types";

const getAdminClient = (): SupabaseClient | null => {
  return getSupabaseAdminClient();
};

const validateAdminToken = (adminToken?: string): string | null => {
  const expected = process.env.ADMIN_ACTION_TOKEN;
  if (!expected) {
    return "Admin token not configured.";
  }
  if (!adminToken || adminToken !== expected) {
    return "Unauthorized.";
  }
  return null;
};

const resultFromError = (error: string | null): ActionResult => {
  if (error) {
    return { ok: false, error };
  }
  return { ok: true };
};

const upsertWithId = async <T extends { id: string }>(
  client: SupabaseClient,
  table: string,
  payload: T,
): Promise<ActionResult> => {
  const { error } = await client.from(table).upsert(payload, { onConflict: "id" });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
};

export const upsertHero = async (
  data: HeroData,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }

  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }

  const payload = { id: "default", ...data };
  const { error } = await client
    .from("hero")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  return { ok: true };
};

export const upsertExpertise = async (
  item: ExpertiseItem,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "expertise", item);
  revalidatePath("/");
  return result;
};

export const upsertExperience = async (
  item: ExperienceItem,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "experience", item);
  revalidatePath("/");
  return result;
};

export const upsertProject = async (
  item: ProjectItem,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "projects", item);
  revalidatePath("/");
  return result;
};

export const upsertSocialLink = async (
  item: SocialLink,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "social_links", item);
  revalidatePath("/");
  return result;
};

export const upsertBlogPost = async (
  item: BlogPost,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "blog_posts", item);
  revalidatePath("/");
  return result;
};

export const upsertGalleryImage = async (
  item: GalleryImage,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const result = await upsertWithId(client, "gallery", item);
  revalidatePath("/");
  return result;
};

export const deleteGalleryImage = async (
  id: string,
  adminToken?: string,
): Promise<ActionResult> => {
  const authError = validateAdminToken(adminToken);
  if (authError) {
    return resultFromError(authError);
  }
  const client = getAdminClient();
  if (!client) {
    return resultFromError("Admin client not configured.");
  }
  const { error } = await client.from("gallery").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/");
  return { ok: true };
};
