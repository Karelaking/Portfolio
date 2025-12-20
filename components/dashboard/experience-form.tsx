'use client'

import { createExperience, updateExperience } from '@/lib/actions/experience'
import { useState } from 'react'
import { BaseForm, FormGrid } from '@/components/ui/base-form'
import { FormField, FormInput, FormTextarea } from '@/components/ui/form-field'

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
        <BaseForm
            title={experience ? 'Edit Experience' : 'Add Experience'}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel={experience ? 'Update' : 'Save'}
        >
            <FormGrid columns={2}>
                <FormField
                    id="company"
                    label="Company"
                    required
                >
                    <FormInput
                        id="company"
                        name="company"
                        required
                        defaultValue={experience?.company}
                    />
                </FormField>

                <FormField
                    id="role"
                    label="Role"
                    required
                >
                    <FormInput
                        id="role"
                        name="role"
                        required
                        defaultValue={experience?.role}
                    />
                </FormField>
            </FormGrid>

            <FormGrid columns={2}>
                <FormField
                    id="start_date"
                    label="Start Date"
                    required
                >
                    <FormInput
                        id="start_date"
                        name="start_date"
                        type="date"
                        required
                        defaultValue={experience?.start_date}
                    />
                </FormField>

                <FormField
                    id="end_date"
                    label="End Date (Leave blank for Present)"
                >
                    <FormInput
                        id="end_date"
                        name="end_date"
                        type="date"
                        defaultValue={experience?.end_date || ''}
                    />
                </FormField>
            </FormGrid>

            <FormField
                id="description"
                label="Description"
            >
                <FormTextarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={experience?.description || ''}
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
                    defaultValue={experience?.display_order || 0}
                />
            </FormField>
        </BaseForm>
    )
}
