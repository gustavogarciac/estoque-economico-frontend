'use server'

import { AxiosError } from 'axios'

import { updateCategory } from '@/http/update-category'

import { CategoryDetailsSchemaType } from './_components/category-details-form'

interface UpdateCategoryRequest {
  categoryId: string
  data: CategoryDetailsSchemaType
  slug: string
}

export async function updateCategoryAction({
  categoryId,
  data,
  slug,
}: UpdateCategoryRequest) {
  try {
    await updateCategory({ categoryId, data, orgSlug: slug })

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = err.response?.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Não foi possível atualizar a categoria.',
      errors: null,
    }
  }
}
