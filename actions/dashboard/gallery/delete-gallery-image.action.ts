"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";

interface GalleryImageRecord {
  id: string;
  src: string;
  alt: string;
  image_file_id?: string;
}

const isImageKitAssetUrl = (src: string): boolean => {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim();
  if (urlEndpoint && src.startsWith(urlEndpoint)) {
    return true;
  }

  return src.includes("ik.imagekit.io/");
};

const deleteImageFromImageKit = async (fileId: string): Promise<ActionResult> => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim() ?? "";

  if (!privateKey) {
    return {
      ok: false,
      error: "IMAGEKIT_PRIVATE_KEY is missing. Cannot delete ImageKit file.",
    };
  }

  const authToken = Buffer.from(`${privateKey}:`).toString("base64");
  const response = await fetch(
    `https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.ok || response.status === 404) {
    return { ok: true };
  }

  const body = (await response.json().catch((): null => null)) as
    | { message?: string }
    | null;

  return {
    ok: false,
    error:
      body?.message ??
      `Failed to delete ImageKit file. Status: ${response.status}.`,
  };
};

const deleteGalleryImage = async (id: string): Promise<ActionResult> => {
  try {
    await connectMongo();
    const db = mongoose.connection.db;

    if (!db) {
      return { ok: false, error: "MongoDB is not connected." };
    }

    const image = (await db.collection("gallery").findOne(
      { id },
      {
        projection: {
          _id: 0,
          id: 1,
          src: 1,
          alt: 1,
          image_file_id: 1,
        },
      },
    )) as GalleryImageRecord | null;

    if (!image) {
      return { ok: false, error: "Gallery image not found." };
    }

    if (isImageKitAssetUrl(image.src)) {
      const imageFileId = image.image_file_id?.trim();
      if (!imageFileId) {
        return {
          ok: false,
          error:
            "ImageKit file id is missing for this image. Cannot safely delete remote asset before DB deletion.",
        };
      }

      const imagekitDeleteResult = await deleteImageFromImageKit(imageFileId);
      if (!imagekitDeleteResult.ok) {
        return imagekitDeleteResult;
      }
    }

    await db.collection("gallery").deleteOne({ id });
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to delete image.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
  return { ok: true };
};

export const deleteGalleryImageAction = async (
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { ok: false, error: "Missing image id." };
  }

  return deleteGalleryImage(id);
};
