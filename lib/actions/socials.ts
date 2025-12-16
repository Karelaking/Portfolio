'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SocialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().optional(),
  display_order: z.coerce.number().optional(),
  is_active: z.boolean().optional(),
})

export async function createSocialLink(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    platform: formData.get('platform'),
    url: formData.get('url'),
    icon: formData.get('icon'),
    display_order: formData.get('display_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parse = SocialLinkSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('social_links').insert(parse.data)

  if (error) {
    console.error('Error creating social link:', error)
    return { error: 'Failed to create social link' }
  }

  revalidatePath('/dashboard/socials')
  redirect('/dashboard/socials')
}

export async function updateSocialLink(id: string, formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    platform: formData.get('platform'),
    url: formData.get('url'),
    icon: formData.get('icon'),
    display_order: formData.get('display_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parse = SocialLinkSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { error } = await supabase.from('social_links').update(parse.data).eq('id', id)

  if (error) {
    console.error('Error updating social link:', error)
    return { error: 'Failed to update social link' }
  }

  revalidatePath('/dashboard/socials')
  redirect('/dashboard/socials')
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('social_links').delete().eq('id', id)

  if (error) {
    console.error('Error deleting social link:', error)
    return { error: 'Failed to delete social link' }
  }

  revalidatePath('/dashboard/socials')
}
