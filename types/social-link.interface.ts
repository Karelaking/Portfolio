export interface SocialLink {
  id: string;
  platform:
    | "github"
    | "linkedin"
    | "instagram"
    | "email"
    | "x"
    | "dribbble"
    | "behance";
  label: string;
  href: string;
}
