'use client'

import { createSocialLink, updateSocialLink } from '@/lib/actions/socials'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SocialLink = {
  id: string
  platform: string
  url: string
  icon: string | null
  display_order: number | null
  is_active: boolean
}

export function SocialForm({ social }: { social?: SocialLink }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData(e.currentTarget)
        
        let result;
        if (social) {
            result = await updateSocialLink(social.id, formData)
        } else {
            result = await createSocialLink(formData)
        }

        if (result && result.error) {
            alert(result.error)
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
             <div>
                <label htmlFor="platform" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Platform
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="platform"
                    id="platform"
                    required
                    placeholder="e.g. GitHub, LinkedIn, X"
                    defaultValue={social?.platform}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                  />
                </div>
              </div>

               <div>
                <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="url"
                    id="url"
                    required
                    defaultValue={social?.url}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                  />
                </div>
              </div>

               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                   <label htmlFor="icon" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Icon Name (Lucide)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="icon"
                      id="icon"
                      placeholder="e.g. github, linkedin"
                      defaultValue={social?.icon || ''}
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
                       defaultValue={social?.display_order || 0}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                     />
                   </div>
                </div>
              </div>

              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    defaultChecked={social?.is_active ?? true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="is_active" className="font-medium text-gray-900 dark:text-gray-100">
                    Active
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">Show this link on your profile.</p>
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
