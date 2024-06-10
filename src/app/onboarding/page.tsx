import { ContainerIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const Onboarding = () => {
  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader>
        <ContainerIcon className="mx-auto size-8" />
        <CardTitle className="text-center">Onboarding</CardTitle>
        <CardDescription className="mt-2">
          Para continuar a acessar a plataforma, você precisa criar ou fazer
          parte de uma organização.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="mt-4">
        <Button asChild className="w-full">
          <Link href="/onboarding/join-organization">
            Participar de uma organização
          </Link>
        </Button>

        <span className="my-4 block text-center text-sm font-semibold uppercase">
          ou
        </span>

        <Button asChild className="w-full">
          <Link href="/onboarding/create-organization">Criar organização</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Onboarding
