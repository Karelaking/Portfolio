export interface NavigationLink {
	href: string;
	label: string;
}

export const navLinks: NavigationLink[] = [
	{ href: "/", label: "Home" },
	{ href: "/#about", label: "About" },
	{ href: "/#expertise", label: "Expertise" },
	{ href: "/#experience", label: "Experience" },
	{ href: "/#projects", label: "Projects" },
	// { href: "/social", label: "Social" },
	{ href: "/#writing", label: "Writing" },
	{ href: "/#gallery", label: "Gallery" },
	{ href: "/#contact", label: "Contact" },
];
