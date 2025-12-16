import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ExperienceList } from '@/components/dashboard/experience-list'

export default async function ExperiencePage() {
  const supabase = await createClient()
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Experience</h1>
        <Link
          href="/dashboard/experience/new"
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Link>
      </div>

      <ExperienceList experience={experience || []} />
    </div>
  )
}
