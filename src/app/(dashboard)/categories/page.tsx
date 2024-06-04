import { faker } from '@faker-js/faker'
import React from 'react'

import { Container } from '@/components/container'

import { CategoryCard } from './_components/category-card'
import { NewCategoryDialog } from './_components/new-category-dialog'
import { SearchCategoryInput } from './_components/search-category-input'

async function fetchCategories() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const categories: Category[] = Array.from({ length: 5 }, () => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.urlPicsumPhotos(),
    }
  })

  return categories
}

const CategoriesPage = async () => {
  const categories = await fetchCategories()

  return (
    <Container>
      <div className="mt-5 flex flex-row items-center justify-between gap-2">
        <SearchCategoryInput />
        <NewCategoryDialog />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Container>
  )
}

export default CategoriesPage
