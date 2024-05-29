import { faker } from '@faker-js/faker'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="max-h-[30px] max-w-[30px]">
          <AvatarImage src={faker.image.avatarGitHub()} />
          <AvatarFallback>GG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
