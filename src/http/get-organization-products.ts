'use server'

import { api } from '@/lib/axios'

export interface GetOrganizationProductsResponse {
  products: Product[]
}

export async function getOrganizationProducts(slug: string) {
  const response = await api.get<GetOrganizationProductsResponse>(
    `/organizations/${slug}/products`,
  )

  return response.data
}
