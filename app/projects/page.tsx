import { ProjectSection } from '@/components/projects-section'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

export const revalidate = 60

export default async function ProjectsPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || !url.startsWith('https://')) {
     return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 text-center">
           <h1 className="text-2xl font-bold">Supabase Not Configured</h1>
           <p className="text-red-500 mt-2">Invalid or missing credentials.</p>
           <p className="text-sm text-gray-500">URL must start with https://</p>
        </div>
     )
  }

  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">All Projects</h1>
        <ProjectSection projects={projects || []} />
      </div>
    </div>
  )
}
