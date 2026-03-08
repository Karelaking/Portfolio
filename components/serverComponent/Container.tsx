import React from "react";
import { cn } from "@/lib";
import Scales from "../ui/scales";

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
      <div className="relative mx-auto max-w-6xl border-x border-dashed px-4 py-4 sm:py-12">
        <Scales className="" />
        <div
          className={cn(
            "bg-background mx-auto flex h-full min-h-dvh w-full max-w-5xl flex-col justify-center px-4 sm:min-h-full sm:px-6 lg:px-8 shadow rounded-2xl",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
