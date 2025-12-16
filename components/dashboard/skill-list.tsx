'use client'

import { deleteSkill } from '@/lib/actions/skills'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type Skill = {
  id: string
  name: string
  category: string | null
  icon: string | null
  proficiency: number | null
  display_order: number | null
}

export function SkillList({ skills }: { skills: Skill[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(id)
      toast.success('Skill deleted')
    }
  }

  if (skills.length === 0) {
      return (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No skills found. Add one to get started.</p>
        </div>
      )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Proficiency</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{skill.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{skill.category}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{skill.proficiency}%</td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Link href={`/dashboard/skills/${skill.id}/edit`} className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                    <Pencil className="h-4 w-4" />
                  </Link>
                   <button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
