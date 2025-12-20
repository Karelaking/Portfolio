import { SkillForm } from '@/components/dashboard/skill-form'

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Skill</h1>
      <SkillForm />
    </div>
  )
}
