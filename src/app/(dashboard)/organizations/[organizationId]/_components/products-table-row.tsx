import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { TableCell, TableRow } from '@/components/ui/table'

import { ProductDetailsDialog } from './product-details-dialog'

interface ProductsTableRowProps {
  product: Product
}

export const ProductsTableRow = ({ product }: ProductsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{product.code}</TableCell>
      <TableCell className="text-start">{product.stock}</TableCell>
      <TableCell>
        <span className="rounded-sm bg-muted px-2 py-1">
          {product.category}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(product.registeredAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">{product.author.name}</span>
      </TableCell>
      <TableCell>
        <ProductDetailsDialog product={product} />
      </TableCell>
    </TableRow>
  )
}
