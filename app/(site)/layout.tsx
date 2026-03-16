import type { ReactElement, ReactNode } from "react";
import { RootProvider } from "@/components/providers";

interface SiteLayoutProps {
	children: ReactNode;
	hero: ReactNode;
	about: ReactNode;
	expertise: ReactNode;
	experience: ReactNode;
	projects: ReactNode;
	social: ReactNode;
	writing: ReactNode;
	gallery: ReactNode;
	contact: ReactNode;
}

export default function SiteLayout({
	children,
	hero,
	about,
	expertise,
	experience,
	projects,
	social,
	writing,
	gallery,
	contact,
}: SiteLayoutProps): ReactElement {
	return (
		<RootProvider>
			{hero}
			{about}
			{expertise}
			{experience}
			{projects}
			{social}
			{writing}
			{gallery}
			{contact}
			{children}
		</RootProvider>
	);
}
