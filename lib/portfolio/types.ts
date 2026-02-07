export interface HeroMetric {
  label: string;
  value: string;
}

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

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: "strategy" | "system" | "frontend" | "direction";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: "github" | "linkedin" | "x" | "dribbble" | "behance";
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export interface ActionResult {
  ok: boolean;
  error?: string;
}
