'use client'

import { createProject, updateProject } from '@/lib/actions/projects'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Project = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  project_url: string | null
  github_url: string | null
  technologies: string[] | null
  featured: boolean
  display_order: number | null
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Convert checkbox to boolean/string logic if needed, but FormData handles it.
    // However, if unchecked, it sends nothing. 
    
    let result;
    if (project) {
        result = await updateProject(project.id, formData)
    } else {
        result = await createProject(formData)
    }

    if (result && result.error) {
        alert(result.error) // Basic error handling
        setIsLoading(false)
    }
    // If success, the action redirects, so we don't need to do anything.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={project?.title}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Description
        </label>
        <div className="mt-2">
          <textarea
            name="description"
            id="description"
            rows={3}
            defaultValue={project?.description || ''}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
           <label htmlFor="image_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
             Image URL
           </label>
           <div className="mt-2">
             <input
               type="url"
               name="image_url"
               id="image_url"
               defaultValue={project?.image_url || ''}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
             />
           </div>
        </div>
        <div>
            <label htmlFor="display_order" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
             Display Order
           </label>
           <div className="mt-2">
             <input
               type="number"
               name="display_order"
               id="display_order"
               defaultValue={project?.display_order || 0}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="project_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            Project URL
          </label>
          <div className="mt-2">
            <input
              type="url"
              name="project_url"
              id="project_url"
              defaultValue={project?.project_url || ''}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>

        <div>
           <label htmlFor="github_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            GitHub URL
          </label>
          <div className="mt-2">
            <input
              type="url"
              name="github_url"
              id="github_url"
              defaultValue={project?.github_url || ''}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Technologies (comma separated)
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="technologies"
            id="technologies"
            placeholder="React, Next.js, TailwindCSS"
            defaultValue={project?.technologies?.join(', ')}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>
      </div>

      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={project?.featured}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="featured" className="font-medium text-gray-900 dark:text-gray-100">
            Featured Project
          </label>
          <p className="text-gray-500 dark:text-gray-400">Show this project on the homepage.</p>
        </div>
      </div>

      <div className="flex justify-end gap-x-4">
        <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800"
            disabled={isLoading}
        >
            Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
