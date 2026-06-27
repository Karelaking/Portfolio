import type { HeroMetric } from "@/types/hero/hero-metric.interface";

export interface HeroRowInput {
	availability: string;
	description: string;
	id: string;
	image_alt: string;
	image_src: string;
	location: string;
	metrics: HeroMetric[];
	subtitle: string;
	title: string;
}
