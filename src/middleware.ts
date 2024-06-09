import { getCookie } from 'cookies-next'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getUrl } from './utils/get-url'

export function middleware(request: NextRequest) {
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
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
