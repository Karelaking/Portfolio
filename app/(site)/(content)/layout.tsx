import type { ReactElement, ReactNode } from "react";
import { RootProvider } from "@/app/providers";

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({
  children,
}: ContentLayoutProps): ReactElement {
  return <RootProvider>{children}</RootProvider>;
}
