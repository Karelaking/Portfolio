'use client'

import { createExperience, updateExperience } from '@/lib/actions/experience'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Experience = {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  description: string | null
  display_order: number | null
}

export function ExperienceForm({ experience }: { experience?: Experience }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData(e.currentTarget)
        
        let result;
        if (experience) {
            result = await updateExperience(experience.id, formData)
        } else {
            result = await createExperience(formData)
        }

        if (result && result.error) {
            alert(result.error)
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Company
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        defaultValue={experience?.company}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                      />
                    </div>
                </div>

                <div>
                   <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Role
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="role"
                      id="role"
                      required
                      defaultValue={experience?.role}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    />
                  </div>
                </div>
              </div>

               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                   <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Start Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      required
                      defaultValue={experience?.start_date}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    />
                  </div>
                </div>
                 <div>
                    <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                     End Date (Leave blank for Present)
                   </label>
                   <div className="mt-2">
                     <input
                       type="date"
                       name="end_date"
                       id="end_date"
                       defaultValue={experience?.end_date || ''}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                     />
                   </div>
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
                    rows={4}
                    defaultValue={experience?.description || ''}
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
                       defaultValue={experience?.display_order || 0}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                     />
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
