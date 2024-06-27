'use server'

import { AxiosError } from 'axios'

import { createOrganization } from '@/http/create-organization'

import { OrganizationFormValues } from './_components/new-organization-form'

export async function createOrganizationAction(data: OrganizationFormValues) {
  try {
    const response = await createOrganization({
      name: data.name,
      domain: data.domain,
      shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
      description: data.description,
      imageUrl: data.imageUrl,
    })

    return { success: true, message: null, errors: null, data: response }
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = await err.response?.data

      return { success: false, message, errors: null, data: null }
    }

    return {
      success: false,
      message:
        'Não foi possível criar a organização. Tente novamente mais tarde.',
      errors: null,
      data: null,
    }
  }
}
