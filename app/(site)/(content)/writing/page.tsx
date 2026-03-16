import type { ReactElement } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { writingPosts } from "@/data/WritingPosts";
import { WritingPostsGrid } from "@/components/clientComponent/writing-posts-grid";
import {
  Container,
  SectionHeader,
  SectionOrnament,
} from "@/components/serverComponent";

export const revalidate = 0;

const WritingPage = (): ReactElement => {
  return (
    <Container className="border-border/70 relative flex flex-col gap-8 border-t py-12">
      <SectionOrnament className="right-6" />
      <SectionHeader
        label="Writing"
        title="The full collection of shayari, poems, and stories."
        copy="Explore every writing post with cover image, tags, and complete expandable content."
      />
      <WritingPostsGrid posts={writingPosts} />
      <Link
        className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </Container>
  );
};

export default WritingPage;
