import React from 'react'

import { Container } from '@/components/container'
import { Card } from '@/components/ui/card'
import { getOrganizationCategories } from '@/http/get-categories'

import { CategoryCard } from './_components/category-card'
import { NewCategoryDialog } from './_components/new-category-dialog'
import { SearchCategoryInput } from './_components/search-category-input'

const CategoriesPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const categories = await getOrganizationCategories(slug)

  return (
    <Container>
      <div className="mt-5 flex flex-row items-center justify-between gap-2">
        <SearchCategoryInput />
        <NewCategoryDialog orgSlug={slug} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <Card className="flex min-h-[200px] items-center justify-center border-dashed">
          <NewCategoryDialog
            orgSlug={slug}
            cardTrigger
            triggerClasses="w-full h-full"
          />
        </Card>
      </div>
    </Container>
  )
}

export default CategoriesPage
