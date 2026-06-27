import type React from "react";
import { RootProvider } from "../providers";

const layout = ({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode => <RootProvider>{children}</RootProvider>;

export default layout;
