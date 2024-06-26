import { BellIcon, Container } from 'lucide-react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth/auth'

import { HeaderPopover } from './header-popover'
import { Button } from './ui/button'
import { UserMenu } from './user-menu'

export const Header = async () => {
  const { user } = await auth()

  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <header className="flex flex-col space-y-4 border-b">
      <div className="flex flex-row items-center justify-between bg-secondary/40 p-5">
        <div className="flex items-center gap-4">
          <Container className="size-8" />

          <span className="font-extrabold text-muted">/</span>

          <HeaderPopover />
        </div>

        <span className="hidden text-xs text-muted md:block">
          Developed with love by Gustavo Garcia.
        </span>

        <div className="flex items-center gap-4">
          <Button
            variant={'outline'}
            size="icon"
            className="max-h-[30px] max-w-[30px] rounded-full"
          >
            <span className="sr-only">Notificações</span>
            <BellIcon className="size-5" />
          </Button>

          {user ? <UserMenu user={user} /> : null}
        </div>
      </div>
    </header>
  )
}
