import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/server";
import type { ActionResult } from "@/types/action-result.interface";
import type { ProjectItem } from "@/types/project-item.interface";
import type { ProjectRowInput } from "@/types/project-row-input.interface";
import type {
  CreateProjectInput,
  DeleteProjectInput,
  ProjectFetchAllResult,
  ProjectRepository,
  UpdateProjectInput,
} from "@/types/repositories/project-repository.interface";

interface TechnologyLookupRow {
  id: string;
  slug: string;
}

const normalizeTechnologyValue = (value: string): string => {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
};

const getMatchingTechnologyIds = (
  technologies: TechnologyLookupRow[],
  projectTags: string[],
): string[] => {
  const normalizedTags = projectTags.map(normalizeTechnologyValue);

  return technologies
    .filter((technology) => {
      const normalizedSlug = normalizeTechnologyValue(technology.slug);

      return normalizedTags.some(
        (tag) => tag.includes(normalizedSlug) || normalizedSlug.includes(tag),
      );
    })
    .map((technology) => technology.id);
};

const mapProjectRowToItem = (row: ProjectRowInput & { id: string }): ProjectItem => {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    tags: Array.isArray(row.tags) ? row.tags : [],
    imageSrc: row.image_src,
    imageAlt: row.image_alt,
    href: row.href,
  };
};

export class ProjectRepositoryImpl implements ProjectRepository {
  private getReadClient() {
    return getSupabaseAdminClient() ?? getSupabaseServerClient();
  }

  private getWriteClient() {
    return getSupabaseAdminClient();
  }

  private async syncProjectTechnologies(
    projectId: string,
    projectTags: string[],
  ): Promise<string | null> {
    const client = this.getWriteClient();

    if (!client) {
      return "Database admin client not configured.";
    }

    const { data: technologies, error: technologyQueryError } = await client
      .from("technologies")
      .select("id,slug");

    if (technologyQueryError) {
      return technologyQueryError.message || "Failed to load technologies.";
    }

    const { error: cleanupError } = await client
      .from("project_technologies")
      .delete()
      .eq("project_id", projectId);

    if (cleanupError) {
      return cleanupError.message || "Failed to clear old project technologies.";
    }

    if (!technologies || technologies.length === 0) {
      return null;
    }

    const matchedTechnologyIds = getMatchingTechnologyIds(
      technologies as TechnologyLookupRow[],
      projectTags,
    );

    if (matchedTechnologyIds.length === 0) {
      return null;
    }

    const relationRows = matchedTechnologyIds.map((technologyId) => {
      return {
        project_id: projectId,
        technology_id: technologyId,
      };
    });

    const { error: insertError } = await client
      .from("project_technologies")
      .insert(relationRows);

    if (insertError) {
      return insertError.message || "Failed to save project technologies.";
    }

    return null;
  }

  async getAll(): Promise<ProjectFetchAllResult> {
    const client = this.getReadClient();

    if (!client) {
      return {
        projects: [],
        error: "Database client not configured. Check environment variables and restart the dev server.",
      };
    }

    const { data, error } = await client
      .from("projects")
      .select("id,name,description,tags,image_src,image_alt,href")
      .order("order_index", { ascending: true });

    if (error) {
      return {
        projects: [],
        error: `Database error: ${error.message}`,
      };
    }

    const projects =
      (Array.isArray(data)
        ? data.map((row) =>
          mapProjectRowToItem(
            row as ProjectRowInput & {
              id: string;
            },
          ),
        )
        : []) ?? [];

    return { projects };
  }

  async getById(id: string): Promise<ProjectItem | null> {
    const client = this.getReadClient();

    if (!client) {
      return null;
    }

    const { data } = await client
      .from("projects")
      .select("id,name,description,tags,image_src,image_alt,href")
      .eq("id", id)
      .single();

    if (!data) {
      return null;
    }

    return mapProjectRowToItem(
      data as ProjectRowInput & {
        id: string;
      },
    );
  }

  async create(input: CreateProjectInput): Promise<ActionResult> {
    const client = this.getWriteClient();

    if (!client) {
      return { ok: false, error: "Database admin client not configured." };
    }

    const payload = {
      id: input.id,
      ...input.data,
      order_index: 0,
    };

    const { error } = await client.from("projects").insert(payload);

    if (error) {
      return { ok: false, error: error.message || "Failed to create project." };
    }

    const relationError = await this.syncProjectTechnologies(input.id, input.data.tags);

    if (relationError) {
      return { ok: false, error: relationError };
    }

    return { ok: true };
  }

  async update(input: UpdateProjectInput): Promise<ActionResult> {
    const client = this.getWriteClient();

    if (!client) {
      return { ok: false, error: "Database admin client not configured." };
    }

    const { error } = await client
      .from("projects")
      .update(input.data)
      .eq("id", input.id);

    if (error) {
      return { ok: false, error: error.message || "Failed to update project." };
    }

    const relationError = await this.syncProjectTechnologies(input.id, input.data.tags);

    if (relationError) {
      return { ok: false, error: relationError };
    }

    return { ok: true };
  }

  async delete(input: DeleteProjectInput): Promise<ActionResult> {
    const client = this.getWriteClient();

    if (!client) {
      return { ok: false, error: "Database admin client not configured." };
    }

    const { error } = await client.from("projects").delete().eq("id", input.id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }
}
