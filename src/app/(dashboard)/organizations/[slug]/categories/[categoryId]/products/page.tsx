import { Container } from '@/components/container'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCategoryDetails } from '@/http/get-category-details'

import { CategoryProductsTableRow } from './_components/category-products-table-row'

interface CategoryIdProductsPageProps {
  params: { categoryId: string; slug: string }
}

export default async function CategoryIdProductsPage({
  params,
}: CategoryIdProductsPageProps) {
  const { categoryId, slug } = params
  const category = await getCategoryDetails({
    categoryId,
    slug,
  })
  const products = category.products

  return (
    <Container otherClasses="mt-5">
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Código</TableHead>
            <TableHead className="w-32">Quantidade</TableHead>
            <TableHead className="w-36">Categoria</TableHead>
            <TableHead className="w-36">Registrado em</TableHead>
            <TableHead className="w-36">Autor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <CategoryProductsTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
