
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Github } from 'lucide-react'
import { GithubProfile } from '@/lib/github'
import Link from 'next/link'
import Image from 'next/image'

interface ProfileCardProps {
  data: GithubProfile
}

export function ProfileCard({ data }: ProfileCardProps) {
  return (
    <div className="space-y-6 w-full">
      <Card className="overflow-hidden border-border bg-card max-w-full">
        <div className="h-32 bg-gray-200 dark:bg-gray-800 relative">
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/12 group">
            <div className="size-32 rounded-full border-4 border-card bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative shadow group-hover:shadow-none">
              <Image
                fill
                src={data.avatarUrl}
                alt={data.name}
                className="w-full h-full object-cover"
                />
            </div>
            {data.status && (
              <div
              className="absolute bottom-1 right-2 w-6 h-6 bg-card border border-border rounded-full z-10 flex items-center justify-center text-[10px] shadow group-hover:shadow-none"
                title={data.status.message || "Status"}
                >
                {data.status.emoji || "💭"}
              </div>
            )}
          </div>
        </div>
        <CardContent className="pt-14 mt-2 px-4 md:px-6">
          <div className="space-y-1">
            <h3 className="font-extrabold text-3xl text-shadow-2xs">{data.name}</h3>
            <p className="text-muted-foreground text-lg">@{data.login}</p>
          </div>

          <div className="mt-4">
            <Button className="w-full transition-all" variant="outline" asChild>
              <Link href={data.url} target="_blank" rel="noopener noreferrer" className='w-full'>
                View GitHub Profile
              </Link>
            </Button>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-foreground font-medium">
                {data.followers.totalCount}
              </span>{" "}
              followers
              <span>·</span>
              <span className="text-foreground font-medium">
                {data.following.totalCount}
              </span>{" "}
              following
            </div>
            {data.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
            )}
            {data.url && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Github className="w-4 h-4" />
                <a
                  href={data.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  @{data.login}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
