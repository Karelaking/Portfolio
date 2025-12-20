'use client'

import { updateProfile } from '@/lib/actions/profile'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BaseForm, FormGrid } from '@/components/ui/base-form'
import { FormField, FormInput, FormTextarea } from '@/components/ui/form-field'

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
        <BaseForm
            title="Profile Settings"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Save Profile"
            showCancelButton={false}
        >
            <FormGrid columns={2}>
                <FormField
                    id="full_name"
                    label="Full Name"
                >
                    <FormInput
                        id="full_name"
                        name="full_name"
                        defaultValue={profile?.full_name || ''}
                    />
                </FormField>

                <FormField
                    id="email"
                    label="Email"
                >
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={profile?.email || ''}
                    />
                </FormField>
            </FormGrid>

            <FormField
                id="bio"
                label="Bio"
            >
                <FormTextarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={profile?.bio || ''}
                />
            </FormField>

            <FormGrid columns={2}>
                <FormField
                    id="avatar_url"
                    label="Avatar URL"
                >
                    <FormInput
                        id="avatar_url"
                        name="avatar_url"
                        type="url"
                        defaultValue={profile?.avatar_url || ''}
                    />
                </FormField>

                <FormField
                    id="resume_url"
                    label="Resume URL"
                >
                    <FormInput
                        id="resume_url"
                        name="resume_url"
                        type="url"
                        defaultValue={profile?.resume_url || ''}
                    />
                </FormField>
            </FormGrid>
        </BaseForm>
    )
}
