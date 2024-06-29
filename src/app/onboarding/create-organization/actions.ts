'use server'

import { AxiosError } from 'axios'

import { createOrganization } from '@/http/create-organization'
import { onboardUser } from '@/http/onboard-user'

import { OrganizationFormValues } from './_components/new-organization-onboarding-form'

export async function onboardingCreateOrganizationAction(
  data: OrganizationFormValues,
) {
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

export async function onboardUserAction() {
  try {
    await onboardUser()

    return { success: true, message: null, errors: null, data: null }
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = err.response?.data

      return { success: false, message, errors: null, data: null }
    }
    return {
      success: false,
      message: 'Não foi possível concluir o onboarding do usuário.',
      errors: null,
      data: null,
    }
  }
}
