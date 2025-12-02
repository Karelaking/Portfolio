import React from "react";

import { caveat } from "@/fonts/fonts";
import Title from "./title";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
}
const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div className="mb-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <Title>{title}</Title>
        <div className="w-12 h-px bg-indigo-600 animate-expand"></div>
      </div>
      <h2
        className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight ${caveat.className}`}
      >
        {children}
      </h2>
    </div>
  );
};

export default PageHeader;
