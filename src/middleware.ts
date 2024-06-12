import { getCookie } from 'cookies-next'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { api } from './lib/axios'
import { getUrl } from './utils/get-url'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = getCookie('token', {
    req: request,
  })

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/')))
  }

  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/sign-in')))
  }

  if (pathname === '/onboarding' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/sign-in')))
  }

  async function getUser() {
    const response = await api.get<User>('/users/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  }

  const user = token ? await getUser() : null

  if (user?.member_on.length === 0 && pathname !== '/onboarding') {
    return NextResponse.redirect(new URL(getUrl('/onboarding')))
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
