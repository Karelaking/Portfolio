import { cache } from "react";
import mongoose from "mongoose";
import {
  fallbackBlog,
  fallbackHero,
  fallbackSocial,
  fallbackGallery,
  fallbackProjects,
  fallbackExpertise,
  fallbackExperience,
  fallbackCurrentFocus,
  fallbackPrimaryServices,
  fallbackTechnologies,
} from "@/lib/portfolio/fallback";
import type { HeroRow } from "@/types/hero/hero-row.interface";
import type { BlogPost } from "@/types/blog-post.interface";
import type { HeroData } from "@/types/hero/hero-data.interface";
import type { ProjectRow } from "@/types/project-row.interface";
import type { SocialLink } from "@/types/social-link.interface";
import type { ProjectItem } from "@/types/project-item.interface";
import type { GalleryImage } from "@/types/gallery-image.interface";
import type { ExpertiseItem } from "@/types/expertise-item.interface";
import type { ExperienceItem } from "@/types/experience-item.interface";
import type { CurrentFocusItem } from "@/types/current-focus-item.interface";
import type { PrimaryServiceItem } from "@/types/primary-service-item.interface";
import type { TechnologyRow } from "@/types/technology-row.interface";
import type { TechnologyItem } from "@/types/technology-item.interface";
import { connectMongo } from "@/lib/database/mongodb";

interface ProjectTechnologyRelationDocument {
  project_id: string;
  technology_id: string;
}

interface TechnologyDocument {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_key: string;
  order_index?: number;
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

const fetchCollection = async <T,>(
  collectionName: string,
  options?: {
    sort?: Record<string, 1 | -1>;
    projection?: Record<string, 0 | 1>;
    filter?: Record<string, unknown>;
  },
): Promise<T[] | null> => {
  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      console.warn(`[portfolio] MongoDB connection missing for ${collectionName}.`);
      return null;
    }

    const cursor = db
      .collection(collectionName)
      .find(options?.filter ?? {}, {
        projection: options?.projection,
      });

    if (options?.sort) {
      cursor.sort(options.sort);
    }

    const rows = await cursor.toArray();
    return rows as T[];
  } catch (error: unknown) {
    console.error(`[portfolio] MongoDB request failed for ${collectionName}:`, error);
    return null;
  }
};

export const getHero = cache(async (): Promise<HeroData> => {
  const data = await fetchCollection<HeroRow>("hero", {
    sort: { order_index: 1, id: 1 },
    projection: {
      _id: 0,
      id: 1,
      title: 1,
      subtitle: 1,
      description: 1,
      location: 1,
      availability: 1,
      image_src: 1,
      image_alt: 1,
      metrics: 1,
    },
  });

  const first = data?.find((item) => item.id === "default") ?? data?.[0];
  if (first) {
    return mapHeroRow(first);
  }
  return fallbackHero;
});

export const getExpertise = cache(async (): Promise<ExpertiseItem[]> => {
  const data = await fetchCollection<ExpertiseItem>("expertise", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, title: 1, description: 1, icon: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackExpertise;
});

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const data = await fetchCollection<ExperienceItem>("experience", {
    sort: { order_index: 1, id: 1 },
    projection: {
      _id: 0,
      id: 1,
      role: 1,
      company: 1,
      period: 1,
      summary: 1,
      highlights: 1,
    },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackExperience;
});

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  const data = await fetchCollection<ProjectRow>("projects", {
    sort: { order_index: 1, id: 1 },
    projection: {
      _id: 0,
      id: 1,
      name: 1,
      description: 1,
      tags: 1,
      image_src: 1,
      image_alt: 1,
      href: 1,
    },
  });
  if (data && data.length > 0) {
    return data.map(mapProjectRow);
  }
  return fallbackProjects;
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const data = await fetchCollection<SocialLink>("social_links", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, platform: 1, label: 1, href: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackSocial;
});

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const data = await fetchCollection<BlogPost>("blog_posts", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, title: 1, excerpt: 1, date: 1, href: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackBlog;
});

export const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
  const data = await fetchCollection<GalleryImage>("gallery", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, src: 1, alt: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackGallery;
});

export const getCurrentFocus = cache(async (): Promise<CurrentFocusItem[]> => {
  const data = await fetchCollection<CurrentFocusItem>("current_focus", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, label: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackCurrentFocus;
});

export const getPrimaryServices = cache(async (): Promise<PrimaryServiceItem[]> => {
  const data = await fetchCollection<PrimaryServiceItem>("primary_services", {
    sort: { order_index: 1, id: 1 },
    projection: { _id: 0, id: 1, label: 1 },
  });
  if (data && data.length > 0) {
    return data;
  }
  return fallbackPrimaryServices;
});

const mapTechnologyRow = (row: TechnologyRow): TechnologyItem => {
  const relatedProjects = Array.isArray(row.project_technologies)
    ? row.project_technologies
      .map((relation) => relation.projects)
      .filter((project): project is ProjectRow => project !== null)
      .map(mapProjectRow)
    : [];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    websiteUrl: row.website_url,
    logoKey: row.logo_key,
    relatedProjects,
  };
};

export const getTechnologies = cache(async (): Promise<TechnologyItem[]> => {
  const [technologyRows, relationRows, projectRows] = await Promise.all([
    fetchCollection<TechnologyDocument>("technologies", {
      sort: { order_index: 1, id: 1 },
      projection: {
        _id: 0,
        id: 1,
        name: 1,
        slug: 1,
        description: 1,
        website_url: 1,
        logo_key: 1,
      },
    }),
    fetchCollection<ProjectTechnologyRelationDocument>("project_technologies", {
      projection: {
        _id: 0,
        project_id: 1,
        technology_id: 1,
      },
    }),
    fetchCollection<ProjectRow>("projects", {
      sort: { order_index: 1, id: 1 },
      projection: {
        _id: 0,
        id: 1,
        name: 1,
        description: 1,
        tags: 1,
        image_src: 1,
        image_alt: 1,
        href: 1,
      },
    }),
  ]);

  if (technologyRows && technologyRows.length > 0) {
    const projectById = new Map<string, ProjectRow>(
      (projectRows ?? []).map((project) => [project.id, project]),
    );

    const relationMap = new Map<string, ProjectRow[]>();

    for (const relation of relationRows ?? []) {
      const project = projectById.get(relation.project_id);
      if (!project) {
        continue;
      }

      const current = relationMap.get(relation.technology_id) ?? [];
      current.push(project);
      relationMap.set(relation.technology_id, current);
    }

    const rows: TechnologyRow[] = technologyRows.map((technology) => {
      const relatedProjects = relationMap.get(technology.id) ?? [];

      return {
        id: technology.id,
        name: technology.name,
        slug: technology.slug,
        description: technology.description,
        website_url: technology.website_url,
        logo_key: technology.logo_key,
        project_technologies: relatedProjects.map((project) => {
          return {
            project_id: project.id,
            projects: project,
          };
        }),
      };
    });

    return rows.map(mapTechnologyRow);
  }

  return fallbackTechnologies;
});
