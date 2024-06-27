import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

import { isAuthenticated } from '@/auth/auth'

const AuthLayout = (props: PropsWithChildren) => {
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      {props.children}
    </div>
  )
}

export default AuthLayout
