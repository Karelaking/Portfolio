'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ProfileSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
  resume_url: z.string().optional(),
})

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const rawData = {
    full_name: formData.get('full_name'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    avatar_url: formData.get('avatar_url'),
    resume_url: formData.get('resume_url'),
  }

  const parse = ProfileSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  // Upsert profile for the current user
  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    ...parse.data,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error updating profile:', error)
    return { error: 'Failed to update profile' }
  }

  revalidatePath('/dashboard/profile')
  revalidatePath('/')
  return { success: true }
}
