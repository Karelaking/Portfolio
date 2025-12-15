
import React from 'react'
import { GithubProfile } from '@/lib/github'

interface ContributionGraphProps {
  data: GithubProfile
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  const weeks = data.contributionsCollection.contributionCalendar.weeks.slice(-52)

  return (
    <div className="pt-6 border-t border-border max-w-full">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold">
          {data.contributionsCollection.contributionCalendar.totalContributions} contributions in the last year
        </h4>
      </div>
      <div className="border border-border rounded-lg p-4 bg-card/50 overflow-x-auto scrollbar-hide w-full">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dayIndex) => {
                let bgClass = "bg-muted" // level 0
                if (day.contributionCount > 0) bgClass = "bg-primary/20"
                if (day.contributionCount >= 3) bgClass = "bg-primary/40"
                if (day.contributionCount >= 6) bgClass = "bg-primary/60"
                if (day.contributionCount >= 10) bgClass = "bg-primary/80"

                return (
                  <div
                    key={dayIndex}
                    className={`w-2.5 h-2.5 rounded-sm ${bgClass}`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  ></div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
