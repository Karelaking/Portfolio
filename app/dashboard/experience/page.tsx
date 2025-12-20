import { createClient } from '@/lib/supabase/server'
import { ExperienceList } from '@/components/dashboard/experience-list'

export default async function ExperiencePage() {
  const supabase = await createClient()
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false })

  return (
    <ExperienceList experience={experience || []} />
  )
}
