import { TableCell, TableRow } from '@/components/ui/table'

interface ProductsTableRowProps {
  product: { code: string; name: string; stock: number; id: string }
  orgSlug: string
}

export const ProductsTableRow = ({ product }: ProductsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{product.code}</TableCell>
      <TableCell className="text-start">{product.stock}</TableCell>
      <TableCell>
        <span className="rounded-sm bg-muted px-2 py-1">{product.name}</span>
      </TableCell>
    </TableRow>
  )
}
