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
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {copy ? (
        <p className="max-w-2xl text-sm text-muted-foreground">{copy}</p>
      ) : null}
    </div>
  );
};
