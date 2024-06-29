import { ArrowLeftCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { OnboardingNewOrganizationForm } from './_components/new-organization-onboarding-form'

const OnboardingCreateOrganizationPage = async () => {
  return (
    <Container otherClasses="mt-4">
      <Button
        asChild
        size="icon"
        className="absolute left-8 top-8 rounded-full"
      >
        <Link href={'/onboarding'}>
          <span className="sr-only">Voltar</span>

          <ArrowLeftCircleIcon className="size-5" />
        </Link>
      </Button>
      <h1 className="text-xl font-semibold">Criar uma nova organização</h1>
      <p className="text-sm text-muted-foreground">
        Preencha todos os campos para criar uma organização.
      </p>

      <Separator className="my-4" />

      <OnboardingNewOrganizationForm />
    </Container>
  )
}

export default OnboardingCreateOrganizationPage
