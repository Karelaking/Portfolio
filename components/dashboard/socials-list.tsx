'use client'

import { deleteSocialLink } from '@/lib/actions/socials'
import { toast } from 'sonner'
import { ExternalLink } from 'lucide-react'
import { ListPage } from '@/components/ui/data-table'

type SocialLink = {
  id: string
  platform: string
  url: string
  icon: string | null
  display_order: number | null
  is_active: boolean
}

export function SocialLinksList({ socials }: { socials: SocialLink[] }) {
  const handleDelete = async (item: SocialLink) => {
    await deleteSocialLink(item.id)
    toast.success('Social link deleted')
  }

  const columns = [
    {
      key: 'platform' as keyof SocialLink,
      label: 'Platform',
      render: (value: string, item: SocialLink) => (
        <div className="flex items-center gap-2">
          {item.icon && <span>{item.icon}</span>}
          {value}
        </div>
      )
    },
    {
      key: 'url' as keyof SocialLink,
      label: 'URL',
      render: (value: string) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
          {value} <ExternalLink className="h-3 w-3" />
        </a>
      )
    },
    {
      key: 'is_active' as keyof SocialLink,
      label: 'Status',
      render: (value: boolean) => (
        value ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Inactive</span>
        )
      )
    }
  ]

  return (
    <ListPage
      title="Social Links"
      data={socials}
      columns={columns}
      editHref={(item) => `/dashboard/socials/${item.id}/edit`}
      onDelete={handleDelete}
      newHref="/dashboard/socials/new"
      newButtonLabel="Add Social Link"
      emptyMessage="No social links found. Add one to get started."
    />
  )
}
