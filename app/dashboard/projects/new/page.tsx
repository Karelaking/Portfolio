import { ProjectForm } from '@/components/dashboard/project-form'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Project</h1>
      <ProjectForm />
    </div>
  )
}
