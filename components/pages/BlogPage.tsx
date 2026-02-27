import React from 'react'
import { BlogGrid, SectionHeader } from '../sections';
import { SectionOrnament } from '../visuals';
import { Container } from '../serverComponent';
import { getBlogPostsAction } from '@/actions';


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