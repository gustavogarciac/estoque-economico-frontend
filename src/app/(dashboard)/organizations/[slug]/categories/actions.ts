'use server'

import { AxiosError } from 'axios'

import { createCategory } from '@/http/create-category'

import { NewCategorySchemaType } from './_components/new-category-dialog'

interface CreateCategoryActionProps {
  orgSlug: string
  data: NewCategorySchemaType
}

export async function createCategoryAction({
  orgSlug,
  data,
}: CreateCategoryActionProps) {
  try {
    await createCategory({ orgSlug, data })

    return { success: true, errors: null, message: null }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = await error.response?.data

      return { success: false, errors: null, message }
    }

    return {
      success: false,
      errors: null,
      message:
        'Ocorreu um erro ao criar a categoria. Tente novamente mais tarde.',
    }
  }
}
