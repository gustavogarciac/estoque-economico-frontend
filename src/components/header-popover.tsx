import { faker } from '@faker-js/faker'
import { ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

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

      <PopoverContent align="start" className="p-0">
        <p className="border-b p-3 text-xs uppercase text-muted-foreground">
          Organizações:
        </p>

        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-2 border border-border p-3 hover:bg-muted/40"
            >
              <Avatar className="max-h-[15px] max-w-[15px]">
                <AvatarImage src={image} />
                <AvatarFallback>GG</AvatarFallback>
              </Avatar>

              <span className="text-xs font-semibold">
                {faker.company.name()}
              </span>
            </div>
          ))}

          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start gap-2 rounded-t-none rounded-br-none p-3"
            asChild
          >
            <Link href="/organizations/new">
              <PlusCircleIcon className="size-4 text-primary" />
              <span className="text-xs font-semibold">Criar organização</span>
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
