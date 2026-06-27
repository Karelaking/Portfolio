import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { WritingPage } from "@/components/pages/WritingPage";
import { getWritingPosts } from "@/lib";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Writing by MK Katiyar",
	description:
		"Read Hindi and English writing by MK Katiyar, including shayari, poems, and short stories from the portfolio archive.",
	alternates: {
		canonical: "/writing",
	},
	openGraph: {
		title: "Writing by MK Katiyar",
		description:
			"A curated archive of Hindi and English shayari, poems, and short stories.",
		url: "/writing",
		type: "website",
	},
	twitter: {
		title: "Writing by MK Katiyar",
		description:
			"A curated archive of Hindi and English shayari, poems, and short stories.",
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
		<>
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
			<WritingPage headingAs="h1" />
			<div className="flex justify-center pb-8">
				<Link
					className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/"
				>
					<IconArrowUpLeft size={14} />
					Back
				</Link>
			</div>
		</>
	);
};

export default WritingRoutePage;
