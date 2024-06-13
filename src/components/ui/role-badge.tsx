import React from 'react'

import { Badge } from './badge'

interface RoleBadgeProps {
  role: 'ADMIN' | 'BILLING' | 'MEMBER'
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  let formattedRole

  switch (role) {
    case 'ADMIN':
      formattedRole = 'Administrador'
      break
    case 'BILLING':
      formattedRole = 'Financeiro'
      break
    case 'MEMBER':
      formattedRole = 'Membro'
      break
  }

  return <Badge className="uppercase">{formattedRole}</Badge>
}
