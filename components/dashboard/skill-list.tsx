'use client'

import { deleteSkill } from '@/lib/actions/skills'
import { toast } from 'sonner'
import { ListPage } from '@/components/ui/data-table'

type Skill = {
  id: string
  name: string
  category: string | null
  icon: string | null
  proficiency: number | null
  display_order: number | null
}

export function SkillList({ skills }: { skills: Skill[] }) {
  const handleDelete = async (item: Skill) => {
    await deleteSkill(item.id)
    toast.success('Skill deleted')
  }

  const columns = [
    {
      key: 'name' as keyof Skill,
      label: 'Name'
    },
    {
      key: 'category' as keyof Skill,
      label: 'Category'
    },
    {
      key: 'proficiency' as keyof Skill,
      label: 'Proficiency',
      render: (value: number) => `${value}%`
    }
  ]

  return (
    <ListPage
      title="Skills"
      data={skills}
      columns={columns}
      editHref={(item) => `/dashboard/skills/${item.id}/edit`}
      onDelete={handleDelete}
      newHref="/dashboard/skills/new"
      newButtonLabel="Add Skill"
      emptyMessage="No skills found. Add one to get started."
    />
  )
}
