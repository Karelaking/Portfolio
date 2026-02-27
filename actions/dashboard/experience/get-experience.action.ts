import { getExperience } from "@/lib";

export const getExperienceAction = async () => {
  const experience = await getExperience();
  return experience;
}