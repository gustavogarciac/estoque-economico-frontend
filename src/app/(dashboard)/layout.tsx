import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

import { isAuthenticated, verifyOnboard } from '@/auth/auth'
import { Header } from '@/components/header'

const DashboardLayout = async (props: PropsWithChildren) => {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  const userOnboarded = await verifyOnboard()
  if (!userOnboarded) {
    redirect('/onboarding')
  }

  return (
    <div className="flex flex-col">
      <Header />
      {props.children}
    </div>
  )
}

export default DashboardLayout
