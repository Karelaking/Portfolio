import type { HeroMetric } from "@/types/hero-metric.interface";

export interface ParsedHeroInput {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  availability: string;
  imageSrc: string;
  imageAlt: string;
  metrics: HeroMetric[];
}
