import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getGalleryImages } from "@/lib/portfolio/queries";
import { GalleryGrid } from "../clientComponent";

export const GalleryPage = async (): Promise<React.ReactElement> => {
	const gallery = await getGalleryImages();
	const featuredGallery = gallery.slice(0, 4);
	const hasMoreGallery = gallery.length > featuredGallery.length;

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900" id="gallery">
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<div>
						<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
							// 04 . GALLERY
						</span>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
							BEAUTIFUL MOTION, CREATIVELY CAPTURED.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
							A curated portfolio of dynamic moments captured through my lens with a sharp monochrome perspective.
						</p>
					</div>
				</header>

				{/* Bin-Packed 2-Column Grid Component */}
				<div className="flex-1">
					<GalleryGrid images={featuredGallery} />
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						SHOWCASING {featuredGallery.length} OF {gallery.length} MOMENTS
					</p>

					{hasMoreGallery ? (
						<Link
							className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
							href="/gallery"
						>
							<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
								<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
									Show More Gallery
								</span>
								<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
									Show More Gallery
								</span>
							</span>
							<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
								<span className="inline-flex transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5">
									<IconArrowUpRight size={16} />
								</span>
								<span className="absolute inline-flex -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
									<IconArrowUpRight size={16} />
								</span>
							</span>
						</Link>
					) : null}
				</div>
			</div>
		</section>
	);
};
