import React from 'react'

import { Container } from '@/components/container'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/axios'

import { CategoryCard } from './_components/category-card'
import { NewCategoryDialog } from './_components/new-category-dialog'
import { SearchCategoryInput } from './_components/search-category-input'

async function fetchCategories(organizationId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const categories = await api.get<Category[]>(
    `/organizations/${organizationId}/categories`,
  )

  return categories.data
}

const CategoriesPage = async ({
  params,
}: {
  params: { organizationId: string }
}) => {
  const categories = await fetchCategories(params.organizationId)

  return (
    <Container>
      <div className="mt-5 flex flex-row items-center justify-between gap-2">
        <SearchCategoryInput />
        <NewCategoryDialog organizationId={params.organizationId} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}

        <Card className="flex min-h-[200px] items-center justify-center border-dashed">
          <NewCategoryDialog
            organizationId={params.organizationId}
            cardTrigger
            triggerClasses="w-full h-full"
          />
        </Card>
      </div>
    </Container>
  )
}

export default CategoriesPage
