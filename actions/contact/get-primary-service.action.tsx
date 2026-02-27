"use server";
import { getPrimaryServices } from "@/lib";

export const getPrimaryServicesAction = async () => {
  const primaryServices = await getPrimaryServices();
  return primaryServices;
};
