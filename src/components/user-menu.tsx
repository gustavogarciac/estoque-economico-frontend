import { faker } from '@faker-js/faker'
import Link from 'next/link'

import { SignOutButton } from './sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ThemeSwitcher } from './ui/theme-switcher'

interface UserMenuProps {
  user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { email, name } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="max-h-[30px] max-w-[30px]">
          <AvatarImage src={faker.image.avatarGitHub()} />
          <AvatarFallback>GG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <div className="flex flex-row items-center gap-3 p-2">
            <Avatar className="max-h-[30px] max-w-[30px]">
              <AvatarImage src={faker.image.avatarGitHub()} />
              <AvatarFallback>
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="text-sm">
              Acessar meu perfíl
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/new-organization" className="text-sm">
              Nova organização
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="flex w-full cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none">
          <span>Tema</span>
          <ThemeSwitcher buttonClasses="hover:bg-muted" />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
