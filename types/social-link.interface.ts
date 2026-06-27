export interface SocialLink {
	href: string;
	id: string;
	label: string;
	platform:
		| "github"
		| "linkedin"
		| "instagram"
		| "email"
		| "x"
		| "dribbble"
		| "behance";
}
