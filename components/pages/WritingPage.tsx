import type { ReactElement } from "react";
import { writingPosts } from "@/data/WritingPosts";
import { WritingPostsGrid } from "../clientComponent/writing-posts-grid";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

export const WritingPage = (): ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="writing"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        label="Writing"
        title="Shayari, poems, and stories from my notebook."
        copy="A complete writing section with cover image, title, tags, and full expandable content for each post."
      />
      <WritingPostsGrid posts={writingPosts} />
    </Container>
  );
};
