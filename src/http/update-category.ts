import { CategoryDetailsSchemaType } from '@/app/(dashboard)/organizations/[slug]/categories/[categoryId]/_components/category-details-form'
import { api } from '@/lib/axios'

interface UpdateCategoryRequest {
  orgSlug: string
  data: CategoryDetailsSchemaType
  categoryId: string
}

export async function updateCategory({
  orgSlug,
  data,
  categoryId,
}: UpdateCategoryRequest) {
  await api.put(`/organizations/${orgSlug}/categories/${categoryId}`, {
    name: data.name,
    description: data.description,
    imageUrl: data.imageUrl,
  })
}
