import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { HeaderMenuPopover } from "@/components/clientComponent";
import { WritingPage } from "@/components/pages/WritingPage";
import { getWritingPosts } from "@/lib";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Technical & Creative Writing | MK Katiyar",
	description:
		"Read technical articles and creative Hindi/English writing by MK Katiyar, including shayari, poems, and short stories from the portfolio archive.",
	alternates: {
		canonical: "/writing",
	},
	openGraph: {
		title: "Technical & Creative Writing | MK Katiyar",
		description:
			"Read technical articles and creative Hindi/English writing by MK Katiyar, including shayari, poems, and short stories from the portfolio archive.",
		url: "/writing",
		type: "website",
	},
	twitter: {
		title: "Technical & Creative Writing | MK Katiyar",
		description:
			"Read technical articles and creative Hindi/English writing by MK Katiyar, including shayari, poems, and short stories from the portfolio archive.",
	},
};

const WritingRoutePage = async (): Promise<ReactElement> => {
	const posts = await getWritingPosts();

	const writingCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Writing by MK Katiyar",
		description:
			"A curated writing collection including shayari, poems, and short stories.",
		url: toAbsoluteUrl("/writing"),
	};

	const writingListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Writing archive",
		itemListElement: posts.map((post, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "CreativeWork",
				name: post.title,
			},
		})),
	};

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(writingCollectionJsonLd),
				}}
				type="application/ld+json"
			/>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(writingListJsonLd) }}
				type="application/ld+json"
			/>

			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Header Row (Single Unified Navbar) */}
				<header className="sticky top-0 z-40 flex flex-nowrap items-center justify-between gap-2 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-10 sm:py-4">
					<div className="flex items-center gap-2.5 min-w-0 sm:gap-6">
						<Link className="flex items-center gap-2 min-w-0 sm:gap-2.5" href="/">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white sm:h-8 sm:w-8">
								MK
							</span>
							<span className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase truncate sm:text-xl">
								mradul katiyar
							</span>
						</Link>
					</div>

					<div className="flex items-center gap-2 shrink-0 sm:gap-3">
						<HeaderMenuPopover />
					</div>
				</header>

				{/* Writing Section Component */}
				<WritingPage headingAs="h1" />
			</div>
		</section>
	);
};

export default WritingRoutePage;
