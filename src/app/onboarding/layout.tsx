import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

import { isAuthenticated, verifyOnboard } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Onboarding',
}

const OnboardingLayout = async (props: PropsWithChildren) => {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  const isUserAlreadyOnboarded = await verifyOnboard()
  if (isUserAlreadyOnboarded) redirect('/')

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  )
}

export default OnboardingLayout
