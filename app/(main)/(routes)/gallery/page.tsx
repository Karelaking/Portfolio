import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getGalleryImagesAction } from "@/actions";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { GalleryImage } from "@/components/clientComponent";
import {
  Container,
  SectionOrnament,
  SectionHeader,
} from "@/components/serverComponent";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Creative Gallery | MK Katiyar",
  description:
    "Browse MK Katiyar's creative gallery featuring curated visual captures and portfolio imagery.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Creative Gallery | MK Katiyar",
    description:
      "A curated gallery of visual captures and creative portfolio moments.",
    url: "/gallery",
    type: "website",
  },
  twitter: {
    title: "Creative Gallery | MK Katiyar",
    description:
      "A curated gallery of visual captures and creative portfolio moments.",
  },
};

const gallery = await getGalleryImagesAction();

const page = (): React.ReactNode => {
  const galleryCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Creative Gallery",
    description:
      "A curated collection of portfolio visuals and creative captures.",
    url: toAbsoluteUrl("/gallery"),
  };

  const galleryListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gallery images",
    itemListElement: gallery.map((image, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ImageObject",
        name: image.alt,
        contentUrl: image.src,
      },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryCollectionJsonLd),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryListJsonLd) }}
        type="application/ld+json"
      />
      <Container
        className="border-border/70 relative flex flex-col gap-8 py-12"
        id="gallery"
      >
        <SectionOrnament className="right-10" />
        <SectionHeader
          as="h1"
          label="Gallery"
          title="Beautiful Motion, Creatively Captured."
          copy="A curated portfolio of dynamic moments captured through my camera with a creative perspective."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {gallery.map((image) => (
            <GalleryImage
              key={image.id}
              alt={image.alt}
              src={image.src}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
            href="/"
          >
            <IconArrowUpLeft size={14} />
            Back
          </Link>
        </div>
      </Container>
    </>
  );
};

export default page;
