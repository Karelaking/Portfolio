import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/server";
import type { GalleryImage } from "@/types/gallery-image.interface";
import { updateGalleryImage } from "@/actions/dashboard/gallery/update-gallery-image.action";
import { GalleryForm } from "@/components/clientComponent";

interface EditGalleryImagePageProps {
  params: Promise<{ id: string }>;
}

const fetchGalleryImage = async (id: string): Promise<GalleryImage | null> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return null;
  }

  const { data } = await client
    .from("gallery")
    .select("id,src,alt")
    .eq("id", id)
    .single();
  return (data as GalleryImage) ?? null;
};

const EditGalleryImagePage = async ({
  params,
}: EditGalleryImagePageProps): Promise<ReactElement> => {
  const { id } = await params;
  const image = await fetchGalleryImage(id);

  if (!image) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit gallery image</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your gallery image details.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/gallery"
        >
          Back
        </Link>
      </div>
      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <GalleryForm
          action={updateGalleryImage.bind(null, image.id)}
          defaultValues={{ src: image.src, alt: image.alt }}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
};

export default EditGalleryImagePage;
