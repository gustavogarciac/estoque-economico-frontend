'use client'
import { faker } from '@faker-js/faker'
import { ChevronsUpDownIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

import { GetUserOrganizationResponse } from '@/http/get-user-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PopoverTrigger } from './ui/popover'

interface HeaderPopoverTriggerProps {
  organizations: GetUserOrganizationResponse[]
}

export const HeaderPopoverTrigger = ({
  organizations,
}: HeaderPopoverTriggerProps) => {
  const pathname = usePathname()
  const currentOrganization = organizations.find(
    (org) => org.id === pathname.split('/')[2],
  )

  return (
    <PopoverTrigger className="flex flex-row items-center gap-2 rounded-sm p-2 transition-colors duration-300 ease-in-out hover:bg-zinc-50/10">
      {currentOrganization ? (
        <div className="flex flex-row items-center gap-2">
          <Avatar className="max-h-[20px] max-w-[20px]">
            <AvatarImage
              src={currentOrganization.imageUrl ?? faker.image.avatarGitHub()}
            />
            <AvatarFallback>GG</AvatarFallback>
          </Avatar>

          <span className="text-sm font-semibold">
            {currentOrganization.name}
          </span>

          <ChevronsUpDownIcon className="size-4" />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm font-semibold">
            Selecione uma organização
          </span>

          <ChevronsUpDownIcon className="size-4" />
        </div>
      )}
    </PopoverTrigger>
  )
}
