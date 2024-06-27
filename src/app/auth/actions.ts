'use server'

import { AxiosError } from 'axios'

import { signIn } from '@/http/sign-in'
import { signUp } from '@/http/sign-up'

import { SignInFormSchemaType } from './sign-in/_components/sign-in-form'
import { SignUpFormSchemaType } from './sign-up/_components/sign-up-form'

export async function signInAction(data: SignInFormSchemaType) {
  try {
    await signIn(data)
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = await err.response?.data

      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Unexpected error occured. Try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

export async function signUpAction(data: SignUpFormSchemaType) {
  try {
    await signUp({
      email: data.email,
      name: data.name,
      password: data.password,
    })
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = await err.response?.data

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error occured. Try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
