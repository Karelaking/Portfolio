import { getGalleryImages } from "@/lib";

export const getGalleryImagesAction = async () => {
  const galleryImages = await getGalleryImages();
  return galleryImages;
}