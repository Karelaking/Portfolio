import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { ZodSchema } from 'zod'

export interface CRUDActionConfig<T> {
  tableName: string
  schema: ZodSchema<T>
  redirectPath: string
  revalidatePaths?: string[]
  transformData?: (data: Record<string, unknown>) => Record<string, unknown> // eslint-disable-line no-unused-vars
}

export interface FormFieldConfig {
  name: string
  type: 'text' | 'email' | 'url' | 'number' | 'date' | 'textarea' | 'checkbox' | 'select'
  label?: string
  required?: boolean
  options?: string[]
  transform?: (value: unknown) => unknown // eslint-disable-line no-unused-vars
}

export async function createCRUDItem<T>(
  config: CRUDActionConfig<T>,
  formData: FormData
) {
  const supabase = await createClient()
  
  const rawData: Record<string, unknown> = {}
  const formEntries = Array.from(formData.entries())
  
  formEntries.forEach(([key, value]) => {
    rawData[key] = value
  })
  
  if (config.transformData) {
    Object.assign(rawData, config.transformData(rawData))
  }
  
  const parse = config.schema.safeParse(rawData)
  
  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }
  
  const { error } = await supabase.from(config.tableName).insert(parse.data)
  
  if (error) {
    console.error(`Error creating ${config.tableName}:`, error)
    return { error: `Failed to create ${config.tableName}` }
  }
  
  // Revalidate paths
  revalidatePath(config.redirectPath)
  if (config.revalidatePaths) {
    config.revalidatePaths.forEach(path => revalidatePath(path))
  }
  
  redirect(config.redirectPath)
}

export async function updateCRUDItem<T>(
  config: CRUDActionConfig<T>,
  id: string,
  formData: FormData
) {
  const supabase = await createClient()
  
  const rawData: Record<string, unknown> = {}
  const formEntries = Array.from(formData.entries())
  
  formEntries.forEach(([key, value]) => {
    rawData[key] = value
  })
  
  if (config.transformData) {
    Object.assign(rawData, config.transformData(rawData))
  }
  
  const parse = config.schema.safeParse(rawData)
  
  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }
  
  const { error } = await supabase
    .from(config.tableName)
    .update(parse.data)
    .eq('id', id)
  
  if (error) {
    console.error(`Error updating ${config.tableName}:`, error)
    return { error: `Failed to update ${config.tableName}` }
  }
  
  // Revalidate paths
  revalidatePath(config.redirectPath)
  if (config.revalidatePaths) {
    config.revalidatePaths.forEach(path => revalidatePath(path))
  }
  
  redirect(config.redirectPath)
}

export async function deleteCRUDItem(
  tableName: string,
  id: string,
  redirectPath?: string,
  revalidatePaths?: string[]
) {
  const supabase = await createClient()
  
  const { error } = await supabase.from(tableName).delete().eq('id', id)
  
  if (error) {
    console.error(`Error deleting ${tableName}:`, error)
    return { error: `Failed to delete ${tableName}` }
  }
  
  // Revalidate paths
  if (redirectPath) {
    revalidatePath(redirectPath)
  }
  if (revalidatePaths) {
    revalidatePaths.forEach(path => revalidatePath(path))
  }
}

// Generic schema builders
export const createBaseSchema = (fields: Record<string, unknown>) => {
  return z.object(fields)
}

// Common transformations
export const commonTransformations = {
  checkbox: (value: unknown) => value === 'on',
  commaSeparated: (value: unknown) => 
    value ? String(value).split(',').map((t: string) => t.trim()).filter(Boolean) : [],
  nullOnEmpty: (value: unknown) => value === '' ? null : value
}