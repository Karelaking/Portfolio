import { ExperienceForm } from '@/components/dashboard/experience-form'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params
  
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('id', id)
    .single()

  if (!experience) {
    notFound()
  }

  return (
      <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Experience</h1>
      <ExperienceForm experience={experience} />
    </div>
  )
}
