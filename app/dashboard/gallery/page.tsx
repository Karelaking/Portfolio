import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/lib/portfolio/types";
import { GalleryDeleteButton } from "@/components/dashboard/gallery-delete-button";

interface GalleryFetchResult {
  images: GalleryImage[];
  error?: string;
}

const fetchGallery = async (): Promise<GalleryFetchResult> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return {
      images: [],
      error:
        "Supabase client not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the dev server.",
    };
  }

  const { data, error } = await client
    .from("gallery")
    .select("id,src,alt")
    .order("order_index", { ascending: true });

  if (error) {
    return {
      images: [],
      error: `Supabase error: ${error.message}`,
    };
  }

  return { images: (data as GalleryImage[]) ?? [] };
};

const GalleryPage = async (): Promise<ReactElement> => {
  const { images, error } = await fetchGallery();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Gallery</h1>
            <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {images.length} total
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage the gallery images shown on your portfolio.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
          href="/dashboard/gallery/new"
        >
          New image
        </Link>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-500/40 bg-card p-6 text-sm text-red-500">
          {error}
        </div>
      ) : null}

      {images.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/70 bg-card p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No gallery images yet. Add your first image to get started.
            </p>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
              href="/dashboard/gallery/new"
            >
              Add image
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <article
              className="rounded-3xl border border-border/70 bg-card p-4"
              key={image.id}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/70 bg-background">
                <Image
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  height={320}
                  src={image.src}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  width={480}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Alt text
                </p>
                <p className="text-sm text-foreground">{image.alt}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
                  href={`/dashboard/gallery/${image.id}/edit`}
                >
                  Edit
                </Link>
                <GalleryDeleteButton imageId={image.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
