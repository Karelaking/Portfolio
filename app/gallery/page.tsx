import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteFooter, SiteHeader, SiteShell } from "@/components/layouts";
import { GalleryImage, SectionHeader } from "@/components/sections";
import { SectionOrnament } from "@/components/visuals";
import { getGalleryImages } from "@/lib/portfolio/queries";

export const revalidate = 0;

const fetchGallery = cache(
  async (): Promise<Awaited<ReturnType<typeof getGalleryImages>>> => {
    return getGalleryImages();
  },
);

const GalleryContent = async (): Promise<ReactElement> => {
  const images = await fetchGallery();

  return (
    <section className="border-border/70 relative flex min-h-dvh flex-col gap-8 border-t pt-12">
      <SectionOrnament className="right-8" />
      <SectionHeader
        label="Gallery"
        title="The full monochrome archive."
        copy="Every captured frame, from quiet studies to complete systems."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <GalleryImage
            key={image.id}
            alt={image.alt}
            src={image.src}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-56"
          />
        ))}
      </div>
      <Link
        className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </section>
  );
};

const GalleryPage = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense
        fallback={
          <div className="border-border/70 bg-card h-40 rounded-3xl border" />
        }
      >
        <GalleryContent />
      </Suspense>
    </SiteShell>
  );
};

export default GalleryPage;
