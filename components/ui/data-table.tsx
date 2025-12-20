import * as React from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode // eslint-disable-line no-unused-vars, @typescript-eslint/no-explicit-any
  className?: string
}

export interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  editHref?: (item: T) => string // eslint-disable-line no-unused-vars
  onDelete?: (item: T) => void // eslint-disable-line no-unused-vars
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  editHref,
  onDelete,
  emptyMessage = "No items found.",
  className
}: TableProps<T>) {
  const handleDelete = async (item: T) => {
    if (onDelete && confirm('Are you sure you want to delete this item?')) {
      await onDelete(item)
    }
  }

  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-800", className)}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn(
                  "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400",
                  column.className
                )}
              >
                {column.label}
              </th>
            ))}
            {(editHref || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={cn(
                    "whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400",
                    column.key === columns[0].key && "font-medium text-gray-900 dark:text-white",
                    column.className
                  )}
                >
                  {column.render 
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')
                  }
                </td>
              ))}
              {(editHref || onDelete) && (
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {editHref && (
                      <Link
                        href={editHref(item)}
                        className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export interface ListPageProps<T> {
  title: string
  data: T[]
  columns: Column<T>[]
  editHref?: (item: T) => string // eslint-disable-line no-unused-vars
  onDelete?: (item: T) => void // eslint-disable-line no-unused-vars
  newHref?: string
  newButtonLabel?: string
  emptyMessage?: string
  className?: string
}

export function ListPage<T extends { id: string }>({
  title,
  data,
  columns,
  editHref,
  onDelete,
  newHref,
  newButtonLabel,
  emptyMessage,
  className
}: ListPageProps<T>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        {newHref && (
          <Link href={newHref}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {newButtonLabel || `Add ${title}`}
            </Button>
          </Link>
        )}
      </div>

      <DataTable
        data={data}
        columns={columns}
        editHref={editHref}
        onDelete={onDelete}
        emptyMessage={emptyMessage}
        className={className}
      />
    </div>
  )
}