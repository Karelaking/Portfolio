'use client'

import { createSkill, updateSkill } from '@/lib/actions/skills'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Skill = {
  id: string
  name: string
  category: string | null
  icon: string | null
  proficiency: number | null
  display_order: number | null
}

export function SkillForm({ skill }: { skill?: Skill }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData(e.currentTarget)
        
        let result;
        if (skill) {
            result = await updateSkill(skill.id, formData)
        } else {
            result = await createSkill(formData)
        }

        if (result && result.error) {
            alert(result.error)
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
             <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    defaultValue={skill?.name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Category
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="category"
                        id="category"
                        list="category-options"
                        defaultValue={skill?.category || 'Frontend'}
                        placeholder="Select or type a category"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                      />
                      <datalist id="category-options">
                          <option value="Frontend" />
                          <option value="Backend" />
                          <option value="Mobile" />
                          <option value="DevOps" />
                          <option value="Database" />
                          <option value="Tools" />
                          <option value="Design" />
                          <option value="Soft Skills" />
                          <option value="Other" />
                      </datalist>
                    </div>
                </div>

                <div>
                   <label htmlFor="proficiency" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Proficiency (0-100)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="proficiency"
                      id="proficiency"
                      min="0"
                      max="100"
                      defaultValue={skill?.proficiency || 80}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    />
                  </div>
                </div>
              </div>

               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                   <label htmlFor="icon" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Icon Name (Lucide/SimpleIcons)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="icon"
                      id="icon"
                      placeholder="e.g. react, nodejs"
                      defaultValue={skill?.icon || ''}
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
                       defaultValue={skill?.display_order || 0}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                     />
                   </div>
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
