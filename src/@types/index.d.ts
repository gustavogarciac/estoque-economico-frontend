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
  name: string | null
  code: string
  stock: number
  description: string | null
  category: {
    id: string
    name: string
  }
  organizationId: string
  author: {
    id: string
    name: string
  }
  registeredAt: Date
}
interface User {
  id: string
  name: string
  email: string
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
