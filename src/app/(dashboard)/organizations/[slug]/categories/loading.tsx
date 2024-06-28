import { faker } from '@faker-js/faker'
import React from 'react'

import { Container } from '@/components/container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const CategoriesPageLoading = () => {
  return (
    <Container>
      <div className="mt-5 flex flex-row items-center justify-between gap-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 5 }, () => (
          <Card key={faker.string.uuid()}>
            <CardHeader className="flex flex-row items-center justify-between px-4 py-6">
              <div className="flex w-full flex-row items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>

            <Separator />

            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default CategoriesPageLoading
