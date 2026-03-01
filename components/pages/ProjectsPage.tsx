import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { getProjectsAction } from '@/actions/dashboard';
import { Container, SectionHeader, SectionOrnament } from '../serverComponent';

const projects = await getProjectsAction();
const featuredProjects = projects.slice(0, 4);

export const ProjectsPage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="projects"
    >
      <SectionOrnament className="right-8" />
      <SectionHeader
        label="Projects"
        title="Love to work with different tech"
        copy="A snapshot of recent work across product and interface design."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <article
            className="border-border/70 bg-card rounded-3xl border p-6"
            key={project.id}
          >
            <Image
              alt={project.imageAlt}
              src={project.imageSrc}
              width={520}
              height={360}
              className="border-border bg-background h-40 w-full rounded-2xl border object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {project.description}
                </p>
              </div>
              <a
                className="text-foreground flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                View
                <IconArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="border-border/70 rounded-full border px-3 py-1 text-[11px] tracking-[0.25em] uppercase"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {projects.length > featuredProjects.length ? (
        <div className="flex justify-center">
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
            href="/projects"
          >
            Show more
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      ) : null}
    </Container>
  );
}