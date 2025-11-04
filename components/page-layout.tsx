import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLElement | null>;
  sectionId?: string;
  className?: string;
  transparent?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  sectionRef,
  sectionId,
  className = "",
  transparent = false,
}) => {
  const bgClass = transparent ? "bg-transparent" : "bg-white dark:bg-gray-700";

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`relative min-h-screen py-18 px-6 md:px-16 lg:px-24 ${bgClass} overflow-hidden rounded-2xl my-4 ${className}`}
    >
      {children}
    </section>
  );
};

export default PageLayout;
