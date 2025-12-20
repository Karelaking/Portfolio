import { createClient } from '@/lib/supabase/server'
import { SocialLinksList } from '@/components/dashboard/socials-list'

export default async function SocialsPage() {
  const supabase = await createClient()
  const { data: socials } = await supabase
    .from('social_links')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <SocialLinksList socials={socials || []} />
  )
}
