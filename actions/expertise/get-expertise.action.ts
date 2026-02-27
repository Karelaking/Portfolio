import { getExpertise } from "@/lib";

export const getExpertiseAction = async () => {
  const expertise = await getExpertise();
  return expertise;
}