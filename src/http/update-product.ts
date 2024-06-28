import { api } from '@/lib/axios'

interface UpdateProductRequest {
  orgSlug: string
  data: {
    stock: number
    code: string
    name: string | undefined
    description: string | undefined
    categoryId: string
    id: string
  }
}

export async function updateProduct({ orgSlug, data }: UpdateProductRequest) {
  const result = await api.put(
    `/organizations/${orgSlug}/products/${data.id}`,
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
