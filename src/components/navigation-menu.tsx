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
      <nav className="flex rounded-sm bg-secondary/40">
        <ul className="flex flex-row gap-2">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </Container>
  )
}
