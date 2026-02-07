import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  fallbackBlog,
  fallbackExperience,
  fallbackExpertise,
  fallbackGallery,
  fallbackHero,
  fallbackProjects,
  fallbackSocial,
} from "@/lib/portfolio/fallback";
import type {
  BlogPost,
  ExpertiseItem,
  ExperienceItem,
  GalleryImage,
  HeroData,
  ProjectItem,
  SocialLink,
} from "@/lib/portfolio/types";

const fetchTable = async <T,>(
  table: string,
  select: string,
  order?: string,
): Promise<T[] | null> => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const query = client.from(table).select(select);
  const { data, error } = order ? await query.order(order) : await query;

  if (error || !data) {
    return null;
  }

  return data as T[];
};

export const getHero = cache(async (): Promise<HeroData> => {
  const data = await fetchTable<HeroData>("hero", "*");
  const first = data?.[0];
  if (first) {
    return first;
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
  const data = await fetchTable<ProjectItem>(
    "projects",
    "id,name,description,tags,imageSrc,imageAlt,href",
    "id",
  );
  if (data && data.length > 0) {
    return data;
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
