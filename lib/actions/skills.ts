'use server'

import { z } from 'zod'
import { createCRUDItem, updateCRUDItem, deleteCRUDItem, createBaseSchema } from '@/lib/crud-helpers'

const SkillSchema = createBaseSchema({
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  icon: z.string().optional(),
  proficiency: z.coerce.number().min(0).max(100).optional(),
  display_order: z.coerce.number().optional(),
})

const skillConfig = {
  tableName: 'skills',
  schema: SkillSchema,
  redirectPath: '/dashboard/skills'
}

export async function createSkill(formData: FormData) {
  return createCRUDItem(skillConfig, formData)
}

export async function updateSkill(id: string, formData: FormData) {
  return updateCRUDItem(skillConfig, id, formData)
}

export async function deleteSkill(id: string) {
  return deleteCRUDItem('skills', id, '/dashboard/skills')
}
