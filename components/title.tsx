
import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./ui/badge";

interface TitleProps {
  children: string;
  className?: string;
  variant?: keyof typeof badgeVariants;
}

const Title = ({children, className, variant}: TitleProps) => {
  return <Badge
    variant={variant || "outline"}
    className={cn("text-sm font-semibold text-indigo-600 tracking-wider uppercase border-indigo-200 bg-transparent", className)}
  >
    {children}
  </Badge>;
};

export default Title;
