import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

const getBucketName = (): string => {
  return process.env.SUPABASE_STORAGE_BUCKET ?? "media";
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
      return NextResponse.json(
        { ok: false, error: "Admin client not configured." },
        { status: 500 },
      );
    }

    const bucket = getBucketName();
    const folder = sanitizeFolder(String(formData.get("folder") ?? "assets"));
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const path = `${folder}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await client.storage
      .from(bucket)
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
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
