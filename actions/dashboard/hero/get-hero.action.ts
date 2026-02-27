import { getHero } from "@/lib";

export const getHeroAction = async () => {
  const hero = await getHero();
  return hero;
}