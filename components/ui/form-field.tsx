import * as React from "react"

import { cn } from "@/lib/utils"

export interface FormFieldProps {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
  description?: string
  error?: string
}

export function FormField({ label, id, required, children, description, error }: FormFieldProps) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className={cn(
          "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100",
          error && "text-red-600 dark:text-red-400"
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        {children}
      </div>
      {description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
}

export function FormInput({ id, className, ...props }: FormInputProps) {
  return (
    <input
      id={id}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700",
        className
      )}
      {...props}
    />
  )
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
}

export function FormTextarea({ id, className, ...props }: FormTextareaProps) {
  return (
    <textarea
      id={id}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700",
        className
      )}
      {...props}
    />
  )
}

export interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  description?: string
}

export function FormCheckbox({ id, label, description, className, ...props }: FormCheckboxProps) {
  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id={id}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800",
            className
          )}
          {...props}
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-100">
          {label}
        </label>
        {description && (
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  )
}