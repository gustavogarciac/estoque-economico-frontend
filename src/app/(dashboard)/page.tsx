import { Container } from '@/components/container'
import { SearchInput } from '@/components/search-input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fakeProductData } from '@/constants/fake-product-data'

import { ProductsTableRow } from './_components/products-table-row'

export default function Home() {
  return (
    <Container otherClasses="mt-5">
      <div className="flex flex-row gap-4">
        <SearchInput />
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
          {fakeProductData.map((product) => (
            <ProductsTableRow key={product.code} product={product} />
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
