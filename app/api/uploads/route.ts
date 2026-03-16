import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

const getBucketName = (): string => {
  return process.env.SUPABASE_STORAGE_BUCKET ?? "media";
};

const getMissingSupabaseConfig = (): string[] => {
  const missing: string[] = [];

  const hasUrl = Boolean(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!hasUrl) {
    missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  }

  if (!hasServiceRole) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }

  return missing;
};

const sanitizeFolder = (value: string): string => {
  const cleaned = value
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/\\+/g, "/")
    .replace(/\.{2,}/g, "")
    .replace(/^\/+|\/+$/g, "");

  return cleaned.length > 0 ? cleaned : "assets";
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file uploaded." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "Only image files are allowed." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image must be smaller than 8MB." },
        { status: 400 },
      );
    }

    const client = getSupabaseAdminClient();
    if (!client) {
      const missingConfig = getMissingSupabaseConfig();
      return NextResponse.json(
        {
          ok: false,
          error:
            missingConfig.length > 0
              ? `Missing Supabase config: ${missingConfig.join(", ")}.`
              : "Admin client not configured.",
        },
        { status: 500 },
      );
    }

    const bucket = getBucketName();
    const folder = sanitizeFolder(String(formData.get("folder") ?? "assets"));
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const path = `${folder}/${filename}`;

    const { error } = await client.storage
      .from(bucket)
      .upload(path, file, { contentType: file.type, upsert: true });

    if (error) {
      const isMissingBucket = /bucket.*not.*found/i.test(error.message);
      const message = isMissingBucket
        ? `Storage bucket "${bucket}" was not found. Set SUPABASE_STORAGE_BUCKET to an existing bucket name.`
        : error.message;

      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }

    const { data } = client.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({ ok: true, url: data.publicUrl, path });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Upload failed.",
      },
      { status: 500 },
    );
  }
};
