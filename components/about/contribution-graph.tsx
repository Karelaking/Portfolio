import React from "react";
import { GithubProfile } from "@/lib/github";

interface ContributionGraphProps {
  data: GithubProfile;
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  const weeks =
    data.contributionsCollection.contributionCalendar.weeks.slice(-52);

  return (
    <div className="border-border max-w-full border-t p-2">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold px-4 py-2">
          {data.contributionsCollection.contributionCalendar.totalContributions}{" "}
          contributions in the last year
        </h4>
      </div>
      <div className="border-border bg-card/50 scrollbar-hide w-full overflow-x-auto rounded-lg border p-4">
        <div className="flex min-w-max gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dayIndex) => {
                let bgClass = "bg-muted"; // level 0
                if (day.contributionCount > 0) bgClass = "bg-primary/20 animate-pulse";
                if (day.contributionCount >= 3) bgClass = "bg-primary/40 animate-pulse";
                if (day.contributionCount >= 6) bgClass = "bg-primary/60 animate-pulse";
                if (day.contributionCount >= 10) bgClass = "bg-primary/80 animate-pulse";

                return (
                  <div
                    key={dayIndex}
                    className={`h-2.5 w-2.5 rounded-sm ${bgClass}`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
