'use server'

import { api } from '@/lib/axios'

interface OnboardUserResponse {
  message: string
}

export async function onboardUser() {
  const response = await api.patch<OnboardUserResponse>('/users/onboard', {
    onboarded: true,
  })

  return response.data
}
