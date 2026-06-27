import { getTechnologies } from "@/lib";
import type { TechnologyItem } from "@/types/technology-item.interface";

export const getTechnologiesAction = async (): Promise<TechnologyItem[]> => {
	const technologies = await getTechnologies();
	return technologies;
};
