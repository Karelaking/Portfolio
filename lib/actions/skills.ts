'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  icon: z.string().optional(),
  proficiency: z.coerce.number().min(0).max(100).optional(),
  display_order: z.coerce.number().optional(),
})

export async function createSkill(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    name: formData.get('name'),
    category: formData.get('category'),
    icon: formData.get('icon'),
    proficiency: formData.get('proficiency'),
    display_order: formData.get('display_order'),
  }

  const parse = SkillSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('skills').insert(parse.data)

  if (error) {
    console.error('Error creating skill:', error)
    return { error: 'Failed to create skill' }
  }

  revalidatePath('/dashboard/skills')
  redirect('/dashboard/skills')
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    name: formData.get('name'),
    category: formData.get('category'),
    icon: formData.get('icon'),
    proficiency: formData.get('proficiency'),
    display_order: formData.get('display_order'),
  }

  const parse = SkillSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('skills').update(parse.data).eq('id', id)

  if (error) {
    console.error('Error updating skill:', error)
    return { error: 'Failed to update skill' }
  }

  revalidatePath('/dashboard/skills')
  redirect('/dashboard/skills')
}

export async function deleteSkill(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('skills').delete().eq('id', id)

  if (error) {
    console.error('Error deleting skill:', error)
    return { error: 'Failed to delete skill' }
  }

  revalidatePath('/dashboard/skills')
}
