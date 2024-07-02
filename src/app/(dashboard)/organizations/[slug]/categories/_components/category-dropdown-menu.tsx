'use client'

import {
  BarChartBigIcon,
  BarcodeIcon,
  CircleEllipsis,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CategoryDropdownMenuProps {
  category: Category
  orgSlug: string
}

export const CategoryDropdownMenu = ({
  category,
  orgSlug,
}: CategoryDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant={'ghost'} className="w-fit px-3 py-2">
          <CircleEllipsis className="size-5" />
          <span className="sr-only">Opções da categoria {category.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/organizations/${orgSlug}/categories/${category.id}`}>
              <EyeIcon className="mr-2 size-4" />
              <span>Detalhes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilIcon className="mr-2 size-4" />
            <span>Editar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BarChartBigIcon className="mr-2 size-4" />
            <span>Métricas</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BarcodeIcon className="mr-2 size-4" />
            <span>Registros</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="duration-400 transition-colors ease-in-out focus:bg-destructive">
          <TrashIcon className="mr-2 size-4" />
          <span className="">Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
