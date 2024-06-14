'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { Container } from './container'
import { NavigationMenuItem } from './navigation-menu-item'

export const NavigationMenu = () => {
  const pathname = usePathname()
  const router = useRouter()

  const organizationId = pathname.split('/')[2]

  if (!organizationId) {
    return router.push('/')
  }

  const baseURL = `/organizations/${organizationId}`

  const navigationItems = [
    {
      label: 'Registros',
      path: `${baseURL}`,
    },
    {
      label: 'Categorias',
      path: `${baseURL}/categories`,
    },
    {
      label: 'Métricas',
      path: `${baseURL}/metrics`,
    },
    {
      label: 'Configurações',
      path: `${baseURL}/settings`,
    },
  ]

  return (
    <Container>
      <nav className="rounded-sm md:bg-secondary/40">
        <ul className="grid grid-cols-2 flex-row gap-4 md:flex">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </Container>
  )
}
