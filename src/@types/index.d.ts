interface Category {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
}

interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  member_on: string[]
}
