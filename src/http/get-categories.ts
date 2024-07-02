'use server'

import { api } from '@/lib/axios'

interface GetOrganizationCategoriesRequest {
  slug: string
  name?: string
}

export async function getOrganizationCategories({
  slug,
  name,
}: GetOrganizationCategoriesRequest) {
  let baseUrl = `/organizations/${slug}/categories`

  if (name) {
    baseUrl += `?name=${name}`
  }

  const response = await api.get<Category[]>(baseUrl)

  return response.data
}
