import type { ReactElement } from "react";

export interface SectionHeaderProps {
  label: string;
  title: string;
  copy?: string;
}

export const SectionHeader = ({
  label,
  title,
  copy,
}: SectionHeaderProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </p>
      <h2 className="text-3xl font-extrabold text-neutral-600 dark:text-neutral-200 font-instrument-sans sm:text-6xl tracking-wider sm:tracking-wide leading-8 sm:leading-14">{title}</h2>
      {copy ? (
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 font-sans">{copy}</p>
      ) : null}
    </div>
  );
};
