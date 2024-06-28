'use server'

import { AxiosError } from 'axios'

import { createProduct } from '@/http/create-product'

import { ProductFormType } from './_components/new-product-form'

export async function createProductAction(
  orgSlug: string,
  data: ProductFormType,
) {
  try {
    await createProduct({
      orgSlug,
      data: {
        code: data.code,
        stock: Number(data.stock),
        categoryId: data.categoryId,
        description: data.description,
        name: data.name,
      },
    })

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = await err.response?.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Não foi possível criar o produto. Tente novamente mais tarde.',
      errors: null,
    }
  }
}
