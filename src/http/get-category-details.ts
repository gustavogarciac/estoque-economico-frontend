'use server'

import { api } from '@/lib/axios'

interface GetCategoryDetailsRequest {
  categoryId: string
  slug: string
}

export async function getCategoryDetails({
  categoryId,
  slug,
}: GetCategoryDetailsRequest) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await api.get<CategoryWithProducts>(
    `/organizations/${slug}/categories/${categoryId}`,
  )

  return response.data
}
