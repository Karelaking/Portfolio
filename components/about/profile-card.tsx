import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Github } from "lucide-react";
import { GithubProfile } from "@/lib/github";
import Link from "next/link";
import Image from "next/image";

interface ProfileCardProps {
  data: GithubProfile;
}

export function ProfileCard({ data }: ProfileCardProps) {
  return (
    <div className="w-full space-y-6">
      <Card className="border-border bg-card max-w-full overflow-hidden p-0">
        <div className="relative h-32 bg-muted/60 border-b border-neutral-200 dark:border-neutral-700 shadow-2xs">
          <div className="group absolute -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/12">
            <div className="border-card relative flex size-32 items-center justify-center overflow-hidden rounded-full border-4 bg-neutral-100 shadow group-hover:shadow-none dark:bg-neutral-800 transform">
              <Image
                fill
                src={data.avatarUrl}
                alt={data.name}
                className="h-full w-full object-cover"
              />
            </div>
            {data.status && (
              <div
                className="bg-card border-border absolute right-2 bottom-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] shadow group-hover:shadow-none"
                title={data.status.message || "Status"}
              >
                {data.status.emoji || "💭"}
              </div>
            )}
          </div>
        </div>
        <CardContent className="px-4 pt-14 pb-6 md:px-6">
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-shadow-2xs">
              {data.name}
            </h3>
            <p className="text-muted-foreground text-lg">@{data.login}</p>
          </div>

          <div className="mt-4">
            <Button className="w-full transition-all" variant="outline" asChild>
              <Link
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full animate-pulse"
              >
                View GitHub Profile
              </Link>
            </Button>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
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
              <div className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{data.location}</span>
              </div>
            )}
            {data.url && (
              <div className="text-muted-foreground flex items-center gap-2">
                <Github className="h-4 w-4" />
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
  );
}
