'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  project_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  technologies: z.string().optional(), // We'll parse comma-separated string
  featured: z.boolean().optional(),
  display_order: z.coerce.number().optional(),
})

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  // Extract data from formData
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    image_url: formData.get('image_url'),
    project_url: formData.get('project_url'),
    github_url: formData.get('github_url'),
    technologies: formData.get('technologies'),
    featured: formData.get('featured') === 'on',
    display_order: formData.get('display_order'),
  }

  // Validate
  const parse = ProjectSchema.safeParse(rawData)

  if (!parse.success) {
    return { error: 'Invalid data', details: parse.error.format() }
  }

  const { technologies, ...data } = parse.data
  const techArray = technologies ? technologies.split(',').map(t => t.trim()).filter(Boolean) : []

  const { error } = await supabase.from('projects').insert({
    ...data,
    technologies: techArray
  })

  if (error) {
    console.error('Error creating project:', error)
    return { error: 'Failed to create project' }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/')
  redirect('/dashboard/projects')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return { error: 'Failed to delete project' }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/')
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    // Extract data from formData
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      project_url: formData.get('project_url'),
      github_url: formData.get('github_url'),
      technologies: formData.get('technologies'),
      featured: formData.get('featured') === 'on',
      display_order: formData.get('display_order'),
    }

    // Validate
    const parse = ProjectSchema.safeParse(rawData)

    if (!parse.success) {
      return { error: 'Invalid data', details: parse.error.format() }
    }

    const { technologies, ...data } = parse.data
    const techArray = technologies ? technologies.split(',').map(t => t.trim()).filter(Boolean) : []

    const { error } = await supabase.from('projects').update({
      ...data,
      technologies: techArray
    }).eq('id', id)

    if (error) {
      console.error('Error updating project:', error)
      return { error: 'Failed to update project' }
    }

    revalidatePath('/dashboard/projects')
    revalidatePath('/')
    redirect('/dashboard/projects')
}
