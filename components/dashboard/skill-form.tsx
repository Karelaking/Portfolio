'use client'

import { createSkill, updateSkill } from '@/lib/actions/skills'
import { useState } from 'react'
import { BaseForm, FormGrid } from '@/components/ui/base-form'
import { FormField, FormInput } from '@/components/ui/form-field'

type Skill = {
  id: string
  name: string
  category: string | null
  icon: string | null
  proficiency: number | null
  display_order: number | null
}

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend', 
  'Mobile',
  'DevOps',
  'Database',
  'Tools',
  'Design',
  'Soft Skills',
  'Other'
]

export function SkillForm({ skill }: { skill?: Skill }) {
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
        <BaseForm
            title={skill ? 'Edit Skill' : 'Add Skill'}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel={skill ? 'Update' : 'Save'}
        >
            <FormField
                id="name"
                label="Name"
                required
            >
                <FormInput
                    id="name"
                    name="name"
                    required
                    defaultValue={skill?.name}
                />
            </FormField>

            <FormGrid columns={2}>
                <FormField
                    id="category"
                    label="Category"
                    description="Select or type a category"
                >
                    <FormInput
                        id="category"
                        name="category"
                        list="category-options"
                        defaultValue={skill?.category || 'Frontend'}
                    />
                    <datalist id="category-options">
                        {SKILL_CATEGORIES.map(cat => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                </FormField>

                <FormField
                    id="proficiency"
                    label="Proficiency (0-100)"
                >
                    <FormInput
                        id="proficiency"
                        name="proficiency"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={skill?.proficiency || 80}
                    />
                </FormField>
            </FormGrid>

            <FormGrid columns={2}>
                <FormField
                    id="icon"
                    label="Icon Name (Lucide/SimpleIcons)"
                    description="e.g. react, nodejs"
                >
                    <FormInput
                        id="icon"
                        name="icon"
                        placeholder="e.g. react, nodejs"
                        defaultValue={skill?.icon || ''}
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
                        defaultValue={skill?.display_order || 0}
                    />
                </FormField>
            </FormGrid>
        </BaseForm>
    )
}
