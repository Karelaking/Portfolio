import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpertise } from "@/lib/portfolio/queries";
import type { ExpertiseItem } from "@/types/expertise-item.interface";
import { updateExpertise } from "@/actions/dashboard/expertise/update-expertise.action";
import { ExpertiseForm } from "@/components/clientComponent";

interface EditExpertisePageProps {
  params: Promise<{ id: string }>;
}

const fetchExpertise = async (id: string): Promise<ExpertiseItem | null> => {
  const items = await getExpertise();
  return items.find((item) => item.id === id) ?? null;
};

const EditExpertisePage = async ({
  params,
}: EditExpertisePageProps): Promise<ReactElement> => {
  const { id } = await params;
  const expertise = await fetchExpertise(id);

  if (!expertise) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit expertise</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your expertise details.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/expertise"
        >
          Back
        </Link>
      </div>
      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <ExpertiseForm
          action={updateExpertise.bind(null, expertise.id)}
          defaultValues={{
            title: expertise.title,
            description: expertise.description,
            icon: expertise.icon,
          }}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
};

export default EditExpertisePage;
