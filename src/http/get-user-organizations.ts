'use server'

import { api } from '@/lib/axios'

export interface GetUserOrganizationResponse {
  id: string
  name: string
  slug: string
  domain: string | null
  imageUrl: string | null
  role: 'ADMIN' | 'BILLING' | 'MEMBER'
}

export async function getUserOrganizations() {
  const response = await api.get<GetUserOrganizationResponse[]>(
    '/users/organizations',
  )

  return response.data
}
