import { api } from '@/lib/axios'

interface CreateCategoryRequest {
  orgSlug: string
  data: {
    name: string
    description: string
    imageUrl: string
  }
}

interface CreateCategoryResponse {
  organizationId: string
}

export async function createCategory({ orgSlug, data }: CreateCategoryRequest) {
  const result = await api.post<CreateCategoryResponse>(
    `/organizations/${orgSlug}/categories`,
    {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
    },
  )

  return result.data
}
