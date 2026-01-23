import AboutSection from '@/components/about-section'
import { ExperienceSection } from '@/components/experience-section'
import HeroSection from '@/components/hero-section'
import ScreenFitText from '@/components/screen-fit-text'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'// import { ProjectSection } from '@/components/projects-section'
import React from 'react'
import { experience } from '@/data/experience'
import { GallerySection } from '@/components/gallery-section'
import { ContactSection } from '@/components/contact-section'
import { ExpertiseSection } from '@/components/expertise-section'


const page = async (): Promise<React.JSX.Element> => {
  

  return (
    <div className='w-full h-max bg-white dark:bg-neutral-800 flex flex-col md:justify-center md:items-center relative'>
      <HeroSection />
      <ScreenFitText className='bg-neutral-100'>
        know about me
      </ScreenFitText>
      <AboutSection />
      <ScreenFitText>
        what I excel at
      </ScreenFitText>
      <ExperienceSection experience={experience || []} />
      <ScreenFitText className='bg-neutral-100'>
        what I do best
      </ScreenFitText>
      <ExpertiseSection />
      {/* <ScreenFitText>
        what I have created
      </ScreenFitText>
      <ProjectSection projects={projects || []} /> */}
      <ScreenFitText className='bg-neutral-100'>
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