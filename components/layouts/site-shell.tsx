import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SiteShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const SiteShell = ({
  children,
  header,
  footer,
  className,
}: SiteShellProps): ReactElement => {
  return (
    <div className={cn("bg-background text-foreground min-h-dvh", className)}>
      {header}
      <main className="mx-auto w-full max-w-5xl border-x px-4 pt-8 sm:pt-16 pb-12 sm:px-6 lg:px-8">
        {children}
      </main>
      {footer}
    </div>
  );
};
