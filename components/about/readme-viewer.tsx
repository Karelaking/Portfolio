
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CodeVisualizer } from '@/components/code-visualizer'
import { ContributionGraph } from './contribution-graph'
import { GithubProfile } from '@/lib/github'

interface ReadmeViewerProps {
  data: GithubProfile
}

export function ReadmeViewer({ data }: ReadmeViewerProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="bg-muted/50 py-3 px-4 border-b border-border flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{data.login}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-mono font-medium">README.md</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="relative w-full overflow-hidden rounded-lg border border-border">
          <CodeVisualizer />
        </div>

        {/* Integrated Contribution Graph directly here or pass it as children if preferred */}
        <ContributionGraph data={data} />
      </CardContent>
    </Card>
  )
}
