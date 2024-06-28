'use server'

import { api } from '@/lib/axios'

export async function getOrganizationCategories(slug: string) {
  const response = await api.get<Category[]>(
    `/organizations/${slug}/categories`,
  )

  return response.data
}
