'use server'

import { cookies } from 'next/headers'

import { api } from '@/lib/axios'

export interface GetUserOrganizationResponse {
  id: string
  name: string
  domain: string | null
  imageUrl: string | null
  role: 'ADMIN' | 'BILLING' | 'MEMBER'
}

export async function getUserOrganizations() {
  const token = cookies().get('token')

  if (!token?.value) return null

  const response = await api.get<GetUserOrganizationResponse[]>(
    '/users/organizations',
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    },
  )

  return response.data
}
