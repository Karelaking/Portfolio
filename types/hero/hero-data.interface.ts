import type { HeroMetric } from "@/types/hero/hero-metric.interface";

export interface HeroData {
	availability: string;
	description: string;
	imageAlt: string;
	imageSrc: string;
	location: string;
	metrics: HeroMetric[];
	subtitle: string;
	title: string;
}
