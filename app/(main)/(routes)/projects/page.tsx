import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IconArrowUpLeft, IconArrowUpRight } from "@tabler/icons-react";
import { getProjectsAction } from "@/actions/dashboard";
import {
  Container,
  SectionHeader,
  SectionOrnament,
} from "@/components/serverComponent";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Projects by MK Katiyar",
  description:
    "Explore full-stack projects by MK Katiyar with problem statements, stack highlights, and live demos.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects by MK Katiyar",
    description:
      "Browse shipped full-stack projects with technology context and live links.",
    url: "/projects",
    type: "website",
  },
  twitter: {
    title: "Projects by MK Katiyar",
    description:
      "Browse shipped full-stack projects with technology context and live links.",
  },
};

const projects = await getProjectsAction();

const ProjectsRoutePage = (): React.ReactElement => {
  const projectsCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by MK Katiyar",
    description:
      "A curated collection of full-stack projects with demos and technology tags.",
    url: toAbsoluteUrl("/projects"),
  };

  const projectsListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Project archive",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.href,
      },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsCollectionJsonLd),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListJsonLd) }}
        type="application/ld+json"
      />
      <Container
        className="border-border/70 relative flex flex-col gap-8 py-12"
        id="projects"
      >
        <SectionOrnament className="right-8" />
        <SectionHeader
          as="h1"
          label="Projects"
          title="Complete project archive"
          copy="A broader look at shipped work across frontend, backend, and product engineering."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              className="border-border/70 bg-card rounded-3xl border p-6"
              key={project.id}
            >
              <Image
                alt={
                  project.imageAlt?.trim() || `${project.name} project preview`
                }
                src={project.imageSrc}
                width={520}
                height={360}
                className="border-border bg-background h-40 w-full rounded-2xl border object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{project.name}</h2>
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
        <div className="flex justify-center">
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
            href="/"
          >
            <IconArrowUpLeft size={14} />
            Back
          </Link>
        </div>
      </Container>
    </>
  );
};

export default ProjectsRoutePage;
