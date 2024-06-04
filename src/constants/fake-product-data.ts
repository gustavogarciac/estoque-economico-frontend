import { faker } from '@faker-js/faker'

export const fakeProductData = Array.from({ length: 20 }, () => {
  return {
    code: faker.string.alphanumeric(12),
    quantity: faker.string.numeric(2),
    category: faker.commerce.department(),
    registeredAt: faker.date.recent(),
    author: faker.person.fullName(),
    description: faker.commerce.productDescription(),
  }
})

export type ProductData = (typeof fakeProductData)[0]
