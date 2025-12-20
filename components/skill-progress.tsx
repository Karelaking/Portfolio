import React from 'react';
import { cn } from '@/lib/utils';

interface SkillProgressProps {
  name: string;
  proficiency: number; // 1-5 scale
  yearsOfExperience?: number;
  className?: string;
  showLabel?: boolean;
}

export default function SkillProgress({
  name,
  proficiency,
  yearsOfExperience,
  className,
  showLabel = true
}: SkillProgressProps) {
  const getProficiencyColor = (level: number) => {
    if (level >= 5) return "bg-green-500";
    if (level >= 4) return "bg-blue-500";
    if (level >= 3) return "bg-yellow-500";
    if (level >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  const getProficiencyLabel = (level: number) => {
    if (level >= 5) return "Expert";
    if (level >= 4) return "Advanced";
    if (level >= 3) return "Intermediate";
    if (level >= 2) return "Beginner";
    return "Novice";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <div className="flex items-center gap-2">
          {showLabel && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {getProficiencyLabel(proficiency)}
            </span>
          )}
          {yearsOfExperience && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {yearsOfExperience} yrs
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-1000 ease-out",
            getProficiencyColor(proficiency)
          )}
          style={{ width: `${(proficiency / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}