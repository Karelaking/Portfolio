import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { SocialLinksList } from '@/components/dashboard/socials-list'

export default async function SocialsPage() {
  const supabase = await createClient()
  const { data: socials } = await supabase
    .from('social_links')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Social Links</h1>
        <Link
          href="/dashboard/socials/new"
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Link
        </Link>
      </div>

      <SocialLinksList socials={socials || []} />
    </div>
  )
}
