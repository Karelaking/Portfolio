import { ExperienceForm } from '@/components/dashboard/experience-form'

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Experience</h1>
      <ExperienceForm />
    </div>
  )
}
