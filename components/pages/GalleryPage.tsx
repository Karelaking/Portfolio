import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import { Container, SectionHeader, SectionOrnament } from '../serverComponent';
import { getGalleryImagesAction } from '@/actions';
import { GalleryImage } from '../clientComponent';

const gallery = await getGalleryImagesAction();


const featuredGallery = gallery.slice(0, 4);
const hasMoreGallery = gallery.length > featuredGallery.length;

export const GalleryPage = ():React.ReactNode => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="gallery"
    >
      <SectionOrnament className="right-10" />
      <SectionHeader
        label="Gallery"
        title="Minimal frames, maximal focus."
        copy="Recent explorations in monochrome composition."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredGallery.map((image) => (
          <GalleryImage
            key={image.id}
            alt={image.alt}
            src={image.src}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
      {hasMoreGallery ? (
        <div className="flex justify-center">
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
            href="/gallery"
          >
            Show more
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      ) : null}
    </Container>
  );
}