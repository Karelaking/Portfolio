import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Authentication",
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
};

const layout = ({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element => <div>{children}</div>;

export default layout;
