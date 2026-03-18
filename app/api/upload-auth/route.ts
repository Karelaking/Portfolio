import { getUploadAuthParams } from "@imagekit/next/server";

const hasPlaceholderValue = (value: string): boolean => {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.length === 0 ||
    normalized.includes("your_") ||
    normalized.includes("placeholder") ||
    normalized.includes("changeme")
  );
};

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY ?? "";
  const publicKey =
    process.env.IMAGEKIT_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ??
    "";

  if (!privateKey || !publicKey) {
    return Response.json(
      {
        error:
          "ImageKit credentials are missing. Set IMAGEKIT_PRIVATE_KEY and IMAGEKIT_PUBLIC_KEY (or NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY).",
      },
      { status: 500 }
    );
  }

  if (hasPlaceholderValue(privateKey) || hasPlaceholderValue(publicKey)) {
    return Response.json(
      {
        error:
          "ImageKit credentials are placeholders. Replace them with real keys from your ImageKit dashboard.",
      },
      { status: 500 }
    );
  }

  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey,
  });
}
