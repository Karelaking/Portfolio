import React from "react";
import { Timeline as TimelineComponent } from "./ui/timeline";
import { format } from "date-fns";
import { Experience } from "@/types/experience.interface";
import { SectionContainer } from "./ui/section-container";
import { GlowingEffect } from "./ui/glowing-effect";

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}): React.JSX.Element {
  const data = experience.map((exp) => ({
    title: format(new Date(exp.start_date), "yyyy"), // Group by Year
    content: (
      <div className="border rounded-2xl p-5 md:p-6 dark:bg-neutral-900 relative shadow">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <h3 className="mb-2 md:text-xl font-bold text-neutral-800 dark:text-white uppercase">
          {exp.company}
        </h3>
        <p className="mb-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {exp.role} | {format(new Date(exp.start_date), "MMM yyyy")} -{" "}
          {exp.end_date
            ? format(new Date(exp.end_date), "MMM yyyy")
            : "Present"}
        </p>
        <div className="text-sm font-normal text-neutral-800 dark:text-neutral-200">
          {exp.description}
        </div>
      </div>
    ),
  }));

  return (
    <SectionContainer id="experience" className="">
      <TimelineComponent data={data} />
    </SectionContainer>
  );
}
