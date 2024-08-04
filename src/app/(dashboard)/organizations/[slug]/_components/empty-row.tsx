import React from 'react'

import { TableCell, TableRow } from '@/components/ui/table'

export const EmptyRow = () => {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground" colSpan={6}>
        <div className="flex min-h-56 items-center justify-center rounded-b-lg">
          <span>Ainda não há nenhum produto cadastrado.</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
