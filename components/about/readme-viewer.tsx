import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContributionGraph } from "./contribution-graph";
import { GithubProfile } from "@/lib/github";

interface ReadmeViewerProps {
  data: GithubProfile;
}

export function ReadmeViewer({ data }: ReadmeViewerProps) {
  return (
    <Card className="border-border bg-card h-full w-full p-0">
      <CardHeader className="bg-muted/50 border-border flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{data.login}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-mono font-medium">README.md</span>
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between space-y-6 p-0">
        <div className="relative w-full overflow-hidden rounded-lg text-xl px-4">
          {data.readme && <div dangerouslySetInnerHTML={{ __html: data.bio }} />}
        </div>
        <ContributionGraph data={data} />
      </CardContent>
    </Card>
  );
}
