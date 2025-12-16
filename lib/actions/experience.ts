'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional().or(z.literal('')),
  description: z.string().optional(),
  display_order: z.coerce.number().optional(),
})

export async function createExperience(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    company: formData.get('company'),
    role: formData.get('role'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date') || null,
    description: formData.get('description'),
    display_order: formData.get('display_order'),
  }

  const parse = ExperienceSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('experience').insert(parse.data)

  if (error) {
    console.error('Error creating experience:', error)
    return { error: 'Failed to create experience' }
  }

  revalidatePath('/dashboard/experience')
  redirect('/dashboard/experience')
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    company: formData.get('company'),
    role: formData.get('role'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date') || null,
    description: formData.get('description'),
    display_order: formData.get('display_order'),
  }

  const parse = ExperienceSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('experience').update(parse.data).eq('id', id)

  if (error) {
    console.error('Error updating experience:', error)
    return { error: 'Failed to update experience' }
  }

  revalidatePath('/dashboard/experience')
  redirect('/dashboard/experience')
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('experience').delete().eq('id', id)

  if (error) {
    console.error('Error deleting experience:', error)
    return { error: 'Failed to delete experience' }
  }

  revalidatePath('/dashboard/experience')
}
