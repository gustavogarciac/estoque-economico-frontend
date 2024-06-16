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
  category: string
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
  createdAt: string
  updatedAt: string
  member_on: string[]
}
