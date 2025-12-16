'use client'

import { deleteSocialLink } from '@/lib/actions/socials'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type SocialLink = {
  id: string
  platform: string
  url: string
  icon: string | null
  display_order: number | null
  is_active: boolean
}

export function SocialLinksList({ socials }: { socials: SocialLink[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      await deleteSocialLink(id)
      toast.success('Social link deleted')
    }
  }

  if (socials.length === 0) {
      return (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No social links found. Add one to get started.</p>
        </div>
      )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Platform</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
             <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
          {socials.map((link) => (
            <tr key={link.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center gap-2">
                       {/* Ideally render icon here if possible */}
                      {link.platform}
                  </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                 <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                    {link.url} <ExternalLink className="h-3 w-3" />
                 </a>
              </td>
               <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                 {link.is_active ? (
                     <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
                 ) : (
                     <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Inactive</span>
                 )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Link href={`/dashboard/socials/${link.id}/edit`} className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                    <Pencil className="h-4 w-4" />
                  </Link>
                   <button onClick={() => handleDelete(link.id)} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
