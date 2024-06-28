'use server'

import { AxiosError } from 'axios'

import { createProduct } from '@/http/create-product'
import { updateProduct } from '@/http/update-product'

import { DetailsFormSchemaType } from './_components/product-details-form'

interface DetailsFormSchemaTypeWithProductId extends DetailsFormSchemaType {
  id: string
}

export async function createProductAction(
  orgSlug: string,
  data: DetailsFormSchemaTypeWithProductId,
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

export async function updateProductAction(
  orgSlug: string,
  data: DetailsFormSchemaTypeWithProductId,
) {
  try {
    await updateProduct({
      orgSlug,
      data: {
        code: data.code,
        stock: Number(data.stock),
        categoryId: data.categoryId,
        description: data.description,
        name: data.name,
        id: data.id,
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
      message:
        'Não foi possível atualizar o produto. Tente novamente mais tarde.',
      errors: null,
    }
  }
}
