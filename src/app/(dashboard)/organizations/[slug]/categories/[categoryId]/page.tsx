import { Metadata } from 'next'

import { Container } from '@/components/container'
import { getCategoryDetails } from '@/http/get-category-details'

import { CategoryDetailsForm } from './_components/category-details-form'

export const metadata: Metadata = {
  title: 'Detalhes da categoria',
  description: 'Detalhes da categoria selecionada',
}

const CategoryDetailsPage = async ({
  params,
}: {
  params: {
    categoryId: string
    slug: string
  }
}) => {
  const { slug, categoryId } = params
  const category = await getCategoryDetails({ categoryId, slug })

  return (
    <Container otherClasses="space-y-6">
      <CategoryDetailsForm category={category} orgSlug={slug} />
    </Container>
  )
}

export default CategoryDetailsPage
