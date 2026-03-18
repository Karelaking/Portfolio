export interface ParsedExperienceHighlights {
  highlights: string[];
  coreTech: string[];
}

const CORE_TECH_PREFIX = "__core-tech__:";

const stripPrefix = (value: string): string => {
  return value.replace(CORE_TECH_PREFIX, "").trim();
};

export const splitExperienceHighlights = (
  highlights: string[],
): ParsedExperienceHighlights => {
  const parsed: ParsedExperienceHighlights = {
    highlights: [],
    coreTech: [],
  };

  for (const item of highlights) {
    const normalized = item.trim();
    if (!normalized) {
      continue;
    }

    if (normalized.startsWith(CORE_TECH_PREFIX)) {
      const tech = stripPrefix(normalized);
      if (tech.length > 0) {
        parsed.coreTech.push(tech);
      }
      continue;
    }

    parsed.highlights.push(normalized);
  }

  return parsed;
};

export const serializeExperienceHighlights = (
  highlights: string[],
  coreTech: string[],
): string[] => {
  const normalizedHighlights = highlights
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const normalizedCoreTech = coreTech
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => `${CORE_TECH_PREFIX}${item}`);

  return [...normalizedHighlights, ...normalizedCoreTech];
};
