"use client";

import { ImageKitProvider as IKProvider } from "@imagekit/next";
import type { ReactElement, ReactNode } from "react";

interface ImageKitProviderComponentProps {
	readonly children: ReactNode;
}

export const ImageKitProvider = ({
	children,
}: ImageKitProviderComponentProps): ReactElement => {
	const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

	if (!urlEndpoint) {
		return <>{children}</>;
	}

	return <IKProvider urlEndpoint={urlEndpoint}>{children}</IKProvider>;
};
