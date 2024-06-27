'use server'

import { SignUpFormSchemaType } from '@/app/auth/sign-up/_components/sign-up-form'
import { api } from '@/lib/axios'

export async function signUp(
  data: Pick<SignUpFormSchemaType, 'email' | 'name' | 'password'>,
) {
  await api.post('/users', {
    email: data.email,
    password: data.password,
    name: data.name,
  })
}
