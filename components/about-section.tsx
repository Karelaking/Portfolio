import { ProfileCard } from '@/components/about/profile-card';
import { SectionContainer } from '@/components/ui/section-container';

<<<<<<< HEAD
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React, { useRef, useEffect } from "react";
import { CircleText } from "@/components/circle-text";
import PageLayout from "@/components/page-layout";
import PageHeader from "./page-header";
import Heading from "./heading";
=======
import React from 'react';
>>>>>>> dev

type Profile = {
    full_name: string | null
    email: string | null
    bio: string | null
    avatar_url: string | null
    resume_url: string | null
}

const AboutSection = ({ profile }: { profile?: Profile | null }) => {
  const displayData = {
      name: profile?.full_name || "Karela king",
      bio: profile?.bio || "Software engineer with a passion for building beautiful, functional, and scalable web applications.",
      avatarUrl: profile?.avatar_url || "https://github.com/karelaking.png",
      login: "karelaking",
      location: "Earth",
      url: "https://github.com/karelaking",
      followers: { totalCount: 0 },
      following: { totalCount: 0 },
      status: { message: "Open to work", emoji: "⚡" },
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 0,
          weeks: []
        }
      },
      pinnedItems: {
        nodes: []
      },
      readme: null
  }
  
  return (
    <SectionContainer id="about" className="">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] w-full">
          {/* Left Column: Profile Card */}
          <ProfileCard data={displayData} /> 

          <div className="space-y-6 w-full min-w-0">
             <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="text-center text-gray-500">GitHub activity and pinned repos will appear here (integration pending).</p>
             </div>
          </div>
        </div>
    </SectionContainer>
  )
}

export default AboutSection
