import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface BaseFormProps {
  title?: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> // eslint-disable-line no-unused-vars
  isLoading?: boolean
  submitLabel?: string
  cancelLabel?: string
  showCancelButton?: boolean
  className?: string
}

export function BaseForm({ 
  title,
  children, 
  onSubmit, 
  isLoading = false, 
  submitLabel = "Save",
  cancelLabel = "Cancel",
  showCancelButton = true,
  className 
}: BaseFormProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {title && (
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
      )}
      
      <form 
        onSubmit={onSubmit} 
        className={cn(
          "space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
          className
        )}
      >
        {children}
        
        <div className="flex justify-end gap-x-4">
          {showCancelButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}

export interface FormGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function FormGrid({ children, columns = 1, className }: FormGridProps) {
  const gridClass = {
    1: "grid grid-cols-1 gap-6",
    2: "grid grid-cols-1 gap-6 sm:grid-cols-2",
    3: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
  }
  
  return (
    <div className={cn(gridClass[columns], className)}>
      {children}
    </div>
  )
}