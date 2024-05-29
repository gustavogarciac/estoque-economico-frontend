import React, { PropsWithChildren } from 'react'

import { Header } from '@/components/header'

const DashboardLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <Header />
      {props.children}
    </div>
  )
}

export default DashboardLayout
