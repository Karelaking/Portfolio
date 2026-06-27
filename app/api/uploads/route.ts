import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * @deprecated This endpoint is deprecated.
 * Use client-side uploads with @imagekit/next SDK instead.
 * See components/clientComponent/imagekit-upload.tsx for the new approach.
 */
export const POST = async (): Promise<Response> => {
	return NextResponse.json(
		{
			ok: false,
			error:
				"This upload endpoint is deprecated. Please use the ImageKitUpload component for client-side uploads.",
		},
		{ status: 410 } // 410 Gone
	);
};
