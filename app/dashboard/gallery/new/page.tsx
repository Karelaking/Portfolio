import type { ReactElement } from "react";
import Link from "next/link";
import { createGalleryImage } from "@/app/dashboard/gallery/actions";
import { GalleryForm } from "@/components/dashboard/gallery-form";

const NewGalleryImagePage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New gallery image</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a new image to your gallery.
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
        <GalleryForm action={createGalleryImage} submitLabel="Create image" />
      </div>
    </div>
  );
};

export default NewGalleryImagePage;
