import { api } from '@/lib/axios'

interface CreateProductRequest {
  orgSlug: string
  data: {
    stock: number
    code: string
    name: string | undefined
    description: string | undefined
    categoryId: string
  }
}

interface CreateProductResponse {
  organizationId: string
}

export async function createProduct({ orgSlug, data }: CreateProductRequest) {
  const result = await api.post<CreateProductResponse>(
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
