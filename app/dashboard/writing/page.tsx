import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWritingPosts } from "@/lib";
import type { WritingPost } from "@/types/writing-post.interface";
import { WritingDeleteButton } from "@/components/clientComponent";

interface WritingFetchResult {
  posts: WritingPost[];
}

const stripHtml = (value: string): string => {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const buildPreview = (content: string): string => {
  const text = stripHtml(content);
  if (text.length <= 140) {
    return text;
  }

  return `${text.slice(0, 140)}...`;
};

const fetchWriting = async (): Promise<WritingFetchResult> => {
  const posts = await getWritingPosts();
  return { posts };
};

const WritingDashboardPage = async (): Promise<ReactElement> => {
  const { posts } = await fetchWriting();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Writing</h1>
            <span className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] uppercase">
              {posts.length} total
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage your shayari, poems, and stories with a rich text editor.
          </p>
        </div>
        <Link
          className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
          href="/dashboard/writing/new"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border-border/70 bg-card rounded-3xl border border-dashed p-6">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              No writing posts yet. Add your first post to get started.
            </p>
            <Link
              className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
              href="/dashboard/writing/new"
            >
              Create post
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              className="border-border/70 bg-card rounded-3xl border p-4"
              key={post.id}
            >
              <div className="border-border/70 bg-background relative h-44 w-full overflow-hidden rounded-2xl border">
                <Image
                  alt={post.coverImageAlt}
                  className="h-full w-full object-cover"
                  height={320}
                  src={post.coverImageSrc}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  width={480}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold">{post.title}</p>
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  {post.publishedAt}
                </p>
                <p className="text-muted-foreground text-sm">
                  {buildPreview(post.content)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      className="border-border/70 rounded-full border px-3 py-1 text-[10px] tracking-[0.22em] uppercase"
                      key={`${post.id}-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
                  href={`/dashboard/writing/${post.id}/edit`}
                >
                  Edit
                </Link>
                <WritingDeleteButton postId={post.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingDashboardPage;
