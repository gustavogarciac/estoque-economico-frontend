import React from 'react'

import { Container } from '@/components/container'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingMetricsPage = () => {
  return (
    <Container>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <div className="min-h-32 w-full rounded-sm border border-border">
          <div className="w-full p-6">
            <Skeleton className="mx-auto h-5 w-2/3" />
          </div>

          <Separator />

          <div className="flex w-full flex-col gap-1 px-6 pb-1 pt-6">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/3" />
          </div>

          <div className="w-full px-6 pb-6">
            <Skeleton className="ml-auto h-10 w-1/3" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LoadingMetricsPage
