import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (request) => {
  let cookieStore: CookiesFn | undefined

  // Verify if the code is running on the server
  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }

  const token = getCookie('token', { cookies: cookieStore })

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})
