'use server'

import { cookies } from 'next/headers'

import { SignInFormSchemaType } from '@/app/auth/sign-in/_components/sign-in-form'
import { api } from '@/lib/axios'

export async function signIn(data: SignInFormSchemaType) {
  const response = await api.post<{ token: string }>('/sessions/password', {
    email: data.email,
    password: data.password,
  })

  cookies().set('token', response.data.token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}
