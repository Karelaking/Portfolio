import {
  Container,
  SectionHeader,
  SectionOrnament,
} from "@/components/serverComponent";
import { Suspense, cache } from "react";
import type { ReactElement } from "react";
import { getGalleryImages } from "@/lib/portfolio/queries";
import { GalleryImage } from "@/components/clientComponent";

const fetchGallery = cache(
  async (): Promise<Awaited<ReturnType<typeof getGalleryImages>>> => {
    return getGalleryImages();
  },
);

const GalleryContent = async (): Promise<ReactElement> => {
  const images = await fetchGallery();

  return (
    <Container className="border-border/70 relative flex min-h-dvh flex-col gap-8 border-t px-4 py-8 sm:px-8 sm:py-12">
      <SectionOrnament className="right-8" />
      <SectionHeader
        label="Gallery"
        title="Beautiful Motion, Creatively Captured"
        copy="A curated portfolio of dynamic moments captured through my camera with a creative perspective."
      />
      <div className="grid gap-4 sm:mt-12 sm:grid-cols-2">
        {images.map((image, index) => (
          <GalleryImage
            key={image.id}
            alt={image.alt}
            src={image.src}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-56"
            priority={index < 4}
            loading={index < 4 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </Container>
  );
};

const GalleryPage = (): ReactElement => {
  return (
    <>
      <Suspense
        fallback={
          <Container className="border-border/70 relative flex min-h-dvh flex-col gap-8 border-t px-4 pt-12 sm:px-8">
            <SectionOrnament className="right-8" />
            <div className="space-y-4">
              <div className="bg-muted/60 h-8 w-32 animate-pulse rounded" />
              <div className="bg-muted/60 h-12 w-3/4 animate-pulse rounded" />
              <div className="bg-muted/60 h-6 w-full max-w-2xl animate-pulse rounded" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border-border/70 bg-muted/60 h-56 animate-pulse rounded-2xl border"
                />
              ))}
            </div>
          </Container>
        }
      >
        <GalleryContent />
      </Suspense>
    </>
  );
};

export default GalleryPage;
