import React, { PropsWithChildren } from 'react'

import { NavigationMenu } from '@/components/navigation-menu'

const OrganizationIdLayout = (props: PropsWithChildren) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <NavigationMenu />
      {props.children}
    </div>
  )
}

export default OrganizationIdLayout
