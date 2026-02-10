import type { ReactElement } from "react";
import Link from "next/link";
import { createProject } from "@/actions/dashboard/projects/create-project.action";
import { ProjectForm } from "@/components/dashboard";

const NewProjectPage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New project</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a new project to your portfolio.
          </p>
        </div>
        <Link
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          href="/dashboard/projects"
        >
          Back
        </Link>
      </div>
      <div className="rounded-3xl border border-border/70 bg-card p-6">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </div>
    </div>
  );
};

export default NewProjectPage;
