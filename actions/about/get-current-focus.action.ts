import { getCurrentFocus } from "@/lib";

export const getCurrentFocusAction = async () => {
  const currentFocus = await getCurrentFocus();
  return currentFocus;
}