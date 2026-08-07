import type { Metadata } from "next";
import type React from "react";
import { getWritingPosts } from "@/lib/portfolio/queries";
import { WritingPage } from "@/components/pages/WritingPage";
import { toAbsoluteUrl } from "@/lib/siteConfig";
import type { WritingPost } from "@/types";

export const metadata: Metadata = {
	title: "Technical Writing & Essays | MK Katiyar",
	description:
		"Read MK Katiyar's technical writing, engineering thoughts, system design essays, and software architecture articles.",
	alternates: {
		canonical: "/writing",
	},
	openGraph: {
		title: "Technical Writing & Essays | MK Katiyar",
		description:
			"Read MK Katiyar's technical writing, engineering thoughts, system design essays, and software architecture articles.",
		url: "/writing",
		type: "website",
	},
	twitter: {
		title: "Technical Writing & Essays | MK Katiyar",
		description:
			"Read MK Katiyar's technical writing, engineering thoughts, system design essays, and software architecture articles.",
	},
};

const WritingRoutePage = async (): Promise<React.ReactElement> => {
	const posts = await getWritingPosts();

	const writingCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Technical Writing by MK Katiyar",
		description:
			"Articles and essays covering software engineering and architecture.",
		url: toAbsoluteUrl("/writing"),
	};

	const writingListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Writing articles",
		itemListElement: posts.map((post: WritingPost, index: number) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "BlogPosting",
				headline: post.title,
				description: post.content ? post.content.slice(0, 160) : post.title,
				datePublished: post.publishedAt,
				url: toAbsoluteUrl(`/writing/${post.id}`),
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
		</>
	);
};

export default WritingRoutePage;
