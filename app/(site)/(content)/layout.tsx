import type { ReactElement, ReactNode } from "react";
import { RootProvider } from "@/components/providers";

interface ContentLayoutProps {
	children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps): ReactElement {
	return <RootProvider>{children}</RootProvider>;
}
