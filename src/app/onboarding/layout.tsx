import { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Onboarding',
}

const OnboardingLayout = (props: PropsWithChildren) => {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  )
}

export default OnboardingLayout
