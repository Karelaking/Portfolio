import React from "react";
import { Timeline as TimelineComponent } from "./ui/timeline";
import { format } from "date-fns";

interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  // Map DB experience to TimelineEntry
  const data = experience.map(exp => ({
    title: format(new Date(exp.start_date), "yyyy"), // Group by Year
    content: (
      <div>
        <h3 className="text-xl font-bold dark:text-white text-neutral-800 mb-2">{exp.company}</h3>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-4">
             {exp.role} | {format(new Date(exp.start_date), "MMM yyyy")} - {exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : "Present"}
        </p>
        <div className="text-sm font-normal text-neutral-800 dark:text-neutral-200">
           {exp.description}
        </div>
      </div>
    )
  }));

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-950" id="experience">
      <TimelineComponent data={data} />
    </div>
  );
}
