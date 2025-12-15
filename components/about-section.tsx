
import React from 'react'
import { getGithubData, GithubProfile } from '@/lib/github'
import { SectionContainer } from '@/components/ui/section-container'
import { SectionHeader } from '@/components/ui/section-header'
import { ProfileCard } from '@/components/about/profile-card'
import { ReadmeViewer } from '@/components/about/readme-viewer'
import { PinnedRepoList } from '@/components/about/pinned-repo-list'

const AboutSection = async () => {
  const username = 'karelaking'
  const data = await getGithubData(username)
  
  if (!data || (data as { error?: string }).error) {
     return (
        <SectionContainer id="about">
           <div className="text-center text-muted-foreground">
              <p>Unable to load GitHub profile.</p>
              <p className="text-sm mt-2 text-red-500">{(data as { error?: string })?.error || "Please check your connection."}</p>
           </div>
        </SectionContainer>
     )
  }

  const profileData = data as GithubProfile;
  
  return (
    <SectionContainer id="about">
        <SectionHeader 
            title="About Me" 
            description={profileData.bio || "Software engineer with a passion for building beautiful, functional, and scalable web applications."}
            align="left"
        />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Left Column: Profile Card */}
          <ProfileCard data={profileData} />

          {/* Right Column: Readme & Activity */}
          <div className="space-y-6">
            <ReadmeViewer data={profileData} />
            <PinnedRepoList data={profileData} />
          </div>
        </div>
    </SectionContainer>
  )
}

export default AboutSection
