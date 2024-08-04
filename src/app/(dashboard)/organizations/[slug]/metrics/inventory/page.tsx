import React from 'react'

import { Container } from '@/components/container'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrganizationCategories } from '@/http/get-categories'
import { getInventoryMetrics } from '@/http/get-inventory-metrics'

import { EmptyRow } from '../../_components/empty-row'
import { Filters } from './_components/filter'
import { ProductsTableRow } from './_components/product-table-row'

const InventoryMetricsPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params

  const { products } = await getInventoryMetrics({ slug })
  const categories = await getOrganizationCategories({ slug })

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Inventário de produtos</h1>

      <div className="my-4">
        <Filters slug={slug} categories={categories} />
      </div>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Código</TableHead>
            <TableHead className="w-36">Quantidade</TableHead>
            <TableHead className="flex-1">Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              orgSlug={slug}
            />
          ))}

          {products.length < 1 && <EmptyRow />}
        </TableBody>
      </Table>
    </Container>
  )
}

export default InventoryMetricsPage
