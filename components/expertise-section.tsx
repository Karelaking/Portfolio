import { cn } from "@/lib/utils";
import {
  IconApi,
  IconBrandDocker,
  IconBrandNextjs,
  IconCloudComputing,
  IconCode,
  IconHtml,
} from "@tabler/icons-react";
import { SectionContainer } from "./ui/section-container";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface FeatureItem {
  title: string;
  description: string[];
  icon: React.ReactNode;
}

export function ExpertiseSection({ skills }: { skills: Skill[] }) {
  // Group skills by category
  const categories = skills.reduce((acc: Record<string, string[]>, skill: Skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(skill.name);
    return acc;
  }, {});

  const features: FeatureItem[] = Object.keys(categories).map(cat => ({
    title: cat,
    description: categories[cat],
    icon: getIconForCategory(cat)
  }));


  return (
    <SectionContainer>
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto min-h-screen" id="expertise">
        {features.map((feature, index) => (
          <FeatureComponent key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}

function getIconForCategory(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('front')) return <IconHtml />;
  if (cat.includes('back')) return <IconCloudComputing />;
  if (cat.includes('devops')) return <IconBrandDocker />;
  if (cat.includes('api')) return <IconApi />;
  if (cat.includes('full')) return <IconBrandNextjs />;
  return <IconCode />;
}

const FeatureComponent = ({
  title,
  description,
  icon,
  index,
}: FeatureItem & { index: number }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r justify-center py-10 relative group/feature dark:border-neutral-800 ",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 group-hover/feature:text-indigo-500 group-hover/feature:scale-110 transition duration-200 dark:text-neutral-300">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 text-2xl">
          {title}
        </span>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description.map((desc: string, index: number) => (
          <span key={index}>
            <div className="text-md inline text-center">
              {desc}
            </div>
            <div className="inline font-extrabold">
              {index < description.length - 1 && " | "}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};
