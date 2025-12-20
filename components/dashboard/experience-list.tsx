'use client'

import { deleteExperience } from '@/lib/actions/experience'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ListPage } from '@/components/ui/data-table'

type Experience = {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  description: string | null
  display_order: number | null
}

export function ExperienceList({ experience }: { experience: Experience[] }) {
  const handleDelete = async (item: Experience) => {
    await deleteExperience(item.id)
    toast.success('Experience deleted')
  }

  const columns = [
    {
      key: 'company' as keyof Experience,
      label: 'Company'
    },
    {
      key: 'role' as keyof Experience,
      label: 'Role'
    },
    {
      key: 'start_date' as keyof Experience,
      label: 'Duration',
      render: (value: string, item: Experience) => (
        <>
          {format(new Date(value), 'MMM yyyy')} - {item.end_date ? format(new Date(item.end_date), 'MMM yyyy') : 'Present'}
        </>
      )
    }
  ]

  return (
    <ListPage
      title="Experience"
      data={experience}
      columns={columns}
      editHref={(item) => `/dashboard/experience/${item.id}/edit`}
      onDelete={handleDelete}
      newHref="/dashboard/experience/new"
      newButtonLabel="Add Experience"
      emptyMessage="No experience found. Add one to get started."
    />
  )
}
