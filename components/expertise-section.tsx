import { cn } from "@/lib/utils";
import {
  IconBrandDocker,
  IconBrandNextjs,
  IconCloudComputing,
  IconApi,
  IconHtml,
} from "@tabler/icons-react";

interface Feature {
  title: string;
  description: string[];
  icon: React.ReactNode;
}

export function ExpertiseSection() {
  const features: Feature[] = [
    {
      title: "Frontend Development",
      description:
        ["Reactjs", "Nextjs", "Tailwindcss", "Typescript", "Framer motion"],
      icon: <IconHtml />,
    },
    {
      title: "Backend Development",
      description:[
        "Nodejs",
        "Nestjs",
        "Prisma",
        "Postgresql",
        "Redis",
        "Docker",
      ],
      icon: <IconCloudComputing />,
    },
    {
      title: "Fullstack Development",
      description: ["Reactjs", "Nextjs", "Tailwindcss", "Typescript"],
      icon: <IconBrandNextjs />,
    },
    {
      title: "DevOps",
      description: ["Docker", "Kubernetes", "AWS", "GCP", "Azure"],
      icon: <IconBrandDocker />,
    },
    {
      title: "API Development",
      description: ["REST", "GraphQL", "gRPC", "WebSockets"],
      icon: <IconApi />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto min-h-screen bg-gray-100" id="expertise">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: Feature & { index: number }) => {
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
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 text-2xl">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description.map((desc, index) => (
          <span key={index}>
            <div className="text-md inline text-center">
            {desc}
            </div>
            <div className="inline font-extrabold">
            {index < description.length - 1 && " | "}
            </div>
          </span>
        ))}
      </p>
    </div>
  );
};

