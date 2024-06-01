'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

interface NavigationMenuItemProps {
  item: {
    label: string
    path: string
  }
}

export const NavigationMenuItem = ({ item }: NavigationMenuItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === item.path

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      className={cn(
        'duration-400 bg-secondary/40 transition-all ease-linear md:bg-transparent',
        isActive &&
          'rounded-b-none border-b-2 border-primary hover:bg-transparent',
      )}
      asChild
    >
      <Link href={item.path}>{item.label}</Link>
    </Button>
  )
}
