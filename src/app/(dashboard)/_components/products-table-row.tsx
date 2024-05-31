import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Ellipsis } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ProductData } from '@/constants/fake-product-data'

interface ProductsTableRowProps {
  product: ProductData
}

export const ProductsTableRow = ({
  product: { code, quantity, category, registeredAt, author, description },
}: ProductsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{code}</TableCell>
      <TableCell className="text-start">{quantity}</TableCell>
      <TableCell>
        <span className="rounded-sm bg-muted px-2 py-1">{category}</span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(registeredAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">{author}</span>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <span className="sr-only">Detalhes do produto</span>
              <Ellipsis className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do produto</DialogTitle>
              <p className="text-muted-foreground">{description}</p>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
