// import AboutSection from '@/components/about-section'
// import { ContactSection } from '@/components/contact-section'
// import { ExperienceSection } from '@/components/experience-section'
// import { ExpertiseSection } from '@/components/expertise-section'
// import { GallerySection } from '@/components/gallery-section'
import HeroSection from '@/components/hero-section'
// import { ProjectSection } from '@/components/projects-section'
// import ScreenFitText from '@/components/screen-fit-text'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page = async (): Promise<React.JSX.Element> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Validation
    let isValid = true;
    let errorMessage = "";

    if (!supabaseUrl || !supabaseKey) {
        isValid = false;
        errorMessage = "Missing environment variables.";
    } else if (!supabaseUrl.startsWith("https://")) {
        isValid = false;
        errorMessage = "Invalid Supabase URL. It must start with https://";
    }

    if (!isValid) {
        return (
            <div className='w-full min-h-screen flex flex-col justify-center items-center p-8 text-center'>
            <h1 className="text-3xl font-bold mb-4">Setup Required</h1>
            <p className="mb-4 text-lg">Please replace the environment variables in <code className="bg-gray-100 p-1 rounded">.env.local</code> with your Supabase credentials.</p>
            <p className="text-sm text-red-600 font-medium mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
            </div>
        )
    }

  const supabase = await createClient()

  // Fetch featured projects
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (projectsError) console.error("Error fetching projects:", projectsError)

  // Fetch experience
  const { data: experience, error: experienceError } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false })
  
  if (experienceError) console.error("Error fetching experience:", experienceError)

  // Fetch skills for expertise
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true })

  if (skillsError) console.error("Error fetching skills:", skillsError)

  // Fetch profile (assuming single user, get the first one or specific ID if known, but for now we might fetch all and take first)
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
  
  if (profileError) console.error("Error fetching profile:", profileError)
  
  const profile = profiles?.[0] || null

  return (
    <div className='w-full h-max bg-white flex flex-col md:justify-center md:items-center'>
      <HeroSection />
      {/* <ScreenFitText className='bg-neutral-100'>
        know about me
      </ScreenFitText>
      <AboutSection profile={profile} />
      <ScreenFitText>
        what I excel at
      </ScreenFitText>
      <ExperienceSection experience={experience || []} />
      <ScreenFitText className='bg-neutral-100'>
        what I do best
      </ScreenFitText>
      <ExpertiseSection skills={skills || []} />
      <ScreenFitText>
        what I have created
      </ScreenFitText>
      <ProjectSection projects={projects || []} />
      <ScreenFitText className='bg-neutral-100'>
        curated moments
      </ScreenFitText>
      <GallerySection />
      <ScreenFitText>
        engage with me
      </ScreenFitText>
      <ContactSection /> */}
    </div>
  )
}

export default page