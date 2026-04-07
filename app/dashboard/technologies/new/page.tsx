import type { ReactElement } from "react";
import Link from "next/link";
import { createTechnology } from "@/actions/dashboard/technologies/create-technology.action";
import { getProjects } from "@/lib/portfolio/queries";
import { TechnologyForm } from "@/components/clientComponent";

const NewTechnologyPage = async (): Promise<ReactElement> => {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New technology</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Add technology details and connect relevant projects.
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
          action={createTechnology}
          projects={projects}
          submitLabel="Create technology"
        />
      </div>
    </div>
  );
};

export default NewTechnologyPage;
