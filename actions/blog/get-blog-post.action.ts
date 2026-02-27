import { getBlogPosts } from "@/lib";


export const getBlogPostsAction = async () => {
  const posts = await getBlogPosts();
  return posts;
}