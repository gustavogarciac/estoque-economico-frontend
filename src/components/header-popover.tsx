import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { GetUserOrganizationResponse } from '@/actions/get-user-organizations'

import { HeaderPopoverTrigger } from './header-popover-trigger'
import { OrganizationPopoverItem } from './organization-popover-item'
import { Button } from './ui/button'
import { Popover, PopoverContent } from './ui/popover'

interface HeaderPopoverProps {
  organizations: GetUserOrganizationResponse[]
}

export const HeaderPopover = ({ organizations }: HeaderPopoverProps) => {
  return (
    <Popover>
      <HeaderPopoverTrigger organizations={organizations} />

      <PopoverContent align="start" className="p-0">
        <p className="border-b p-3 text-xs uppercase text-muted-foreground">
          Organizações:
        </p>

        <div className="flex flex-col">
          {organizations.map((organization) => (
            <OrganizationPopoverItem
              key={organization.id}
              organization={organization}
            />
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
