import { cache } from "react";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import {
  fallbackBlog,
  fallbackCurrentFocus,
  fallbackExperience,
  fallbackExpertise,
  fallbackGallery,
  fallbackHero,
  fallbackPrimaryServices,
  fallbackProjects,
  fallbackSocial,
} from "@/lib/portfolio/fallback";
import type {
  BlogPost,
  CurrentFocusItem,
  ExpertiseItem,
  ExperienceItem,
  GalleryImage,
  HeroData,
  PrimaryServiceItem,
  ProjectItem,
  SocialLink,
} from "@/types/portfolio";

interface HeroRow extends Omit<HeroData, "imageSrc" | "imageAlt"> {
  image_src: string;
  image_alt: string;
}

interface ProjectRow extends Omit<ProjectItem, "imageSrc" | "imageAlt"> {
  image_src: string;
  image_alt: string;
}

const mapHeroRow = (row: HeroRow): HeroData => {
  return {
    ...row,
    imageSrc: row.image_src,
    imageAlt: row.image_alt,
  };
};

const mapProjectRow = (row: ProjectRow): ProjectItem => {
  return {
    ...row,
    tags: Array.isArray(row.tags) ? row.tags : [],
    imageSrc: row.image_src,
    imageAlt: row.image_alt,
  };
};

const fetchTable = async <T,>(
  table: string,
  select: string,
  order?: string,
): Promise<T[] | null> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();

  if (!client) {
    console.warn(`[portfolio] Supabase client missing for ${table}.`);
    return null;
  }

  const query = client.from(table).select(select);
  const { data, error } = order ? await query.order(order) : await query;

  if (error || !data) {
    console.error(`[portfolio] Supabase error for ${table}:`, error);
    return null;
  }

  return data as T[];
};

export const getHero = cache(async (): Promise<HeroData> => {
  const data = await fetchTable<HeroRow>("hero", "*");
  const first = data?.[0];
  if (first) {
    return mapHeroRow(first);
  }
  return fallbackHero;
});

export const getExpertise = cache(async (): Promise<ExpertiseItem[]> => {
  const data = await fetchTable<ExpertiseItem>(
    "expertise",
    "id,title,description,icon",
    "id",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackExpertise;
});

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const data = await fetchTable<ExperienceItem>(
    "experience",
    "id,role,company,period,summary,highlights",
    "id",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackExperience;
});

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  const data = await fetchTable<ProjectRow>("projects", "*", "order_index");
  if (data && data.length > 0) {
    return data.map(mapProjectRow);
  }
  return fallbackProjects;
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const data = await fetchTable<SocialLink>(
    "social_links",
    "id,platform,label,href",
    "id",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackSocial;
});

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const data = await fetchTable<BlogPost>(
    "blog_posts",
    "id,title,excerpt,date,href",
    "id",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackBlog;
});

export const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
  const data = await fetchTable<GalleryImage>("gallery", "id,src,alt", "id");
  if (data && data.length > 0) {
    return data;
  }
  return fallbackGallery;
});

export const getCurrentFocus = cache(async (): Promise<CurrentFocusItem[]> => {
  const data = await fetchTable<CurrentFocusItem>(
    "current_focus",
    "id,label",
    "order_index",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackCurrentFocus;
});

export const getPrimaryServices = cache(async (): Promise<PrimaryServiceItem[]> => {
  const data = await fetchTable<PrimaryServiceItem>(
    "primary_services",
    "id,label",
    "order_index",
  );
  if (data && data.length > 0) {
    return data;
  }
  return fallbackPrimaryServices;
});
