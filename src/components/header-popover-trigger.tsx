'use client'
import { ChevronsUpDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { GetUserOrganizationResponse } from '@/http/get-user-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PopoverTrigger } from './ui/popover'

export const HeaderPopoverTrigger = ({
  organizations,
}: {
  organizations: GetUserOrganizationResponse[]
}) => {
  const pathname = usePathname()
  const slug = pathname.split('/')[2]

  const currentOrganization = organizations.find((org) => org.slug === slug)

  return (
    <PopoverTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
      {currentOrganization ? (
        <>
          <Avatar className="mr-2 size-4">
            {currentOrganization.imageUrl && (
              <AvatarImage src={currentOrganization.imageUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <span className="truncate text-left">{currentOrganization.name}</span>
        </>
      ) : (
        <span className="text-muted-foreground">Selecionar organização</span>
      )}
      <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
    </PopoverTrigger>
  )
}
