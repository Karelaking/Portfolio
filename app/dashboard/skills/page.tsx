import { createClient } from '@/lib/supabase/server'
import { SkillList } from '@/components/dashboard/skill-list'

export default async function SkillsPage() {
  const supabase = await createClient()
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <SkillList skills={skills || []} />
  )
}
