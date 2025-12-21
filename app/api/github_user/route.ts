import { NextResponse } from "next/server";
import { getGithubData } from "@/lib/github";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "karelaking";

    const data = await getGithubData(username);

    if (!data) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Failed to fetch GitHub data. Please check GITHUB_TOKEN environment variable.",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    if ("error" in data) {
      return NextResponse.json(
        {
          status: "error",
          message: (data as any).error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      data,
      username,
    });
  } catch (error) {
    console.error("GitHub API route error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error while fetching GitHub data.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
