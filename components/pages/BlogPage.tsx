import React from 'react'
import { Container, SectionHeader, SectionOrnament } from '../serverComponent';
import { getBlogPostsAction } from '@/actions';
import { BlogGrid } from '../clientComponent';


const blogPosts = await getBlogPostsAction();

export const BlogPage = ():React.ReactNode => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="blog"
    >
      <SectionOrnament />
      <SectionHeader
        label="Blog"
        title="Writing about quiet product systems."
        copy="Thoughts on minimalism, systems, and the craft of building."
      />  
      <BlogGrid posts={blogPosts} />
    </Container>
  );
}