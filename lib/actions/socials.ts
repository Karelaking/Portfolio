'use server'

import { z } from 'zod'
import { createCRUDItem, updateCRUDItem, deleteCRUDItem, createBaseSchema, commonTransformations } from '@/lib/crud-helpers'

const SocialLinkSchema = createBaseSchema({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().optional(),
  display_order: z.coerce.number().optional(),
  is_active: z.boolean().optional(),
})

const socialConfig = {
  tableName: 'social_links',
  schema: SocialLinkSchema,
  redirectPath: '/dashboard/socials',
  transformData: (data: Record<string, unknown>) => ({
    ...data,
    is_active: commonTransformations.checkbox(data.is_active)
  })
}

export async function createSocialLink(formData: FormData) {
  return createCRUDItem(socialConfig, formData)
}

export async function updateSocialLink(id: string, formData: FormData) {
  return updateCRUDItem(socialConfig, id, formData)
}

export async function deleteSocialLink(id: string) {
  return deleteCRUDItem('social_links', id, '/dashboard/socials')
}
