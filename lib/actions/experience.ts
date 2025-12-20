'use server'

import { z } from 'zod'
import { createCRUDItem, updateCRUDItem, deleteCRUDItem, createBaseSchema, commonTransformations } from '@/lib/crud-helpers'

const ExperienceSchema = createBaseSchema({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
  description: z.string().optional(),
  display_order: z.coerce.number().optional(),
})

const experienceConfig = {
  tableName: 'experience',
  schema: ExperienceSchema,
  redirectPath: '/dashboard/experience',
  transformData: (data: Record<string, unknown>) => ({
    ...data,
    end_date: commonTransformations.nullOnEmpty(data.end_date)
  })
}

export async function createExperience(formData: FormData) {
  return createCRUDItem(experienceConfig, formData)
}

export async function updateExperience(id: string, formData: FormData) {
  return updateCRUDItem(experienceConfig, id, formData)
}

export async function deleteExperience(id: string) {
  return deleteCRUDItem('experience', id, '/dashboard/experience')
}
