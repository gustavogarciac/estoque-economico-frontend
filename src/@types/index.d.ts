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
interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  member_on: string[]
}
