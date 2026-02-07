import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectItem } from "@/lib/portfolio/types";
import { ProjectDeleteButton } from "@/components/dashboard/project-delete-button";

interface ProjectFetchResult {
  projects: ProjectItem[];
  error?: string;
}

const fetchProjects = async (): Promise<ProjectFetchResult> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return {
      projects: [],
      error:
        "Supabase client not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the dev server.",
    };
  }

  const { data, error } = await client
    .from("projects")
    .select("id,name,description,tags,imageSrc:image_src,imageAlt:image_alt,href")
    .order("order_index", { ascending: true });

  if (error) {
    return {
      projects: [],
      error: `Supabase error: ${error.message}`,
    };
  }

  const projects = (data as unknown as ProjectItem[]) ?? [];
  return { projects };
};

const ProjectsPage = async (): Promise<ReactElement> => {
  const { projects, error } = await fetchProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Projects</h1>
            <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {projects.length} total
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects with quick edits, previews, and cleanup.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
          href="/dashboard/projects/new"
        >
          New project
        </Link>
      </div>

      <div className="space-y-4">
        {error ? (
          <div className="rounded-3xl border border-red-500/40 bg-card p-6 text-sm text-red-500">
            {error}
          </div>
        ) : null}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/70 bg-card p-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No projects yet. Add your first project to start building your portfolio.
              </p>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
                href="/dashboard/projects/new"
              >
                Create project
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <article
                className="group flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5"
                key={project.id}
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-border/70 bg-background sm:h-28 sm:w-44">
                    <Image
                      alt={project.imageAlt}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      height={224}
                      src={project.imageSrc}
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 176px, 100vw"
                      width={320}
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Project
                        </p>
                        <p className="text-lg font-semibold">{project.name}</p>
                      </div>
                      <a
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition hover:text-muted-foreground"
                        href={project.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Visit
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    {project.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
                    href={`/dashboard/projects/${project.id}/edit`}
                  >
                    Edit
                  </Link>
                  <ProjectDeleteButton projectId={project.id} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
