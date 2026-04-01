import type { ReactElement } from "react";
import { getWritingPosts } from "@/lib";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";
import { WritingPostsGrid } from "../clientComponent/writing-posts-grid";

interface WritingPageProps {
  headingAs?: "h1" | "h2";
}

export const WritingPage = async ({
  headingAs = "h2",
}: WritingPageProps = {}): Promise<ReactElement> => {
  const posts = await getWritingPosts();

  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="writing"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        as={headingAs}
        label="Writing"
        title="Shayari, poems, and stories from my notebook."
        copy="A complete writing section with cover image, title, tags, and full expandable content for each post."
      />
      <WritingPostsGrid posts={posts} />
    </Container>
  );
};
