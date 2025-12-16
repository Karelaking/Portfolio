'use client'

import { updateProfile } from '@/lib/actions/profile'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Profile = {
  full_name: string | null
  email: string | null
  bio: string | null
  avatar_url: string | null
  resume_url: string | null
}

export function ProfileForm({ profile }: { profile?: Profile }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData(e.currentTarget)
        const result = await updateProfile(formData)

        if (result && result.error) {
            toast.error(result.error)
        } else {
            toast.success('Profile updated')
            router.refresh()
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        defaultValue={profile?.full_name || ''}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                      />
                    </div>
                </div>

                <div>
                   <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={profile?.email || ''}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    />
                  </div>
                </div>
              </div>

               <div>
                <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    defaultValue={profile?.bio || ''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                   <label htmlFor="avatar_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Avatar URL
                  </label>
                  <div className="mt-2">
                    <input
                      type="url"
                      name="avatar_url"
                      id="avatar_url"
                      defaultValue={profile?.avatar_url || ''}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    />
                  </div>
                </div>
                 <div>
                    <label htmlFor="resume_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                     Resume URL
                   </label>
                   <div className="mt-2">
                     <input
                       type="url"
                       name="resume_url"
                       id="resume_url"
                       defaultValue={profile?.resume_url || ''}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                     />
                   </div>
                </div>
              </div>

              <div className="flex justify-end gap-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
        </form>
    )
}
