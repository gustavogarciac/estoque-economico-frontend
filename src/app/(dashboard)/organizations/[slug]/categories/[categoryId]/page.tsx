import { faker } from '@faker-js/faker'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import { Container } from '@/components/container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getCategoryDetails } from '@/http/get-category-details'

export const metadata: Metadata = {
  title: 'Detalhes da categoria',
  description: 'Detalhes da categoria selecionada',
}

const CategoryDetailsPage = async ({
  params,
}: {
  params: {
    categoryId: string
    slug: string
  }
}) => {
  const { slug, categoryId } = params
  const category = await getCategoryDetails({ categoryId, slug })

  return (
    <Container otherClasses="space-y-6">
      <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nome da categoria</Label>
            <Input id="name" name="name" value={category.name} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descrição da categoria</Label>
            <Textarea
              className="resize-none"
              id="description"
              name="description"
              value={category.description ?? ''}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Image
            src={category.imageUrl ?? faker.image.avatarGitHub()}
            alt={category.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <span className="text-4xl font-semibold">{category.name}</span>
        </div>
      </div>
    </Container>
  )
}

export default CategoryDetailsPage
