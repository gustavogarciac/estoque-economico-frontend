import { cookies } from 'next/headers'

import { api } from '@/lib/axios'

export async function getUserInfo() {
  const token = cookies().get('token')

  if (!token?.value) return null

  const response = await api.get<User>('/users/details', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  return response.data
}
