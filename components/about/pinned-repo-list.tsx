
import React from 'react'
import { Card, CardHeader, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Book, Star, GitBranch } from 'lucide-react'
import { GithubProfile } from '@/lib/github'

interface PinnedRepoListProps {
  data: GithubProfile
}

export function PinnedRepoList({ data }: PinnedRepoListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data.pinnedItems.nodes.map((repo) => (
        <Card
          key={repo.name}
          className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group flex flex-col"
        >
          <CardHeader className="p-4 space-y-1">
            <div className="flex items-center justify-between">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold text-primary group-hover:underline"
              >
                <Book className="w-4 h-4 text-muted-foreground" />
                <span>{repo.name}</span>
              </a>
              <Badge variant="outline" className="text-[10px] h-5">
                {repo.isPrivate ? "Private" : "Public"}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 text-xs mt-2 min-h-[2.5em]">
              {repo.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center gap-4 mt-auto">
            {repo.primaryLanguage && (
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: repo.primaryLanguage.color }}
                ></div>
                <span>{repo.primaryLanguage.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1 hover:text-foreground">
              <Star className="w-3 h-3" />
              <span>{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-foreground">
              <GitBranch className="w-3 h-3" />
              <span>{repo.forkCount}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
