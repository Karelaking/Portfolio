import type { SupabaseClient } from "@supabase/supabase-js";

interface TechnologyLookupRow {
  id: string;
  slug: string;
}

const normalizeValue = (value: string): string => {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
};

const getMatchingTechnologyIds = (
  technologies: TechnologyLookupRow[],
  projectTags: string[],
): string[] => {
  const normalizedTags = projectTags.map(normalizeValue);

  return technologies
    .filter((technology) => {
      const normalizedSlug = normalizeValue(technology.slug);

      return normalizedTags.some(
        (tag) => tag.includes(normalizedSlug) || normalizedSlug.includes(tag),
      );
    })
    .map((technology) => technology.id);
};

export const syncProjectTechnologies = async (
  client: SupabaseClient,
  projectId: string,
  projectTags: string[],
): Promise<string | null> => {
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

  const matchedTechnologyIds = getMatchingTechnologyIds(technologies, projectTags);

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
};