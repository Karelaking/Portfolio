import { caveat } from "@/fonts/fonts";
import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

function Heading({ children, className, ...props }: HeadingProps): React.JSX.Element {
  return <h3
    className={cn(`text-4xl text-start font-extrabold text-gray-900 mb-8 border-l-3 border-indigo-600 pl-4 uppercase ${caveat.className}`, className)}
    {...props}
  >
    {children}
  </h3>;
}

export default Heading;
