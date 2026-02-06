import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || !url.startsWith("https://")) {
      return NextResponse.json({ projects: [] }, { status: 200 });
    }

    const supabase = await createClient();

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ projects: [] }, { status: 200 });
    }

    return NextResponse.json({ projects: projects || [] });
  } catch (error) {
    console.error("Error in projects API:", error);
    return NextResponse.json({ projects: [] }, { status: 200 });
  }
}
