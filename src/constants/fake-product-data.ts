import { faker } from '@faker-js/faker'

export const fakeProductData = Array.from({ length: 20 }, () => {
  return {
    code: faker.random.alphaNumeric(12),
    quantity: faker.random.numeric(2),
    category: faker.commerce.department(),
    registeredAt: faker.date.recent(),
    author: faker.name.firstName() + ' ' + faker.name.lastName(),
    description: faker.commerce.productDescription(),
  }
})

export type ProductData = (typeof fakeProductData)[0]
