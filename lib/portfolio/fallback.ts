import type {
  BlogPost,
  ExpertiseItem,
  ExperienceItem,
  GalleryImage,
  HeroData,
  ProjectItem,
  SocialLink,
} from "@/lib/portfolio/types";

export const fallbackHero: HeroData = {
  title: "Minimal, monochrome portfolios",
  subtitle: "Design lead & frontend engineer",
  description:
    "I build black-and-white experiences that feel quiet, confident, and engineered for clarity.",
  location: "Based in Lagos, working worldwide",
  availability: "Open for freelance + collaborations",
  metrics: [
    { label: "Years building", value: "8+" },
    { label: "Product launches", value: "40" },
    { label: "Design systems", value: "12" },
  ],
  imageSrc: "/images/hero-portrait.svg",
  imageAlt: "Monochrome portrait illustration",
};

export const fallbackExpertise: ExpertiseItem[] = [
  {
    id: "strategy",
    title: "Product Strategy",
    description: "Turning bold ideas into measurable product outcomes.",
    icon: "strategy",
  },
  {
    id: "systems",
    title: "Design Systems",
    description: "Creating scalable UI foundations for growing teams.",
    icon: "system",
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Shipping precise interfaces with performance in mind.",
    icon: "frontend",
  },
  {
    id: "direction",
    title: "Creative Direction",
    description: "Guiding visual narratives from concept to delivery.",
    icon: "direction",
  },
];

export const fallbackExperience: ExperienceItem[] = [
  {
    id: "studio-north",
    role: "Lead Product Designer",
    company: "Studio North",
    period: "2021 — Present",
    summary: "Directing monochrome brand systems for emerging founders.",
    highlights: [
      "Built a modular design system across 5 product lines.",
      "Reduced design-to-dev handoff time by 40%.",
      "Partnered with engineering to deliver a zero-regression UI rollout.",
    ],
  },
  {
    id: "atlas",
    role: "Senior Frontend Engineer",
    company: "Atlas Labs",
    period: "2018 — 2021",
    summary: "Delivered high-velocity UI systems for SaaS platforms.",
    highlights: [
      "Built accessible component libraries in React and Tailwind.",
      "Optimized critical journeys to improve conversion by 18%.",
      "Led the migration to a unified visual language.",
    ],
  },
];

export const fallbackProjects: ProjectItem[] = [
  {
    id: "mono-grid",
    name: "Mono Grid",
    description: "A modular portfolio system for design-forward startups.",
    tags: ["Design System", "Next.js", "Tailwind"],
    imageSrc: "/images/project-01.svg",
    imageAlt: "Minimal grid project preview",
    href: "https://example.com/mono-grid",
  },
  {
    id: "signal-suite",
    name: "Signal Suite",
    description: "Analytics dashboards built for calm, focused decisions.",
    tags: ["Dashboard", "Data", "Product"],
    imageSrc: "/images/project-02.svg",
    imageAlt: "Monochrome dashboard preview",
    href: "https://example.com/signal-suite",
  },
];

export const fallbackSocial: SocialLink[] = [
  {
    id: "github",
    platform: "github",
    label: "GitHub",
    href: "https://github.com/",
  },
  {
    id: "linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/",
  },
  {
    id: "x",
    platform: "x",
    label: "X (Twitter)",
    href: "https://x.com/",
  },
  {
    id: "dribbble",
    platform: "dribbble",
    label: "Dribbble",
    href: "https://dribbble.com/",
  },
];

export const fallbackBlog: BlogPost[] = [
  {
    id: "quiet-systems",
    title: "Quiet systems, loud results",
    excerpt: "Why minimal UI systems outperform noisy product experiences.",
    date: "Jan 12, 2026",
    href: "https://example.com/blog/quiet-systems",
  },
  {
    id: "monochrome-brand",
    title: "Designing in grayscale",
    excerpt: "How monochrome palettes elevate clarity and focus.",
    date: "Dec 02, 2025",
    href: "https://example.com/blog/grayscale",
  },
  {
    id: "design-to-dev",
    title: "Design to dev, without drift",
    excerpt: "Tightening feedback loops for faster shipping.",
    date: "Nov 19, 2025",
    href: "https://example.com/blog/design-to-dev",
  },
];

export const fallbackGallery: GalleryImage[] = [
  { id: "gallery-01", src: "/images/gallery-01.svg", alt: "Gallery frame one" },
  { id: "gallery-02", src: "/images/gallery-02.svg", alt: "Gallery frame two" },
  { id: "gallery-03", src: "/images/gallery-03.svg", alt: "Gallery frame three" },
  { id: "gallery-04", src: "/images/gallery-04.svg", alt: "Gallery frame four" },
];
