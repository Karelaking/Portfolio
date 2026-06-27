import Link from "next/link";
import type { ReactElement } from "react";
import { createGalleryImage } from "@/actions/dashboard/gallery/create-gallery-image.action";
import { GalleryForm } from "@/components/clientComponent";

const NewGalleryImagePage = (): ReactElement => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-3xl">New gallery image</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Add a new image to your gallery.
				</p>
			</div>
			<Link
				className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
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

export default NewGalleryImagePage;
