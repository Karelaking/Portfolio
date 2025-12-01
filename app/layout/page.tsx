import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  sectionId?: string;
  sectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  transparent?: boolean;
  children: React.ReactNode;
}

const pageLayoutVariants = cva("w-full relative min-h-screen py-18 px-6 md:px-16 lg:px-24 overflow-hidden rounded-2xl my-4", {
  variants: {
    transparent: {
      true: "bg-transparent",
    },
    soid: {
      false: "bg-white dark:bg-gray-700",
    },
  },
  defaultVariants: {
    transparent: false,
  },
});

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  sectionId,
  className, 
  sectionRef,
  transparent,
}): React.JSX.Element & VariantProps<typeof pageLayoutVariants> => { 
  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={cn(pageLayoutVariants({ transparent, className }))}
    >
      {children}
    </section>
  );
};

export default PageLayout;
