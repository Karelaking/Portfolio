import React from 'react'
import { cn } from '@/lib';

export const Container = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }): React.ReactElement => {
  return (
    <section className='' id={id}>
      <div className={cn('mx-auto w-full max-w-5xl border-x border-dashed px-4 pt-8 pb-12 sm:px-6 sm:pt-16 lg:px-8', className)}>
      {children}
      </div>
    </section>
  )
}