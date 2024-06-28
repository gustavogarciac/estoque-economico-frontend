import { api } from '@/lib/axios'

interface CreateOrganizationRequest {
  orgSlug: string
  data: {
    stock: number
    code: string
    name: string | undefined
    description: string | undefined
    categoryId: string
  }
}

interface CreateOrganizationResponse {
  organizationId: string
}

export async function createProduct({
  orgSlug,
  data,
}: CreateOrganizationRequest) {
  const result = await api.post<CreateOrganizationResponse>(
    `/organizations/${orgSlug}/products`,
    {
      stock: data.stock,
      name: data.name,
      description: data.description,
      code: data.code,
      categoryId: data.categoryId,
    },
  )

  return result.data
}
