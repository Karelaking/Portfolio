import type { ReactElement } from "react";
import { Suspense, cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteFooter, SiteHeader, SiteShell } from "@/components/layouts";
import { SectionHeader } from "@/components/sections";
import { SectionOrnament } from "@/components/visuals";
import { getProjects } from "@/lib/portfolio/queries";
import { ProjectsPageSkeleton } from "@/components/skeletons";

export const revalidate = 0;

const fetchProjects = cache(
  async (): Promise<Awaited<ReturnType<typeof getProjects>>> => {
    return getProjects();
  },
);

const ProjectsContent = async (): Promise<ReactElement> => {
  const projects = await fetchProjects();

  return (
    <section className="border-border/70 relative flex flex-col gap-8 border-t pt-12">
      <SectionOrnament className="right-8" />
      <SectionHeader
        label="Projects"
        title="Every build in the monochrome archive."
        copy="Browse the full collection of product, interface, and system work."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
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
      <Link
        className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        href="/"
      >
        Back to home
        <IconArrowUpRight size={14} />
      </Link>
    </section>
  );
};

const ProjectsPage = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense fallback={<ProjectsPageSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </SiteShell>
  );
};

export default ProjectsPage;
