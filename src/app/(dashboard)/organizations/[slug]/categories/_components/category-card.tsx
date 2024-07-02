import Image from 'next/image'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { CategoryDropdownMenu } from './category-dropdown-menu'

interface CategoryCardProps {
  category: Category
  orgSlug: string
}

export const CategoryCard = ({ category, orgSlug }: CategoryCardProps) => {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center gap-2">
          {category.imageUrl ? (
            <Image
              width={20}
              height={20}
              alt={`${category.name} icon`}
              src={category.imageUrl}
              className="rounded-full"
            />
          ) : null}

          <span>{category.name}</span>
        </div>

        <CategoryDropdownMenu category={category} orgSlug={orgSlug} />
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {category.description}
        </p>
      </CardContent>
    </Card>
  )
}
