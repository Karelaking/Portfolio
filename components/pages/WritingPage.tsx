import type { ReactElement } from "react";
import { getWritingPosts } from "@/lib";
import { WritingPostsGrid } from "../clientComponent/writing-posts-grid";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

interface WritingPageProps {
	headingAs?: "h1" | "h2";
}

export const WritingPage = async ({
	headingAs = "h2",
}: WritingPageProps = {}): Promise<ReactElement> => {
	const posts = await getWritingPosts();

	return (
		<Container
			className="relative flex flex-col gap-8 border-border/70 py-12"
			id="writing"
		>
			<SectionOrnament className="right-6" />
			<SectionHeader
				as={headingAs}
				copy="A complete writing section with cover image, title, tags, and full expandable content for each post."
				label="Writing"
				title="Shayari, poems, and stories from my notebook."
			/>
			<WritingPostsGrid posts={posts} />
		</Container>
	);
};
