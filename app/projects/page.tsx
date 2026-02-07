import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteShell } from "@/components/layouts/site-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { SectionOrnament } from "@/components/visuals/section-ornament";
import { getProjects } from "@/lib/portfolio/queries";
import { ProjectsPageSkeleton } from "@/components/projects/projects-page-skeleton";

export const revalidate = 0;

const fetchProjects = cache(async (): Promise<Awaited<ReturnType<typeof getProjects>>> => {
  return getProjects();
});

const ProjectsContent = async (): Promise<ReactElement> => {
  const projects = await fetchProjects();

  return (
    <section className="relative flex flex-col gap-8 border-t border-border/70 pt-12">
        <SectionOrnament className="right-8" />
        <SectionHeader
          label="Projects"
          title="Every build in the monochrome archive."
          copy="Browse the full collection of product, interface, and system work."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              className="rounded-3xl border border-border/70 bg-card p-6"
              key={project.id}
            >
              <Image
                alt={project.imageAlt}
                src={project.imageSrc}
                width={520}
                height={360}
                className="h-40 w-full rounded-2xl border border-border bg-background object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <a
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground"
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
                    className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          href="/"
        >
          Back to home
          <IconArrowUpRight size={14} />
        </Link>
      </section>
  );
};

export const ProjectsPage = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense fallback={<ProjectsPageSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </SiteShell>
  );
};

export default ProjectsPage;
