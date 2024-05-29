import { BellIcon, Container } from 'lucide-react'

import { HeaderPopover } from './header-popover'
import { NavigationMenu } from './navigation-menu'
import { Button } from './ui/button'
import { UserMenu } from './user-menu'

export const Header = () => {
  return (
    <header className="bg-secondary/40 flex flex-col space-y-6 px-5 pt-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Container className="size-8" />

          <span className="text-muted font-extrabold">/</span>

          <HeaderPopover />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={'outline'}
            size="icon"
            className="max-h-[30px] max-w-[30px] rounded-full"
          >
            <span className="sr-only">Notificações</span>
            <BellIcon className="size-5" />
          </Button>

          <UserMenu />
        </div>
      </div>

      <NavigationMenu />
    </header>
  )
}
