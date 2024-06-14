'use client'

import { faker } from '@faker-js/faker'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { GetUserOrganizationResponse } from '@/actions/get-user-organizations'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface OrganizationPopoverItemProps {
  organization: GetUserOrganizationResponse
}

export const OrganizationPopoverItem = ({
  organization,
}: OrganizationPopoverItemProps) => {
  const pathname = usePathname()

  const isActive = pathname.includes(`/organizations/${organization.id}`)

  return (
    <Link
      href={`/organizations/${organization.id}`}
      key={organization.id}
      className={cn(
        'flex flex-row items-center gap-2 border border-border p-3 hover:bg-muted/40',
        isActive && 'bg-muted hover:bg-muted',
      )}
    >
      <Avatar className="max-h-[15px] max-w-[15px]">
        <AvatarImage
          src={organization.imageUrl ?? faker.image.avatarGitHub()}
        />
        <AvatarFallback>{organization.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <span className="text-xs font-semibold">{organization.name}</span>
    </Link>
  )
}
