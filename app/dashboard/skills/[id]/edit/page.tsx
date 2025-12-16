import { SkillForm } from '@/components/dashboard/skill-form'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params
  
  const { data: skill } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single()

  if (!skill) {
    notFound()
  }

  return (
      <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Skill</h1>
      <SkillForm skill={skill} />
    </div>
  )
}
