import type { HeroData } from "@/types/hero/hero-data.interface";

export interface HeroRow extends Omit<HeroData, "imageSrc" | "imageAlt"> {
  id?: string;
  image_src: string;
  image_alt: string;
}
