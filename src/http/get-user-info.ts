import { api } from '@/lib/axios'

export async function getProfile() {
  const result = await api.get<User>('/users/details')

  return result.data
}
