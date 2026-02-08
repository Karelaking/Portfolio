import type { HeroMetric } from "@/types/hero-metric.interface";

export interface HeroRowInput {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  availability: string;
  image_src: string;
  image_alt: string;
  metrics: HeroMetric[];
}
