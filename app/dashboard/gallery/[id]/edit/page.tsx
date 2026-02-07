import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/lib/portfolio/types";
import { updateGalleryImage } from "@/app/dashboard/gallery/actions";
import { GalleryForm } from "@/components/dashboard/gallery-form";

interface EditGalleryImagePageProps {
  params: Promise<{ id: string }>;
}

const fetchGalleryImage = async (id: string): Promise<GalleryImage | null> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return null;
  }

  const { data } = await client.from("gallery").select("id,src,alt").eq("id", id).single();
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
          <p className="mt-2 text-sm text-muted-foreground">
            Update your gallery image details.
          </p>
        </div>
        <Link
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          href="/dashboard/gallery"
        >
          Back
        </Link>
      </div>
      <div className="rounded-3xl border border-border/70 bg-card p-6">
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
