import { ProjectSection } from "@/components/projects-section";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function ProjectsPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || !url.startsWith("https://")) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 text-center">
        <h1 className="text-2xl font-bold font-mea-culpa">
          Supabase Not Configured
        </h1>
        <p className="text-red-500 mt-2 font-jetbrains-mono text-sm">
          Invalid or missing credentials.
        </p>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-green-500/5 blur-[100px]" />
        <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-500/5 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative pt-16">
        <ProjectSection projects={projects || []} />
      </div>
    </div>
  );
}
