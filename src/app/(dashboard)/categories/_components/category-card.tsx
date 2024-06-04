import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { CategoryDropdownMenu } from './category-dropdown-menu'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <span>{category.name}</span>

        <CategoryDropdownMenu category={category} />
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
