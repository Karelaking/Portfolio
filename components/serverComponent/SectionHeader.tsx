import type { ReactElement } from "react";

export interface SectionHeaderProps {
  label: string;
  title: string;
  copy?: string;
  as?: "h1" | "h2";
}

export const SectionHeader = ({
  label,
  title,
  copy,
  as = "h2",
}: SectionHeaderProps): ReactElement => {
  const HeadingTag = as;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
        {label}
      </p>
      <HeadingTag className="font-instrument-sans text-3xl leading-8 font-extrabold tracking-wider text-neutral-600 sm:text-6xl sm:leading-14 sm:tracking-wide dark:text-neutral-200">
        {title}
      </HeadingTag>
      {copy ? (
        <p className="max-w-2xl font-sans text-sm text-neutral-400 sm:text-base">
          {copy}
        </p>
      ) : null}
    </div>
  );
};
