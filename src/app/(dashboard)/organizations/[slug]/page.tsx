import { redirect } from 'next/navigation'
import React from 'react'

import { Container } from '@/components/container'
import { SearchInput } from '@/components/search-input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrganizationProducts } from '@/http/get-organization-products'

import { NewProductDialog } from './_components/new-product-dialog'
import { ProductsTableRow } from './_components/products-table-row'

const OrganizationSlugPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params
  const { products } = await getOrganizationProducts(slug)

  if (!slug) redirect('/')

  return (
    <Container otherClasses="mt-5">
      <div className="flex flex-row gap-2">
        <SearchInput />
        <NewProductDialog orgSlug={slug} />
      </div>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Código</TableHead>
            <TableHead className="w-32">Quantidade</TableHead>
            <TableHead className="w-36">Categoria</TableHead>
            <TableHead className="w-36">Registrado em</TableHead>
            <TableHead className="w-36">Autor</TableHead>
            <TableHead className="w-16"></TableHead>
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
        </TableBody>
      </Table>
    </Container>
  )
}

export default OrganizationSlugPage
