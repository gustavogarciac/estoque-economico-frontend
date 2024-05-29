import React from 'react'

import { NavigationMenuItem } from './navigation-menu-item'

const navigationItems = [
  {
    label: 'Início',
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
    <nav className="flex">
      <ul className="flex flex-row gap-2">
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  )
}
