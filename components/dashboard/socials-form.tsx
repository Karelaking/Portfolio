'use client'

import { createSocialLink, updateSocialLink } from '@/lib/actions/socials'
import { useState } from 'react'
import { BaseForm, FormGrid } from '@/components/ui/base-form'
import { FormField, FormInput, FormCheckbox } from '@/components/ui/form-field'

type SocialLink = {
  id: string
  platform: string
  url: string
  icon: string | null
  display_order: number | null
  is_active: boolean
}

export function SocialForm({ social }: { social?: SocialLink }) {
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
        <BaseForm
            title={social ? 'Edit Social Link' : 'Add Social Link'}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel={social ? 'Update' : 'Save'}
        >
            <FormField
                id="platform"
                label="Platform"
                required
            >
                <FormInput
                    id="platform"
                    name="platform"
                    required
                    placeholder="e.g. GitHub, LinkedIn, X"
                    defaultValue={social?.platform}
                />
            </FormField>

            <FormField
                id="url"
                label="URL"
                required
            >
                <FormInput
                    id="url"
                    name="url"
                    type="url"
                    required
                    defaultValue={social?.url}
                />
            </FormField>

            <FormGrid columns={2}>
                <FormField
                    id="icon"
                    label="Icon Name (Lucide)"
                    description="e.g. github, linkedin"
                >
                    <FormInput
                        id="icon"
                        name="icon"
                        placeholder="e.g. github, linkedin"
                        defaultValue={social?.icon || ''}
                    />
                </FormField>

                <FormField
                    id="display_order"
                    label="Display Order"
                >
                    <FormInput
                        id="display_order"
                        name="display_order"
                        type="number"
                        defaultValue={social?.display_order || 0}
                    />
                </FormField>
            </FormGrid>

            <FormCheckbox
                id="is_active"
                name="is_active"
                label="Active"
                description="Show this link on your profile."
                defaultChecked={social?.is_active ?? true}
            />
        </BaseForm>
    )
}
