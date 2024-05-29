import { faker } from '@faker-js/faker'
import { ChevronsUpDownIcon } from 'lucide-react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverTrigger } from './ui/popover'

export const HeaderPopover = () => {
  const image = faker.image.avatarGitHub()
  const enterprise = faker.company.name()

  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-2 rounded-sm p-2 transition-colors duration-300 ease-in-out hover:bg-zinc-50/10">
        <Avatar className="max-h-[20px] max-w-[20px]">
          <AvatarImage src={image} />
          <AvatarFallback>GG</AvatarFallback>
        </Avatar>

        <span className="text-sm font-semibold">{enterprise}</span>

        <ChevronsUpDownIcon className="size-4" />
      </PopoverTrigger>
    </Popover>
  )
}
