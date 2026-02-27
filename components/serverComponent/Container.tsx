import React from "react";
import { cn } from "@/lib";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({
  children,
  className,
  id,
}: ContainerProps): React.ReactElement => {
  return (
    <section className="w-full border-t" id={id}>
      <div
        className={cn(
          "mx-auto h-full min-h-dvh sm:min-h-full w-full max-w-5xl border-x border-dashed px-4 sm:px-6 lg:px-8 flex flex-col justify-center",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
};
