import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-user-info'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentOrg() {
  return cookies().get('org')?.value
}

export async function verifyOnboard() {
  const user = await getProfile()

  return user.onboarded
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile()

    return { user }
  } catch (error) {}

  redirect('/api/auth/sign-out')
}
