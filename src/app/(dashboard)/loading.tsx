import React from 'react'

import { Container } from '@/components/container'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingHomePage = () => {
  return (
    <Container otherClasses="mt-4">
      <h1 className="text-xl leading-relaxed">Escolha a organização.</h1>
      <p className="text-muted-foreground">
        Selecione a organização que deseja gerenciar.
      </p>

      <Separator className="my-4" />

      <div className="grid grid-cols-4 gap-3">
        <Skeleton className="aspect-video h-32 w-full" />
        <Skeleton className="aspect-video h-32 w-full" />
        <Skeleton className="aspect-video h-32 w-full" />
        <Skeleton className="aspect-video h-32 w-full" />
        <Skeleton className="aspect-video h-32 w-full" />
        <Skeleton className="aspect-video h-32 w-full" />
      </div>
    </Container>
  )
}

export default LoadingHomePage
