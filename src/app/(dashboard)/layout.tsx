import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

const DashboardLayout = (props: PropsWithChildren) => {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="flex flex-col">
      <Header />
      {props.children}
    </div>
  )
}

export default DashboardLayout
