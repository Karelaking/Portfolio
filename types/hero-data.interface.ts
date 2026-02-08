import type { HeroMetric } from "@/types/hero-metric.interface";

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  availability: string;
  metrics: HeroMetric[];
  imageSrc: string;
  imageAlt: string;
}
