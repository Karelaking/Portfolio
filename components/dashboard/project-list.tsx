'use client'

import { deleteProject } from '@/lib/actions/projects'
import { Pencil, Trash2, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

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

export function ProjectList({ projects }: { projects: Project[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id)
      toast.success('Project deleted')
    }
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No projects found. Add one to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
            {project.image_url ? (
               <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {project.title}
              </h3>
              {project.featured && (
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies?.slice(0, 3).map((tech) => (
                 <span key={tech} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700">
                    {tech}
                 </span>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                  <span className="text-xs text-gray-500 self-center">+{project.technologies.length - 3}</span>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex gap-2">
                {project.project_url && (
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.github_url && (
                   <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/projects/${project.id}/edit`}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
