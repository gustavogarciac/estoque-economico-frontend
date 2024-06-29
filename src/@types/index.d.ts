interface Category {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
}

interface Organization {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  categories: Category[]
  createdAt: string
  updatedAt: string
}

interface Product {
  id: string
  name: string
  code: string
  stock: number
  organizationId: string
  description: string
  author: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
  }
  registeredAt: Date
}
interface User {
  id: string
  name: string
  email: string
  onboarded: boolean
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
  member_on: {
    id: string
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    userId: string
    organizationId: string
  }
}
