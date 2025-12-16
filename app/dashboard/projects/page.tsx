import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ProjectList } from '@/components/dashboard/project-list'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      <ProjectList projects={projects || []} />
    </div>
  )
}
