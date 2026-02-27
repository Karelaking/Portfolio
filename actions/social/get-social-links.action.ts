import { getSocialLinks } from "@/lib";

export const getSocialLinksAction = async () => {
  const socialLinks = await getSocialLinks();
  return socialLinks;
}