import React, { PropsWithChildren } from 'react'

const AuthLayout = (props: PropsWithChildren) => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      {props.children}
    </div>
  )
}

export default AuthLayout
