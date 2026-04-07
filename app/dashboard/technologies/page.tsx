import type { ReactElement } from "react";
import Link from "next/link";
import { getTechnologies } from "@/lib/portfolio/queries";
import { TechnologyDeleteButton } from "@/components/clientComponent";

const TechnologiesPage = async (): Promise<ReactElement> => {
  const technologies = await getTechnologies();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Technologies</h1>
            <span className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] uppercase">
              {technologies.length} total
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Store technology details and connect each technology to related
            projects.
          </p>
        </div>
        <Link
          className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
          href="/dashboard/technologies/new"
        >
          New technology
        </Link>
      </div>

      {technologies.length === 0 ? (
        <div className="border-border/70 bg-card rounded-3xl border border-dashed p-6">
          <p className="text-muted-foreground text-sm">
            No technologies yet. Add your first technology entry.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {technologies.map((technology) => (
            <article
              className="border-border/70 bg-card rounded-3xl border p-6"
              key={technology.id}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold">{technology.name}</p>
                  <span className="text-muted-foreground border-border/70 rounded-full border px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase">
                    {technology.logoKey}
                  </span>
                </div>
                <a
                  className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase"
                  href={technology.websiteUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {technology.websiteUrl}
                </a>
                <p className="text-muted-foreground text-sm">
                  {technology.description}
                </p>
              </div>

              <div className="border-border/70 mt-4 border-t pt-4">
                <p className="text-foreground text-xs tracking-[0.2em] uppercase">
                  Connected Projects
                </p>
                {technology.relatedProjects.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {technology.relatedProjects.map((project) => (
                      <li
                        className="text-muted-foreground text-sm"
                        key={project.id}
                      >
                        {project.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground mt-2 text-sm">
                    No connected projects yet.
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  className="border-border text-foreground hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
                  href={`/dashboard/technologies/${technology.id}/edit`}
                >
                  Edit
                </Link>
                <TechnologyDeleteButton technologyId={technology.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnologiesPage;
