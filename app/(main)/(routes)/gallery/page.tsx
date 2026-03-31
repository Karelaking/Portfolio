import React from 'react'
import Link from 'next/link';
import { getGalleryImagesAction } from '@/actions';
import { IconArrowUpLeft } from '@tabler/icons-react';
import { GalleryImage } from '@/components/clientComponent';
import { Container, SectionOrnament, SectionHeader } from '@/components/serverComponent';

const gallery = await getGalleryImagesAction();

const page = ():React.ReactNode => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="gallery"
    >
      <SectionOrnament className="right-10" />
      <SectionHeader
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
  );
}

export default page;