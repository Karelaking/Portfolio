import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTechnologies, getProjects } from "@/lib/portfolio/queries";
import type { TechnologyItem } from "@/types/technology-item.interface";
import { updateTechnology } from "@/actions/dashboard/technologies/update-technology.action";
import { TechnologyForm } from "@/components/clientComponent";

interface EditTechnologyPageProps {
  params: Promise<{ id: string }>;
}

const fetchTechnology = async (id: string): Promise<TechnologyItem | null> => {
  const technologies = await getTechnologies();
  return technologies.find((item) => item.id === id) ?? null;
};

const EditTechnologyPage = async ({
  params,
}: EditTechnologyPageProps): Promise<ReactElement> => {
  const { id } = await params;
  const [technology, projects] = await Promise.all([
    fetchTechnology(id),
    getProjects(),
  ]);

  if (!technology) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit technology</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update technology information and project links.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/technologies"
        >
          Back
        </Link>
      </div>

      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <TechnologyForm
          action={updateTechnology.bind(null, technology.id)}
          defaultValues={{
            name: technology.name,
            description: technology.description,
            websiteUrl: technology.websiteUrl,
            logoKey: technology.logoKey,
            projectIds: technology.relatedProjects.map((project) => project.id),
          }}
          projects={projects}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
};

export default EditTechnologyPage;
