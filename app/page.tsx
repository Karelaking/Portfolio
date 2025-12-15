import AboutSection from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { ExperienceSection } from '@/components/experience-section'
import { ExpertiseSection } from '@/components/expertise-section'
import { GallerySection } from '@/components/gallery-section'
import HeroSection from '@/components/hero-section'
import { ProjectSection } from '@/components/projects-section'
import ScreenFitText from '@/components/screen-fit-text'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-max bg-white flex flex-col md:justify-center md:items-center'>
      <HeroSection />
      <ScreenFitText className='bg-gray-100'>
        know about me
      </ScreenFitText>
      <AboutSection />
      <ScreenFitText>
        what I excel at
      </ScreenFitText>
      <ExperienceSection />
      <ScreenFitText className='bg-gray-100'>
        what I do best
      </ScreenFitText>
      <ExpertiseSection />
      <ScreenFitText>
        what I have created
      </ScreenFitText>
      <ProjectSection />
      <ScreenFitText className='bg-gray-100'>
        curated moments
      </ScreenFitText>
      <GallerySection />
      <ScreenFitText>
        engage with me
      </ScreenFitText>
      <ContactSection />
    </div>
  )
}

export default page