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
import { api } from '@/lib/axios'

import { NewProductDialog } from './_components/new-product-dialog'
import { ProductsTableRow } from './_components/products-table-row'

interface FetchProductResponse {
  products: Product[]
}

async function fetchProducts(organizationId: string) {
  const products = await api.get<FetchProductResponse>(
    `/organizations/${organizationId}/products`,
  )

  return products.data
}

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string }
}) => {
  const { products } = await fetchProducts(params.organizationId)

  return (
    <Container otherClasses="mt-5">
      <div className="flex flex-row gap-2">
        <SearchInput />
        <NewProductDialog organizationId={params.organizationId} />
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
            <ProductsTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default OrganizationIdPage
