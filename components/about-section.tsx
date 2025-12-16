import { ProfileCard } from '@/components/about/profile-card';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import React from 'react';

type Profile = {
    full_name: string | null
    email: string | null
    bio: string | null
    avatar_url: string | null
    resume_url: string | null
}

const AboutSection = ({ profile }: { profile?: Profile | null }) => {
  const displayData = {
      name: profile?.full_name || "Karel Aking",
      bio: profile?.bio || "Software engineer with a passion for building beautiful, functional, and scalable web applications.",
      avatar_url: profile?.avatar_url || "https://github.com/karelaking.png",
      html_url: "https://github.com/karelaking",
      login: "karelaking", // Added login field
      location: "Earth",
      email: profile?.email,
      followers: { totalCount: 0 },
      following: { totalCount: 0 },
      status: { message: "Open to work", emoji: "⚡" }, // Added status
      url: "https://github.com/karelaking" // Ensure consistent URL field
  }
  
  return (
    <SectionContainer id="about" className="w-full">
        <SectionHeader 
            title="About Me" 
            description={displayData.bio}
            align="left"
        />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr] w-full">
          {/* Left Column: Profile Card */}
          <ProfileCard data={displayData as any} /> 

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
