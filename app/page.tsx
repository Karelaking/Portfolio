import { ExperienceSection } from '@/components/experience-section'
import ExpertiseCard from '@/components/expertise-card'
import { ExpertiseSection } from '@/components/expertise-section'
import { GallerySection } from '@/components/gallery-section'
import HeroSection from '@/components/hero-section'
import { ProjectSection } from '@/components/projects-section'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-max bg-gray-100 flex flex-col md:justify-center md:items-center'>
      <HeroSection />
      <ExpertiseSection />
      <ExperienceSection />
      <ProjectSection />
      <GallerySection />
    </div>
  )
}

export default page