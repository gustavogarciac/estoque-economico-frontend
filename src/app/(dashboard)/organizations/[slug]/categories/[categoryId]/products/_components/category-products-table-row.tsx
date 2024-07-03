import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { TableCell, TableRow } from '@/components/ui/table'

interface CategoryProductsTableRowProps {
  product: {
    id: string
    name: string
    code: string
    stock: number
    userId: string
    description: string
    createdAt: Date
    registered_by: {
      name: string
    }
  }
}

export const CategoryProductsTableRow = ({
  product,
}: CategoryProductsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{product.code}</TableCell>
      <TableCell className="text-start">{product.stock}</TableCell>
      <TableCell>
        <span className="rounded-sm bg-muted px-2 py-1">{product.name}</span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(product.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {product.registered_by.name}
        </span>
      </TableCell>
    </TableRow>
  )
}
