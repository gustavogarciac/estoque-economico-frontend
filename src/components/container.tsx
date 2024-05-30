import React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  otherClasses?: string
  children: React.ReactNode
}

export const Container = ({ otherClasses, children }: ContainerProps) => {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 lg:px-0', otherClasses)}>
      {children}
    </div>
  )
}
