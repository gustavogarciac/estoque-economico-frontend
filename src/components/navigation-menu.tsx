import React from 'react'

import { Container } from './container'
import { NavigationMenuItem } from './navigation-menu-item'

const navigationItems = [
  {
    label: 'Registros',
    path: '/',
  },
  {
    label: 'Categorias',
    path: '/categories',
  },
  {
    label: 'Métricas',
    path: '/metrics',
  },
  {
    label: 'Configurações',
    path: '/settings',
  },
]

export const NavigationMenu = () => {
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
