import { SocialForm } from '@/components/dashboard/socials-form'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditSocialPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params
  
  const { data: social } = await supabase
    .from('social_links')
    .select('*')
    .eq('id', id)
    .single()

  if (!social) {
    notFound()
  }

  return (
      <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Social Link</h1>
      <SocialForm social={social} />
    </div>
  )
}
