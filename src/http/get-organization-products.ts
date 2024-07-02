'use server'

import { api } from '@/lib/axios'

interface GetOrganizationProductsRequest {
  slug: string
  searchParams: { code?: string; name?: string }
}

interface GetOrganizationProductsResponse {
  products: Product[]
}

export async function getOrganizationProducts({
  slug,
  searchParams,
}: GetOrganizationProductsRequest) {
  let baseUrl = `/organizations/${slug}/products`
  if (searchParams.code) {
    baseUrl += `?code=${searchParams.code}`
  }

  if (searchParams.name) {
    baseUrl += `?name=${searchParams.name}`
  }

  const response = await api.get<GetOrganizationProductsResponse>(baseUrl)

  return response.data
}
